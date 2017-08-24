/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : hospital1

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-08-24 11:22:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bf
-- ----------------------------
DROP TABLE IF EXISTS `bf`;
CREATE TABLE `bf` (
  `bf_no` smallint(255) NOT NULL,
  `bed_no` smallint(255) DEFAULT NULL,
  `ks_no` smallint(255) DEFAULT NULL,
  PRIMARY KEY (`bf_no`),
  KEY `ks_no` (`ks_no`),
  CONSTRAINT `bf_ibfk_1` FOREIGN KEY (`ks_no`) REFERENCES `ks` (`ks_no`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bf
-- ----------------------------
INSERT INTO `bf` VALUES ('1', '101', '303');
INSERT INTO `bf` VALUES ('701', '101', '302');
INSERT INTO `bf` VALUES ('702', '101', '303');
INSERT INTO `bf` VALUES ('703', '101', '304');
INSERT INTO `bf` VALUES ('704', '101', '305');

-- ----------------------------
-- Table structure for br
-- ----------------------------
DROP TABLE IF EXISTS `br`;
CREATE TABLE `br` (
  `br_no` varchar(255) NOT NULL,
  `br_pwd` varchar(255) NOT NULL DEFAULT '123456',
  `br_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `age` smallint(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `zgys` varchar(255) DEFAULT NULL,
  `bf_no` smallint(255) DEFAULT NULL,
  `zd` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`br_no`),
  KEY `zgys` (`zgys`),
  KEY `bf_no` (`bf_no`),
  CONSTRAINT `br_ibfk_1` FOREIGN KEY (`zgys`) REFERENCES `ys` (`ys_name`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `br_ibfk_2` FOREIGN KEY (`bf_no`) REFERENCES `bf` (`bf_no`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of br
-- ----------------------------
INSERT INTO `br` VALUES ('12', '202cb962ac59075b964b07152d234b70', null, null, null, null, null, null, null, null);
INSERT INTO `br` VALUES ('159', '0c74b7f78409a4022a2c4c5a5ca3ee19', null, null, null, null, null, null, null, null);
INSERT INTO `br` VALUES ('601', 'e10adc3949ba59abbe56e057f20f883e', '小明同学', '男', '22', '上海陆家嘴', '77777777', '李永斌', '701', '超级棒');
INSERT INTO `br` VALUES ('602', 'e10adc3949ba59abbe56e057f20f883e', '小蓝同学', '男', '13', '广东珠海', '13893494684', '赵佳仁', '703', '进一步检查');
INSERT INTO `br` VALUES ('603', 'e10adc3949ba59abbe56e057f20f883e', '小黄同学', '男', '22', '广州', '18284842848', '林泳', '704', '一切都好');
INSERT INTO `br` VALUES ('604', 'e10adc3949ba59abbe56e057f20f883e', '默默拜同学默默拜同学默默拜同学', '男', '15', '广东广州', '1335515547', '李住院', '701', '基本正常');
INSERT INTO `br` VALUES ('615', 'e10adc3949ba59abbe56e057f20f883e', '汤姆丁', '男', '45', '荆州', '18818818110', '李住院', '703', '进一步检查');
INSERT INTO `br` VALUES ('619', 'e10adc3949ba59abbe56e057f20f883e', '小史', '男', '24', '祖国', '5848425878', '李经方', '704', '进一步查看');
INSERT INTO `br` VALUES ('621', 'e10adc3949ba59abbe56e057f20f883e', '斯蒂芬', '男 ', '10', 'hongkong', '82529429', '李经方', '703', '无');
INSERT INTO `br` VALUES ('624', 'e10adc3949ba59abbe56e057f20f883e', '霖霖', '男', '11', '祖国', '18351385135', '李住院', '702', '好13333');
INSERT INTO `br` VALUES ('666', 'e10adc3949ba59abbe56e057f20f883e', '123', '男', '12', '3', '3', '李住院', '701', '222');

-- ----------------------------
-- Table structure for cf
-- ----------------------------
DROP TABLE IF EXISTS `cf`;
CREATE TABLE `cf` (
  `br_id` varchar(255) NOT NULL,
  `cf_content` varchar(255) DEFAULT NULL,
  `fee` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`br_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cf
-- ----------------------------
INSERT INTO `cf` VALUES ('601', '息斯敏', '16.8');
INSERT INTO `cf` VALUES ('602', '板蓝根', '20');
INSERT INTO `cf` VALUES ('603', '板蓝根', '21');
INSERT INTO `cf` VALUES ('604', '双飞人药水', '35.5');
INSERT INTO `cf` VALUES ('615', '云南白药云南白药云南白药云南白药', '2333333333');
INSERT INTO `cf` VALUES ('617', '双飞人', '20');
INSERT INTO `cf` VALUES ('619', '板蓝根', '24');
INSERT INTO `cf` VALUES ('621', '板蓝根', '25');
INSERT INTO `cf` VALUES ('624', '板蓝根', '2555555');
INSERT INTO `cf` VALUES ('666', null, null);

-- ----------------------------
-- Table structure for ks
-- ----------------------------
DROP TABLE IF EXISTS `ks`;
CREATE TABLE `ks` (
  `ks_no` smallint(255) NOT NULL,
  `ks_name` varchar(255) NOT NULL,
  `ks_address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ks_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ks
-- ----------------------------
INSERT INTO `ks` VALUES ('302', '外科', '外科楼101', '18815236548');
INSERT INTO `ks` VALUES ('303', '内科', '门诊大楼201', '13245678923');
INSERT INTO `ks` VALUES ('304', '全科', '门诊大楼', '15183521851');
INSERT INTO `ks` VALUES ('305', '呼吸科', '门诊大楼205', '18819523658');
INSERT INTO `ks` VALUES ('306', '骨科', '门诊大楼207', '18819525418');
INSERT INTO `ks` VALUES ('307', '儿科', '门诊大楼209', '18819536418');
INSERT INTO `ks` VALUES ('308', '急诊科', '门诊大楼211', '1881368215');

-- ----------------------------
-- Table structure for ys
-- ----------------------------
DROP TABLE IF EXISTS `ys`;
CREATE TABLE `ys` (
  `ys_no` varchar(255) NOT NULL,
  `ys_pwd` varchar(255) NOT NULL DEFAULT '123456',
  `ys_name` varchar(255) NOT NULL,
  `ys_gender` varchar(255) DEFAULT NULL,
  `ks_no` smallint(255) DEFAULT NULL,
  `age` smallint(255) DEFAULT NULL,
  `zc` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ys_no`),
  KEY `ys_name` (`ys_name`),
  KEY `ks_no` (`ks_no`),
  CONSTRAINT `ys_ibfk_1` FOREIGN KEY (`ks_no`) REFERENCES `ks` (`ks_no`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ys
-- ----------------------------
INSERT INTO `ys` VALUES ('1', 'e10adc3949ba59abbe56e057f20f883e', '涨价了', '男', '307', '35', 'YY', '24384354354');
INSERT INTO `ys` VALUES ('5028', 'e10adc3949ba59abbe56e057f20f883e', '林泳', '女', '302', '32', '主治医师', '18819259999');
INSERT INTO `ys` VALUES ('5029', 'e10adc3949ba59abbe56e057f20f883e', '赵佳仁', '男', '303', '25', '实习', '15351358485');
INSERT INTO `ys` VALUES ('5030', 'e10adc3949ba59abbe56e057f20f883e', '李永斌', '男', '304', '36', '主治医生', '13545132158');
INSERT INTO `ys` VALUES ('5032', 'e10adc3949ba59abbe56e057f20f883e', '李住院', '男', '305', '25', '住院医师', '13518556987');
INSERT INTO `ys` VALUES ('5034', 'e10adc3949ba59abbe56e057f20f883e', '李经方', '男', '306', '25', '副主任医师', '1353698547');
