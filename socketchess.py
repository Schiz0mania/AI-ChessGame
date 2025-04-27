# -*- coding=utf-8 -*-
import asyncio
import websockets
import chess
import json
import random
import numpy
import pymysql
chess_instance = {}# 储存棋盘实例
conn=pymysql.connect(
    host='localhost',
    port=3306,
    user='root',
    password='12345678',
    db='chess',
    charset='utf8'
)
cursor=conn.cursor()

class ChessBoard:
    __P = [
        [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [ 5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [ 1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [ 0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [ 0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [ 0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [ 0.5,  1.0,  1.0, -2.0, -2.0,  1.0,  1.0,  0.5],
        [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ]
    __N = [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ]
    __B = [
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
        [-1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
        [-1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
        [-1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
        [-1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
        [-1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
        [-1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
    ]
    __R = [
        [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [ 0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
        [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [ 0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
    ]
    __Q = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
        [-1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
        [-0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
        [ 0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
        [-1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
        [-1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
    ]
    __K = [
        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
        [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
        [ 2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0],
        [ 2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0]
    ]
    def __init__(self, fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"):
        self.__evalue_cap = {
            "P":-10, "N":-30, "B":-30, "R":-50, "Q":-90, "K":-900,
            "p": 10, "n": 30, "b": 30, "r": 50, "q": 90, "k": 900
        }
        self.__evalue_pos = {
            "P": -numpy.asmatrix(self.__P),
            "N": -numpy.asmatrix(self.__N),
            "B": -numpy.asmatrix(self.__B),
            "R": -numpy.asmatrix(self.__R),
            "Q": -numpy.asmatrix(self.__Q),
            "K": -numpy.asmatrix(self.__K),
            "p":  numpy.asmatrix(self.__P[::-1]),
            "n":  numpy.asmatrix(self.__N[::-1]),
            "b":  numpy.asmatrix(self.__B[::-1]),
            "r":  numpy.asmatrix(self.__R[::-1]),
            "q":  numpy.asmatrix(self.__Q[::-1]),
            "k":  numpy.asmatrix(self.__K[::-1])
        }
        self.board = chess.Board(fen)
        self.legalmovement = []
    def legalmove(self):# 获取合法移动及其参数
        self.legalmovement = []
        self.board.piece_map
        for move in self.board.legal_moves:
            self.legalmovement.append({
                "movement" : move.uci(), # 合法移动uci
                "capture" : self.board.is_capture(move), # 是否是捕获行为
                "en_passant" : self.board.is_en_passant(move), #是否吃过路兵
                "castling":{
                    "castling" : self.board.is_castling(move), # 是否王车易位
                    "kingside_castling" : self.board.is_kingside_castling(move),# 是否短易位
                    "queenside_castling" : self.board.is_queenside_castling(move)# 是否长易位
                    },
                "zeroing":self.board.is_zeroing(move)# 
            })
        return self.legalmovement
    def status(self):# 获取实例状态
        boardstatus = {
            "check":self.board.is_check(),# 是否将
            "checkmate":self.board.is_checkmate(),# 是否将死
            "statemate":self.board.is_stalemate(),# 是否和棋
            "fivefold":self.board.is_fivefold_repetition(),#是否局面重复5次
            "result":self.board.result()# 结果("1-0", "0-1", "1/2-1/2", "*")
        }
        return boardstatus

    def nextstep(self, depth, alpha, beta):# 获取下一步 by AI  depth = 1, 3, 5, ... 
        if(depth == 0):
            return None, self.__evaluateBoard()
        if(self.board.turn == chess.BLACK):
            next = None
            bestvalue = -9999
            for index, move in enumerate(self.board.legal_moves):
                self.board.push(move)
                value = self.nextstep(depth - 1, alpha, beta)[1]
                self.board.pop()
                if(value > bestvalue):
                    bestvalue = value
                    next = index
                if(bestvalue > alpha):
                    alpha = bestvalue
                if(alpha >= beta):
                    return next, bestvalue
                
            return next, bestvalue
        if(self.board.turn == chess.WHITE):
            next = None
            bestvalue = 9999
            for index, move in enumerate(self.board.legal_moves):
                self.board.push(move)
                value = self.nextstep(depth - 1, alpha, beta)[1]
                self.board.pop()
                if(value < bestvalue):
                    bestvalue = value
                    next = index
                if(bestvalue < beta):
                    beta = bestvalue
                if(alpha >= beta):
                    return next, bestvalue
            return next, bestvalue

    def __evaluateBoard(self):
        evalue_pos = 0           #位置评估
        evalue_cap = 0          #捕获评估
        evalue_mate = 0        #将死评估
        board_fen = str(self.board).replace("\n", " ").split(" ")
        for index, piece in enumerate(board_fen):
            if(piece in self.__evalue_cap):
                evalue_cap = evalue_cap + self.__evalue_cap[piece]
                evalue_pos = evalue_pos + self.__evalue_pos[piece][index//8, index%8]
        if(self.board.turn):    #白方True 白方被将(死) 对黑方有利 大
            evalue_mate =  self.board.is_checkmate()*8 + self.board.is_check()*2
        else:
            evalue_mate = - self.board.is_checkmate()*8 - self.board.is_check()*2
        return evalue_pos * 10 + evalue_cap * 15 + evalue_mate * 10

async def exa(websocket):
    global chess_instance
    try:
        while True:
            rev = await websocket.recv()
            print(f"收到消息: {rev}")

            try:
                data = json.loads(rev)
            except json.JSONDecodeError as e:
                print(f"JSON解析错误: {e}")
                continue

            if not all(k in data for k in ("uuid", "movement", "arg", "isai")):
                print("缺少字段")
                continue

            uuid = data["uuid"]

            try:
                cursor = conn.cursor()
                sql = "INSERT INTO chess_situation(uuid, movement, arg, isai) VALUES (%s, %s, %s, %s);"
                cursor.execute(sql, (data["uuid"], data["movement"], data["arg"], data["isai"]))
                conn.commit()
            except Exception as e:
                print(f"数据库异常: {e}")
                conn.rollback()

            if data["arg"] == "start":
                chess_instance[uuid] = ChessBoard()
            elif data["arg"] == "gaming":
                if uuid not in chess_instance:
                    print(f"未初始化的uuid: {uuid}")
                    continue
                chess_instance[uuid].board.push_uci(data["movement"])

            print(chess_instance[uuid].board)
            print(chess_instance[uuid].board.fen())

            if (data["isai"] is not None and (not data["isai"]) == chess_instance[uuid].board.turn):
                boardinfo = {
                    "legalmove": chess_instance[uuid].legalmove(),
                    "status": chess_instance[uuid].status(),
                    "ai": chess_instance[uuid].nextstep(4, -99999, 99999)[0]
                }
            else:
                boardinfo = {
                    "legalmove": chess_instance[uuid].legalmove(),
                    "status": chess_instance[uuid].status(),
                    "ai": None
                }

            await websocket.send(json.dumps(boardinfo))
    except websockets.exceptions.ConnectionClosedError as e:
        print(f"连接被关闭: {e}")
    except Exception as e:
        print(f"发生未知异常: {e}")

async def main():
    async with websockets.serve(exa, "127.0.0.1", 5678):
        print("WebSocket server started at ws://127.0.0.1:5678")
        await asyncio.Future()  # 保持运行

if __name__ == "__main__":
    asyncio.run(main())



