const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

const TILE_SIZE = 50;
const WHITE_TILE_COLOR = "#b3d9f3";
const BLACK_TILE_COLOR = "#82c1eb";
const HIGHLIGHT_COLOR = "orange"; //合法移动(捕获)
const ENPASSANT_COLOR = "#10AEFF"; //吃过路兵
const PROMOTION_COLOR = "#E64340"; //兵升变
const CASTLING_COLOR = "#09BB07"; //王车易位
const PERVIOUS_COLOR = "#E6A23C"; //表示对方移动之前的位置
const WHITE = 0;
const BLACK = 1;

const AITEAM = BLACK; //默认AI是黑棋

const EMPTY = 0; //null
const PAWN = 1; //兵 PAWN
const KNIGHT = 2; //马 KNIGHT
const BISHOP = 3; //象 BISHOP
const ROOK = 4; //车 ROOK
const QUEEN = 5; //后 QUEEN
const KING = 6; //王 KING

const INVALID = 0;
const VALID = 1;
const VALID_CAPTURE = 2;

const UUID = Number(Math.random().toString().substr(3, 5) + Date.now()).toString(36);

const piecesCharacters = {
    0: null,
    1: '♙', //PAWN_W
    2: '♘', //KNIGHT_W
    3: '♗', //BISHOP_W
    4: '♖', //ROOK_W
    5: '♕', //QUEEN_W
    6: '♔', //KING_W

    7: '♟', //PAWN_B
    8: '♞', //KNIGHT_B
    9: '♝', //BISHOP_B
    10: '♜', //ROOK_B
    11: '♛', //QUEEN_B
    12: '♚', //KING_B
};

let chessCanvas;
let chessCtx;
let currentTeamText;
let whiteTeamText;
let blackTeamText;
let totalVictoriesText;

let board;
let currentTeam;

let curX;
let curY;

let whiteTeam;
let blackTeam;

let whiteVictories;
let blackVictories;

let keyCount = 0;
let isAI = false;
var manTomanButton = document.getElementById("man_to_man_button");
let ws;
let wsIsopen = false;
let currValid;
let currStatus;

let file = ['8', '7', '6', '5', '4', '3', '2', '1'];
let rank = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let piece = ['', 'p', 'n', 'b', 'r', 'q', 'k'];

document.addEventListener("DOMContentLoaded", onLoad);
ws = new WebSocket("ws://127.0.0.1:5678/"); //本地运行

ws.onopen = function() {
        wsIsopen = true;
        startGame(); //成功建立连接后开始游戏
    }
    // 接收服务器数据时触发
ws.onmessage = function(e) {
    let boardinfo = JSON.parse(e.data)
    console.log(boardinfo)
    currValid = boardinfo.legalmove;
    currStatus = boardinfo.status;
    //console.log(currStatus);

    let aiMoveIndex = boardinfo.ai;

    if (currStatus.checkmate) {
        window.alert((currentTeam == WHITE ? "白方" : "黑方") + "被将死");
        updateTotalVictories(currStatus.result);
    } else if (currStatus.check) {
        window.alert((currentTeam == WHITE ? "白方" : "黑方") + "被将");
    } else if (currStatus.statemate || currStatus.fivefold) {
        window.alert((currentTeam == WHITE ? "白方" : "黑方") + "和棋");
        updateTotalVictories(currStatus.result);
    } else {
        updateTotalVictories(currStatus.result);
    }

    if (aiMoveIndex !== null && currentTeam === AITEAM && isAI) {
        curX = rankToX(currValid[aiMoveIndex].movement.substring(0, 2)); //获取ai当前合法棋格坐标
        curY = fileToY(currValid[aiMoveIndex].movement.substring(0, 2));
        let tx = rankToX(currValid[aiMoveIndex].movement.substring(2, 4)); //获取ai下一步棋格坐标
        let ty = fileToY(currValid[aiMoveIndex].movement.substring(2, 4));
        let move = JSON.stringify({ "uuid": UUID, "movement": currValid[aiMoveIndex].movement, "arg": "gaming", "isai": isAI ? AITEAM : null });

        let ai_capturedindex = currValid.findIndex(function() {
            return currValid[aiMoveIndex].capture == true;
        });

        // console.log("ai_captureindex" + ai_capturedindex);
        // console.log("ai_curX,ai_curY" + curX + curY);
        // console.log("ai_tx,ai_ty" + tx + ty);

        if (ai_capturedindex == 0) {
            recordBorad(tx, ty, aiMoveIndex); //若吃子，则更新记录
        }

        moveSelectedPiece(aiMoveIndex);
        ws.send(move); //发送json数据至服务器
        changeCurrentTeam();
        repaintBoard();
        paintPrePos(currValid[aiMoveIndex].movement);
        curX = -1;
        curY = -1;
    }
}

ws.onclose = function() {
    wsIsopen = false;
}

ws.onerror = function() {
    wsIsopen = false;
}

function onLoad() {
    chessCanvas = document.getElementById("chessCanvas");
    chessCtx = chessCanvas.getContext("2d");
    chessCanvas.addEventListener("click", onClick);

    currentTeamText = document.getElementById("change_contianer");
    whiteTeamText = document.getElementById("white_contianer");
    blackTeamText = document.getElementById("black_contianer");
    totalVictoriesText = document.getElementById("totalVictories");
    whiteVictories = 0;
    blackVictories = 0;
}

function startGame() {
    board = new Board();
    curX = -1;
    curY = -1;

    currentTeam = WHITE; //白子先行
    currentTeamText.textContent = "White's turn first";

    whiteTeam = [null, 0, 0, 0, 0, 0]; //记录双方的兵 马 象 车 后 被吃掉的数量 王不算
    blackTeam = [null, 0, 0, 0, 0, 0];

    repaintBoard();
    updateWhiteTeam(whiteTeam, whiteTeamText);
    updateBlackTeam(blackTeam, blackTeamText);
    ws.send(JSON.stringify({ "uuid": UUID, "movement": "0000", "arg": "start", "isai": isAI ? AITEAM : null }));
}


manTomanButton.onclick = function() {
    keyCount++;
    if (keyCount % 2 === 1) {
        isAI = true;
        manTomanButton.innerHTML = "Man VS AI";
    } else {
        isAI = false;
        manTomanButton.innerHTML = "Man VS Man";
    }
    startGame(); //
}


function onClick(event) {
    if (isAI && currentTeam === AITEAM) { //AI时 AI移动由onmessage执行
        return;
    }

    let chessCanvasX = chessCanvas.getBoundingClientRect().left; //获取画布的位置坐标（左上角）
    let chessCanvasY = chessCanvas.getBoundingClientRect().top;

    let x = Math.floor((event.clientX - chessCanvasX) / TILE_SIZE); //计算鼠标所在方块
    let y = Math.floor((event.clientY - chessCanvasY) / TILE_SIZE);

    if (board.tiles[y][x].team === currentTeam) { //点中自己的棋子 获取位置
        repaintBoard();
        curX = x;
        curY = y;
        var uci = getUci(curX, curY, 0, 0).substring(0, 2);
        for (var i = 0; i < currValid.length; i++) {
            if (uci == currValid[i].movement.substring(0, 2)) { //如果所点棋子可以移动
                let tx = rankToX(currValid[i].movement.substring(2, 4))
                let ty = fileToY(currValid[i].movement.substring(2, 4))
                if (currValid[i].capture) { //是否可以捕获
                    if (currValid[i].en_passant) { //是否吃过路兵
                        let pawn_pos = currValid[i].movement.substring(2, 3) + currValid[i].movement.substring(1, 2);
                        let pawn_x = rankToX(pawn_pos);
                        let pawn_y = fileToY(pawn_pos);
                        drawCircle(tx, ty, HIGHLIGHT_COLOR);
                        drawCorners(pawn_x, pawn_y, ENPASSANT_COLOR);
                    } else {
                        if (currValid[i].movement.length == 5) { //是否是兵升变
                            drawCorners(tx, ty, PROMOTION_COLOR);
                        } else {
                            drawCorners(tx, ty, HIGHLIGHT_COLOR);
                        }
                    }

                } else {
                    if (currValid[i].movement.length == 5) { //是否是兵升变
                        drawCircle(tx, ty, PROMOTION_COLOR);
                    } else if (currValid[i].castling.castling) { //是否王车易位
                        if (currValid[i].castling.kingside_castling) { //短易位
                            drawCircle(tx, ty, CASTLING_COLOR);
                        } else if (currValid[i].castling.queenside_castling) { //长易位
                            drawCircle(tx, ty, CASTLING_COLOR);
                        }
                    } else {
                        drawCircle(tx, ty, HIGHLIGHT_COLOR);
                    }
                }
            }
        }
    } else if (curX != -1 && curY != -1) {
        //console.log("(" + curX + "," + curY + ")");
        let move = { "uuid": UUID, "movement": getUci(curX, curY, x, y), "arg": "gaming", "isai": isAI ? AITEAM : null };
        let promotion_move = currValid.filter(function(item) { //兵升变 长度为5 选出满足条件的元素
            return item.movement.length == 5;
        })
        let p = promotion_move.findIndex(function(item) { //找出兵升变的移动位置在生成合法移动列表中的index
            return item.movement.substring(0, 4) == move.movement
        })
        if (p != -1) {
            let promotion_piece = window.prompt("要升变为 q(后), r(车), n(马), b(象)?");
            if (['q', 'r', 'n', 'b'].indexOf(promotion_piece) == -1) {
                window.alert("输入有误");
                return;
            } else {
                move.movement = getUci(curX, curY, x, y, promotion_piece);
            }
        }
        let moveindex = currValid.findIndex(function(item) { //找出当前移动在生成合法移动列表中的index
            return item.movement == move.movement;
        });
        let capturedindex = currValid.findIndex(function() { //找出当前移动是吃子的index
            return currValid[moveindex].capture == true;
        });

        // console.log("moveindex" + moveindex);
        // console.log("capturedindex" + capturedindex);

        if (moveindex == -1) { //检测非法移动
            return;
        }
        if (capturedindex == 0) {
            recordBorad(x, y, moveindex); //更新记录
        }

        moveSelectedPiece(moveindex);
        ws.send(JSON.stringify(move));
        changeCurrentTeam();
        repaintBoard();
        paintPrePos(currValid[moveindex].movement);
    }
}
//记录双方吃子情况
function recordBorad(x, y, move) {
    if (currentTeam === WHITE) { // 黑子被吃，更新黑子被吃数量及棋子种类，下同
        if (currValid[move].en_passant) { //若是过路兵
            let pawn_pos = currValid[move].movement.substring(2, 3) + currValid[move].movement.substring(1, 2);
            let pawn_x = rankToX(pawn_pos);
            let pawn_y = fileToY(pawn_pos);
            blackTeam[board.tiles[pawn_y][pawn_x].pieceType % 6]++;
        } else {
            blackTeam[board.tiles[y][x].pieceType % 6]++;
        }

        updateBlackTeam(blackTeam, blackTeamText);
    } else {
        //console.log("whiteTeam[board.tiles[y][x].pieceType]" + whiteTeam[board.tiles[y][x].pieceType]);
        if (currValid[move].en_passant) {
            let pawn_pos = currValid[move].movement.substring(2, 3) + currValid[move].movement.substring(1, 2);
            let pawn_x = rankToX(pawn_pos);
            let pawn_y = fileToY(pawn_pos);
            whiteTeam[board.tiles[pawn_y][pawn_x].pieceType]++;
        } else {
            whiteTeam[board.tiles[y][x].pieceType]++;
        }

        updateWhiteTeam(whiteTeam, whiteTeamText);
    }
}

function moveSelectedPiece(move) {
    //console.log(currValid[move])
    var uci = currValid[move].movement
    let x = rankToX(uci.substring(2, 4))
    let y = fileToY(uci.substring(2, 4))

    if (currValid[move].en_passant) { //是否吃过路兵
        let pawn_pos = uci.substring(2, 3) + uci.substring(1, 2);
        let pawn_x = rankToX(pawn_pos);
        let pawn_y = fileToY(pawn_pos);
        board.tiles[pawn_y][pawn_x].pieceType = EMPTY;
        board.tiles[pawn_y][pawn_x].team = null;
        board.tiles[y][x].pieceType = board.tiles[curY][curX].pieceType;
        board.tiles[y][x].team = board.tiles[curY][curX].team;
    } else if (currValid[move].movement.length == 5) { //兵升变
        board.tiles[y][x].pieceType = piece.indexOf(uci.substring(4, 5)) + currentTeam * 6;
        board.tiles[y][x].team = board.tiles[curY][curX].team;
    } else if (currValid[move].castling.castling) { //王车易位
        board.tiles[y][x].pieceType = KING + currentTeam * 6;
        board.tiles[y][x].team = board.tiles[curY][curX].team;
        if (currValid[move].castling.kingside_castling) {
            board.tiles[y][x - 1].pieceType = ROOK + currentTeam * 6;
            board.tiles[y][x - 1].team = currentTeam;
            board.tiles[y][7].pieceType = EMPTY;
            board.tiles[y][7].team = null;
        } else if (currValid[move].castling.queenside_castling) {
            board.tiles[y][x + 1].pieceType = ROOK + currentTeam * 6;
            board.tiles[y][x + 1].team = currentTeam;
            board.tiles[y][0].pieceType = EMPTY;
            board.tiles[y][0].team = null;
        }
    } else { //其他情况
        board.tiles[y][x].pieceType = board.tiles[curY][curX].pieceType;
        board.tiles[y][x].team = board.tiles[curY][curX].team;
    }

    board.tiles[curY][curX].pieceType = EMPTY;
    board.tiles[curY][curX].team = null;

    curX = -1;
    curY = -1;
}

function changeCurrentTeam() {
    if (currentTeam === WHITE) {
        currentTeamText.textContent = "Black's turn";
        currentTeam = BLACK;
    } else {
        currentTeamText.textContent = "White's turn";
        currentTeam = WHITE;
    }
}

function repaintBoard() {
    drawBoard();
    drawPieces();
}

function paintPrePos(moveUci) {
    drawCircle(rankToX(moveUci.substring(0, 2)), fileToY(moveUci.substring(0, 2)), PERVIOUS_COLOR);
}

function drawBoard() {
    chessCtx.fillStyle = WHITE_TILE_COLOR;
    chessCtx.fillRect(0, 0, BOARD_WIDTH * TILE_SIZE, BOARD_HEIGHT * TILE_SIZE);

    for (let i = 0; i < BOARD_HEIGHT; i++) {
        for (let j = 0; j < BOARD_WIDTH; j++) {
            if ((i + j) % 2 === 1) {
                drawTile(j, i, BLACK_TILE_COLOR);
            }
        }
    }
}

function drawTile(x, y, fillStyle) {
    chessCtx.fillStyle = fillStyle;
    chessCtx.fillRect(TILE_SIZE * x, TILE_SIZE * y, TILE_SIZE, TILE_SIZE);
}

function drawCircle(x, y, fillStyle) {
    chessCtx.fillStyle = fillStyle;
    chessCtx.beginPath();
    chessCtx.arc(TILE_SIZE * (x + 0.5), TILE_SIZE * (y + 0.5), TILE_SIZE / 5, 0, 2 * Math.PI);
    chessCtx.fill();
}

function drawCorners(x, y, fillStyle) {
    chessCtx.fillStyle = fillStyle;

    chessCtx.beginPath();
    chessCtx.moveTo(TILE_SIZE * x, TILE_SIZE * y);
    chessCtx.lineTo(TILE_SIZE * x + 15, TILE_SIZE * y);
    chessCtx.lineTo(TILE_SIZE * x, TILE_SIZE * y + 15);
    chessCtx.fill();

    chessCtx.beginPath();
    chessCtx.moveTo(TILE_SIZE * (x + 1), TILE_SIZE * y);
    chessCtx.lineTo(TILE_SIZE * (x + 1) - 15, TILE_SIZE * y);
    chessCtx.lineTo(TILE_SIZE * (x + 1), TILE_SIZE * y + 15);
    chessCtx.fill();

    chessCtx.beginPath();
    chessCtx.moveTo(TILE_SIZE * x, TILE_SIZE * (y + 1));
    chessCtx.lineTo(TILE_SIZE * x + 15, TILE_SIZE * (y + 1));
    chessCtx.lineTo(TILE_SIZE * x, TILE_SIZE * (y + 1) - 15);
    chessCtx.fill();

    chessCtx.beginPath();
    chessCtx.moveTo(TILE_SIZE * (x + 1), TILE_SIZE * (y + 1));
    chessCtx.lineTo(TILE_SIZE * (x + 1) - 15, TILE_SIZE * (y + 1));
    chessCtx.lineTo(TILE_SIZE * (x + 1), TILE_SIZE * (y + 1) - 15);
    chessCtx.fill();
}

function drawPieces() {
    for (let i = 0; i < BOARD_HEIGHT; i++) {
        for (let j = 0; j < BOARD_WIDTH; j++) {
            if (board.tiles[i][j].team === null) {
                continue;
            }
            chessCtx.font = "38px Arial";
            let pieceType = board.tiles[i][j].pieceType;
            chessCtx.fillStyle = "black";
            chessCtx.fillText(piecesCharacters[pieceType], TILE_SIZE * (j + 1 / 8), TILE_SIZE * (i + 4 / 5));
        }
    }
}

function updateWhiteTeam(team, text) {
    let none = true;
    for (let i = QUEEN; i >= PAWN; i--) {
        if (team[i] === 0) {
            continue;
        }

        if (none) {
            text.textContent = team[i] + " " + piecesCharacters[i];
            none = false;
        } else {
            text.textContent += " - " + team[i] + " " + piecesCharacters[i];
        }
        console.log(none);
    }
    if (none) {
        text.textContent = "None";
        none = false;
    }
}

function updateBlackTeam(team, text) {
    let none = true;
    for (let i = QUEEN + 6; i >= PAWN + 6; i--) {
        if (team[i % 6] === 0) {
            continue;
        }

        if (none) {
            text.textContent = team[i % 6] + " " + piecesCharacters[i];
            none = false;
        } else {
            text.textContent += " - " + team[i % 6] + " " + piecesCharacters[i];
        }
    }
    if (none) {
        text.textContent = "None";
        none = false;
    }
}


function updateTotalVictories(result) {
    //console.log(currStatus);
    totalVictoriesText.textContent = result;
}

function getOppositeTeam(team) {
    if (team === WHITE) {
        return BLACK;
    } else if (team === BLACK) {
        return WHITE;
    } else {
        return EMPTY;
    }
}

function getUci(fx, fy, tx, ty, promotion = "") {
    return rank[fx] + file[fy] + rank[tx] + file[ty] + promotion;
}

function rankToX(uci_2) {
    return rank.indexOf(uci_2.substring(0, 1))
}

function fileToY(uci_2) {
    return file.indexOf(uci_2.substring(1, 2))
}

// function selectPromotion(){
//     var modalEle = document.getElementById("overlay_model")
//     modalEle.style.visibility = "visible"
// }

// function option(info){
//     if(info == 1){
//         promotion_piece = document.getElementById("promotion").value
//     }else if(info == 0){
//         promotion_piece = null
//     }
//     var modalEle = document.getElementById("overlay_model")
//     modalEle.style.visibility = "hidden"
// }

class Board {
    constructor() {
        this.tiles = [];

        this.tiles.push([
            new Tile(ROOK + 6, BLACK),
            new Tile(KNIGHT + 6, BLACK),
            new Tile(BISHOP + 6, BLACK),
            new Tile(QUEEN + 6, BLACK),
            new Tile(KING + 6, BLACK),
            new Tile(BISHOP + 6, BLACK),
            new Tile(KNIGHT + 6, BLACK),
            new Tile(ROOK + 6, BLACK)
        ]);

        this.tiles.push([
            new Tile(PAWN + 6, BLACK),
            new Tile(PAWN + 6, BLACK),
            new Tile(PAWN + 6, BLACK),
            new Tile(PAWN + 6, BLACK),
            new Tile(PAWN + 6, BLACK),
            new Tile(PAWN + 6, BLACK),
            new Tile(PAWN + 6, BLACK),
            new Tile(PAWN + 6, BLACK)
        ]);

        for (let i = 0; i < 4; i++) {
            this.tiles.push([
                new Tile(EMPTY, null),
                new Tile(EMPTY, null),
                new Tile(EMPTY, null),
                new Tile(EMPTY, null),
                new Tile(EMPTY, null),
                new Tile(EMPTY, null),
                new Tile(EMPTY, null),
                new Tile(EMPTY, null),
            ]);
        }

        this.tiles.push([
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE)
        ]);

        this.tiles.push([
            new Tile(ROOK, WHITE),
            new Tile(KNIGHT, WHITE),
            new Tile(BISHOP, WHITE),
            new Tile(QUEEN, WHITE),
            new Tile(KING, WHITE),
            new Tile(BISHOP, WHITE),
            new Tile(KNIGHT, WHITE),
            new Tile(ROOK, WHITE)
        ]);
    }
}

class Tile {
    constructor(pieceType, team) {
        this.pieceType = pieceType;
        this.team = team;
    }
}