/*
 Navicat Premium Data Transfer

 Source Server         : xly
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : chess

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 06/01/2021 14:33:28
*/
USE chess;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chess_situation
-- ----------------------------
DROP TABLE IF EXISTS `chess_situation`;
CREATE TABLE `chess_situation`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `movement` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `arg` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isai` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_general_ci
    ROW_FORMAT = Dynamic STATS_AUTO_RECALC = 1;;

-- ----------------------------
-- Records of chess_situation
-- ----------------------------
INSERT INTO `chess_situation` VALUES (2, 'q51aooq1i8w', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (3, 'q51aooq1i8w', 'd2d4', 'gaming', NULL);
INSERT INTO `chess_situation` VALUES (4, 'q51aooq1i8w', 'e7e5', 'gaming', NULL);
INSERT INTO `chess_situation` VALUES (5, 'q51aooq1i8w', '0000', 'start', '1');
INSERT INTO `chess_situation` VALUES (6, 'q51aooq1i8w', 'd2d4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (7, 'q51aooq1i8w', 'e7e6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (8, '7gi12qz3vt40', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (9, '6ua3we76rjk0', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (10, '6ua3we76rjk0', 'c2c4', 'gaming', NULL);
INSERT INTO `chess_situation` VALUES (11, '6ua3we76rjk0', 'd7d5', 'gaming', NULL);
INSERT INTO `chess_situation` VALUES (12, '6ua3we76rjk0', '0000', 'start', '1');
INSERT INTO `chess_situation` VALUES (13, '6ua3we76rjk0', 'c2c4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (14, '6ua3we76rjk0', 'g8f6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (15, '3dxfxblafqa0', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (16, '3dxfxblafqa0', '0000', 'start', '1');
INSERT INTO `chess_situation` VALUES (17, '3dxfxblafqa0', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (18, '3dxfxblafqa0', '0000', 'start', '1');
INSERT INTO `chess_situation` VALUES (19, '3dxfxblafqa0', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (20, '3dxfxblafqa0', '0000', 'start', '1');
INSERT INTO `chess_situation` VALUES (21, '3dxfxblafqa0', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (22, '3dxfxblafqa0', '0000', 'start', '1');
INSERT INTO `chess_situation` VALUES (23, '3dxfxblafqa0', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (24, '3dxfxblafqa0', '0000', 'start', '1');
INSERT INTO `chess_situation` VALUES (25, '3dxfxblafqa0', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (26, '3dxfxblafqa0', '0000', 'start', '1');
INSERT INTO `chess_situation` VALUES (27, '3dxfxblafqa0', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (28, '3h73uhtzvsy0', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (29, '6w93mqjvvl40', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (30, '6w93mqjvvl40', 'c2c4', 'gaming', NULL);
INSERT INTO `chess_situation` VALUES (31, '6w93mqjvvl40', '0000', 'start', '1');
INSERT INTO `chess_situation` VALUES (32, '6w93mqjvvl40', 'd2d4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (33, '6w93mqjvvl40', 'e7e6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (34, '6w93mqjvvl40', 'g1f3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (35, '6w93mqjvvl40', 'g8f6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (36, '6w93mqjvvl40', 'b1c3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (37, '6w93mqjvvl40', 'f8b4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (38, '6w93mqjvvl40', 'e2e4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (39, '6w93mqjvvl40', 'f6e4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (40, '6w93mqjvvl40', 'g2g4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (41, '6w93mqjvvl40', 'b4c3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (42, '6w93mqjvvl40', 'd1d2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (43, '6w93mqjvvl40', 'e4d2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (44, '6w93mqjvvl40', '0000', 'start', NULL);
INSERT INTO `chess_situation` VALUES (45, '6w93mqjvvl40', '0000', 'start', '1');
INSERT INTO `chess_situation` VALUES (46, '6w93mqjvvl40', 'e2e3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (47, '6w93mqjvvl40', 'b8c6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (48, '6w93mqjvvl40', 'd2d4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (49, '6w93mqjvvl40', 'e7e6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (50, '6w93mqjvvl40', 'b1c3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (51, '6w93mqjvvl40', 'f8b4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (52, '6w93mqjvvl40', 'f1b5', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (53, '6w93mqjvvl40', 'a7a6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (54, '6w93mqjvvl40', 'b5f1', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (55, '6w93mqjvvl40', 'g8f6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (56, '6w93mqjvvl40', 'g1f3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (57, '6w93mqjvvl40', 'f6e4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (58, '6w93mqjvvl40', 'c1d2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (59, '6w93mqjvvl40', 'b4c3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (60, '6w93mqjvvl40', 'd2c3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (61, '6w93mqjvvl40', 'd7d5', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (62, '6w93mqjvvl40', 'd1d3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (63, '6w93mqjvvl40', 'e8g8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (64, '6w93mqjvvl40', 'c3d2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (65, '6w93mqjvvl40', 'd8d6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (66, '6w93mqjvvl40', 'c2c4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (67, '6w93mqjvvl40', 'c6b4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (68, '6w93mqjvvl40', 'd3b3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (69, '6w93mqjvvl40', 'e4d2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (70, '6w93mqjvvl40', 'f3d2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (71, '6w93mqjvvl40', 'b4c6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (72, '6w93mqjvvl40', 'c4c5', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (73, '6w93mqjvvl40', 'd6e7', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (74, '6w93mqjvvl40', 'f1d3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (75, '6w93mqjvvl40', 'f8e8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (76, '6w93mqjvvl40', 'h2h4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (77, '6w93mqjvvl40', 'e7f6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (78, '6w93mqjvvl40', 'b3c2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (79, '6w93mqjvvl40', 'h7h6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (80, '6w93mqjvvl40', 'd2f3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (81, '6w93mqjvvl40', 'c6b4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (82, '6w93mqjvvl40', 'd3h7', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (83, '6w93mqjvvl40', 'g8h8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (84, '6w93mqjvvl40', 'c2b1', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (85, '6w93mqjvvl40', 'g7g6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (86, '6w93mqjvvl40', 'a2a3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (87, '6w93mqjvvl40', 'b4c6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (88, '6w93mqjvvl40', 'e1g1', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (89, '6w93mqjvvl40', 'h8h7', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (90, '6w93mqjvvl40', 'h4h5', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (91, '6w93mqjvvl40', 'h7h8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (92, '6w93mqjvvl40', 'h5g6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (93, '6w93mqjvvl40', 'f6g6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (94, '6w93mqjvvl40', 'f1d1', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (95, '6w93mqjvvl40', 'g6b1', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (96, '6w93mqjvvl40', 'b2b4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (97, '6w93mqjvvl40', 'b1g6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (98, '6w93mqjvvl40', 'f3h4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (99, '6w93mqjvvl40', 'g6e4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (100, '6w93mqjvvl40', 'g2g4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (101, '6w93mqjvvl40', 'e4g4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (102, '6w93mqjvvl40', 'h4g2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (103, '6w93mqjvvl40', 'e8g8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (104, '6w93mqjvvl40', 'g1f1', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (105, '6w93mqjvvl40', 'g4g2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (106, '6w93mqjvvl40', 'f1e1', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (107, '6w93mqjvvl40', 'c8d7', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (108, '6w93mqjvvl40', 'a1c1', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (109, '6w93mqjvvl40', 'g8e8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (110, '6w93mqjvvl40', 'c1c2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (111, '6w93mqjvvl40', 'h8g8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (112, '6w93mqjvvl40', 'e1e2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (113, '6w93mqjvvl40', 'a8d8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (114, '6w93mqjvvl40', 'd1d2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (115, '6w93mqjvvl40', 'c6e7', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (116, '6w93mqjvvl40', 'c2b2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (117, '6w93mqjvvl40', 'e7f5', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (118, '6w93mqjvvl40', 'd2d3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (119, '6w93mqjvvl40', 'd7b5', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (120, '6w93mqjvvl40', 'b2b3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (121, '6w93mqjvvl40', 'b5d3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (122, '6w93mqjvvl40', 'e2e1', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (123, '6w93mqjvvl40', 'd3e4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (124, '6w93mqjvvl40', 'b4b5', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (125, '6w93mqjvvl40', 'g2g1', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (126, '6w93mqjvvl40', 'e1e2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (127, '6w93mqjvvl40', 'e4c2', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (128, '6w93mqjvvl40', 'f2f4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (129, '6w93mqjvvl40', 'c2b3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (130, '6w93mqjvvl40', 'b5a6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (131, '6w93mqjvvl40', 'g1e3', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (132, '6w93mqjvvl40', 'e2f1', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (133, '6w93mqjvvl40', 'f5h4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (134, '6w93mqjvvl40', 'a3a4', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (135, '6w93mqjvvl40', 'g8h8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (136, '6w93mqjvvl40', 'a4a5', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (137, '6w93mqjvvl40', 'h8g8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (138, '6w93mqjvvl40', 'f4f5', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (139, '6w93mqjvvl40', 'g8h8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (140, '6w93mqjvvl40', 'c5c6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (141, '6w93mqjvvl40', 'h8g8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (142, '6w93mqjvvl40', 'f5f6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (143, '6w93mqjvvl40', 'g8h8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (144, '6w93mqjvvl40', 'a6a7', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (145, '6w93mqjvvl40', 'h8g8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (146, '6w93mqjvvl40', 'a5a6', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (147, '6w93mqjvvl40', 'g8h8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (148, '6w93mqjvvl40', 'a7a8q', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (149, '6w93mqjvvl40', 'h8g8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (150, '6w93mqjvvl40', 'a6a7', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (151, '6w93mqjvvl40', 'g8h8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (152, '6w93mqjvvl40', 'c6b7', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (153, '6w93mqjvvl40', 'h8g8', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (154, '6w93mqjvvl40', 'b7b8q', 'gaming', '1');
INSERT INTO `chess_situation` VALUES (155, '6w93mqjvvl40', 'b3c4', 'gaming', '1');

SET FOREIGN_KEY_CHECKS = 1;


