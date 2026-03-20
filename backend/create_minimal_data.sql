--
-- File generated with SQLiteStudio v3.4.9 on Cs márc. 19 14:19:00 2026
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: children
DROP TABLE IF EXISTS children;
CREATE TABLE IF NOT EXISTS children (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  dateOfBirth DATE NOT NULL,
  parentName TEXT NOT NULL,
  parentPhone TEXT NOT NULL,
  address TEXT NOT NULL,
  institutionId INTEGER NOT NULL,
  color INTEGER,
  groupId INTEGER,
  bandNumber INTEGER,
  illness TEXT,
  FOREIGN KEY (institutionId) REFERENCES institutions(om) ON DELETE CASCADE,
  FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE SET NULL
);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (1, 'Gyerek 1', '2016-01-01', 'Szülõ 1', '0612345678', '1101 Budapest, Alma utca 1', 10001, NULL, 1, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (2, 'Gyerek 2', '2016-01-02', 'Szülõ 2', '0612345679', '1102 Budapest, Körte utca 2', 10001, NULL, 1, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (3, 'Gyerek 3', '2016-01-03', 'Szülõ 3', '0612345680', '1103 Budapest, Szilva utca 3', 10001, NULL, 1, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (4, 'Gyerek 4', '2016-01-04', 'Szülõ 4', '0612345681', '1104 Budapest, Barack utca 4', 10001, NULL, 1, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (5, 'Gyerek 5', '2016-01-05', 'Szülõ 5', '0612345682', '1105 Budapest, Eper utca 5', 10001, NULL, 1, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (6, 'Gyerek 6', '2016-01-06', 'Szülõ 6', '0612345683', '1106 Budapest, Meggy utca 6', 10001, NULL, 2, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (7, 'Gyerek 7', '2016-01-07', 'Szülõ 7', '0612345684', '1107 Budapest, Málna utca 7', 10001, NULL, 2, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (8, 'Gyerek 8', '2016-01-08', 'Szülõ 8', '0612345685', '1108 Budapest, Citrom utca 8', 10001, NULL, 2, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (9, 'Gyerek 9', '2016-01-09', 'Szülõ 9', '0612345686', '1109 Budapest, Narancs utca 9', 10001, NULL, 2, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (10, 'Gyerek 10', '2016-01-10', 'Szülõ 10', '0612345687', '1110 Budapest, Dinnye utca 10', 10001, NULL, 2, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (11, 'Gyerek 11', '2016-01-11', 'Szülõ 11', '0612345688', '1111 Budapest, Kiwi utca 11', 10001, NULL, 3, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (12, 'Gyerek 12', '2016-01-12', 'Szülõ 12', '0612345689', '1112 Budapest, Mangó utca 12', 10001, NULL, 3, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (13, 'Gyerek 13', '2016-01-13', 'Szülõ 13', '0612345690', '1113 Budapest, Ananász utca 13', 10001, NULL, 3, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (14, 'Gyerek 14', '2016-01-14', 'Szülõ 14', '0612345691', '1114 Budapest, Szõlõ utca 14', 10001, NULL, 3, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (15, 'Gyerek 15', '2016-01-15', 'Szülõ 15', '0612345692', '1115 Budapest, Kókusz utca 15', 10001, NULL, 3, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (16, 'Gyerek 16', '2016-01-16', 'Szülõ 16', '0612345693', '1116 Budapest, Avokádó utca 16', 10001, NULL, 4, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (17, 'Gyerek 17', '2016-01-17', 'Szülõ 17', '0612345694', '1117 Budapest, Papaya utca 17', 10001, NULL, 4, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (18, 'Gyerek 18', '2016-01-18', 'Szülõ 18', '0612345695', '1118 Budapest, Licsi utca 18', 10001, NULL, 4, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (19, 'Gyerek 19', '2016-01-19', 'Szülõ 19', '0612345696', '1119 Budapest, Gránátalma utca 19', 10001, NULL, 4, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (20, 'Gyerek 20', '2016-01-20', 'Szülõ 20', '0612345697', '1120 Budapest, Cseresznye utca 20', 10001, NULL, 4, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (21, 'Gyerek 21', '2016-01-21', 'Szülõ 21', '0612345698', '1121 Budapest, Füge utca 21', 10001, NULL, 5, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (22, 'Gyerek 22', '2016-01-22', 'Szülõ 22', '0612345699', '1122 Budapest, Datolya utca 22', 10001, NULL, 5, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (23, 'Gyerek 23', '2016-01-23', 'Szülõ 23', '0612345700', '1123 Budapest, Mogyoró utca 23', 10001, NULL, 5, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (24, 'Gyerek 24', '2016-01-24', 'Szülõ 24', '0612345701', '1124 Budapest, Pisztácia utca 24', 10001, NULL, 5, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (25, 'Gyerek 25', '2016-01-25', 'Szülõ 25', '0612345702', '1125 Budapest, Szeder utca 25', 10001, NULL, 5, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (26, 'Gyerek 26', '2016-01-26', 'Szülõ 26', '0612345703', '1126 Budapest, Ribizli utca 26', 10001, NULL, 6, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (27, 'Gyerek 27', '2016-01-27', 'Szülõ 27', '0612345704', '1127 Budapest, Áfonya utca 27', 10001, NULL, 6, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (28, 'Gyerek 28', '2016-01-28', 'Szülõ 28', '0612345705', '1128 Budapest, Szamóca utca 28', 10001, NULL, 6, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (29, 'Gyerek 29', '2016-01-29', 'Szülõ 29', '0612345706', '1129 Budapest, Bodza utca 29', 10001, NULL, 6, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (30, 'Gyerek 30', '2016-01-30', 'Szülõ 30', '0612345707', '1130 Budapest, Málna utca 30', 10001, NULL, 6, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (31, 'Gyerek 31', '2016-01-31', 'Szülõ 31', '0612345708', '1131 Budapest, Egres utca 31', 10001, NULL, 7, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (32, 'Gyerek 32', '2016-02-01', 'Szülõ 32', '0612345709', '1132 Budapest, Cseresznye utca 32', 10001, NULL, 7, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (33, 'Gyerek 33', '2016-02-02', 'Szülõ 33', '0612345710', '1133 Budapest, Szilva utca 33', 10001, NULL, 7, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (34, 'Gyerek 34', '2016-02-03', 'Szülõ 34', '0612345711', '1134 Budapest, Körte utca 34', 10001, NULL, 7, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (35, 'Gyerek 35', '2016-02-04', 'Szülõ 35', '0612345712', '1135 Budapest, Alma utca 35', 10001, NULL, 7, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (36, 'Gyerek 36', '2016-02-05', 'Szülõ 36', '0612345713', '1136 Budapest, Szõlõ utca 36', 10001, NULL, 8, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (37, 'Gyerek 37', '2016-02-06', 'Szülõ 37', '0612345714', '1137 Budapest, Eper utca 37', 10001, NULL, 8, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (38, 'Gyerek 38', '2016-02-07', 'Szülõ 38', '0612345715', '1138 Budapest, Meggy utca 38', 10001, NULL, 8, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (39, 'Gyerek 39', '2016-02-08', 'Szülõ 39', '0612345716', '1139 Budapest, Málna utca 39', 10001, NULL, 8, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (40, 'Gyerek 40', '2016-02-09', 'Szülõ 40', '0612345717', '1140 Budapest, Citrom utca 40', 10001, NULL, 8, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (41, 'Gyerek 41', '2016-02-10', 'Szülõ 41', '0612345718', '1141 Budapest, Narancs utca 41', 10001, NULL, 9, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (42, 'Gyerek 42', '2016-02-11', 'Szülõ 42', '0612345719', '1142 Budapest, Dinnye utca 42', 10001, NULL, 9, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (43, 'Gyerek 43', '2016-02-12', 'Szülõ 43', '0612345720', '1143 Budapest, Kiwi utca 43', 10001, NULL, 9, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (44, 'Gyerek 44', '2016-02-13', 'Szülõ 44', '0612345721', '1144 Budapest, Mangó utca 44', 10001, NULL, 9, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (45, 'Gyerek 45', '2016-02-14', 'Szülõ 45', '0612345722', '1145 Budapest, Ananász utca 45', 10001, NULL, 9, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (46, 'Gyerek 46', '2016-02-15', 'Szülõ 46', '0612345723', '1146 Budapest, Szõlõ utca 46', 10001, NULL, NULL, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (47, 'Gyerek 47', '2016-02-16', 'Szülõ 47', '0612345724', '1147 Budapest, Kókusz utca 47', 10001, NULL, NULL, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (48, 'Gyerek 48', '2016-02-17', 'Szülõ 48', '0612345725', '1148 Budapest, Avokádó utca 48', 10001, NULL, NULL, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (49, 'Gyerek 49', '2016-02-18', 'Szülõ 49', '0612345726', '1149 Budapest, Papaya utca 49', 10001, NULL, NULL, NULL, NULL);
INSERT INTO children (id, name, dateOfBirth, parentName, parentPhone, address, institutionId, color, groupId, bandNumber, illness) VALUES (50, 'Gyerek 50', '2016-02-19', 'Szülõ 50', '0612345727', '1150 Budapest, Licsi utca 50', 10001, NULL, NULL, NULL, NULL);

-- Table: groups
DROP TABLE IF EXISTS groups;
CREATE TABLE IF NOT EXISTS groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  institutionId INTEGER,
  FOREIGN KEY (institutionId) REFERENCES institutions(om) ON DELETE SET NULL
);
INSERT INTO groups (id, name, institutionId) VALUES (1, 'elsõsök', 10001);
INSERT INTO groups (id, name, institutionId) VALUES (2, 'masodikosok', 10001);
INSERT INTO groups (id, name, institutionId) VALUES (3, 'harmadikosok', 10001);
INSERT INTO groups (id, name, institutionId) VALUES (4, '1/A', 10001);
INSERT INTO groups (id, name, institutionId) VALUES (5, '2/A', 10001);
INSERT INTO groups (id, name, institutionId) VALUES (6, '3/A', 10001);
INSERT INTO groups (id, name, institutionId) VALUES (7, '4/A', 10001);
INSERT INTO groups (id, name, institutionId) VALUES (8, '1/B', 10001);
INSERT INTO groups (id, name, institutionId) VALUES (9, '2/B', 10001);
INSERT INTO groups (id, name, institutionId) VALUES (10, '3/B', 10001);

-- Table: groupsInTimetable
DROP TABLE IF EXISTS groupsInTimetable;
CREATE TABLE IF NOT EXISTS groupsInTimetable (
  timetableId INTEGER NOT NULL,
  groupId INTEGER NOT NULL,
  PRIMARY KEY (timetableId, groupId),
  FOREIGN KEY (timetableId) REFERENCES TimeTable(id) ON DELETE CASCADE,
  FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE
);

-- Table: institutions
DROP TABLE IF EXISTS institutions;
CREATE TABLE IF NOT EXISTS institutions (
  om INTEGER PRIMARY KEY NOT NULL,
  name TEXT,
  address TEXT
);
INSERT INTO institutions (om, name, address) VALUES (10001, 'Minta Intézet', '1234 Budapest, Fõ utca 1');

-- Table: program
DROP TABLE IF EXISTS program;
CREATE TABLE IF NOT EXISTS program (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, childLimit INTEGER);
INSERT INTO program (id, name, description, childLimit) VALUES (1, 'program 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nibh nibh, dignissim non egestas eget, vestibulum ac tortor. Fusce eu placerat quam. Mauris eu ipsum in nunc ultricies rhoncus id quis sem. Etiam vitae velit eu eros gravida dictum ac sit amet nunc. Maecenas ac nisl mollis dolor ultrices bibendum. Curabitur neque arcu, faucibus tincidunt odio vel, scelerisque euismod sem. Phasellus sagittis velit non lacus pulvinar, a tempus sapien maximus. Mauris non est in libero sodales mollis. Duis gravida urna in felis maximus scelerisque. Quisque sed dolor congue ligula convallis eleifend id in odio.', 5);
INSERT INTO program (id, name, description, childLimit) VALUES (2, 'program 2', 'Nam a ante at elit posuere bibendum eget vitae dolor. Praesent pulvinar sit amet nulla ac dignissim. Aliquam luctus dignissim faucibus. Nam faucibus nec neque eget vestibulum. Praesent pretium eu nunc at dapibus. Mauris ultrices pretium odio, vitae maximus urna mattis in. Aenean sed nibh rhoncus, cursus nisi nec, auctor justo.', 20);
INSERT INTO program (id, name, description, childLimit) VALUES (3, 'program 3', 'Lorem ipsum', 15);
INSERT INTO program (id, name, description, childLimit) VALUES (4, 'program 4', 'Pellentesque diam purus, convallis a turpis non, placerat sollicitudin purus. Praesent luctus in quam sed pharetra. Nunc pulvinar, turpis at iaculis hendrerit, odio lacus bibendum dui, ut vestibulum nulla felis id lorem. Ut commodo arcu at ipsum rhoncus, et hendrerit risus suscipit. Aliquam erat volutpat. Cras accumsan quam eget erat pellentesque, et blandit diam volutpat. Proin condimentum ipsum a arcu posuere interdum. Quisque fringilla sem suscipit, ultricies tellus sed, commodo dui. Nulla ullamcorper, quam vel rutrum condimentum, nibh arcu dapibus nisl, nec vulputate neque ex vitae magna. Fusce vehicula quis magna et imperdiet. Aliquam malesuada neque eget est egestas, eget efficitur sem varius. Integer iaculis nibh eros, id dapibus libero elementum et. Suspendisse tristique purus id aliquam pulvinar. Nunc eget blandit massa. Nullam suscipit feugiat massa et sollicitudin. Nullam scelerisque, felis nec rutrum finibus, sem quam sodales quam, id molestie eros justo iaculis enim.', 10);
INSERT INTO program (id, name, description, childLimit) VALUES (5, 'program 5', 'Aliquam mi sem, fermentum in ex at, elementum euismod dolor. Vestibulum at tincidunt nisl, ac commodo nulla. Aenean vehicula, nisi at porta lobortis, erat nibh tincidunt purus, ac ultrices urna ante et elit. Vestibulum non malesuada tellus. Quisque fermentum metus vitae urna malesuada, id lacinia elit faucibus. Sed mauris erat, aliquam sit amet sem eget, dignissim ullamcorper justo. Vestibulum posuere, ante a accumsan congue, mi augue semper elit, sed iaculis eros eros a massa. In quis accumsan leo. Nulla consectetur massa lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam erat lectus, pulvinar et efficitur in, convallis eu sem. Praesent a nisi sed lectus consequat sollicitudin. Mauris sed maximus velit.', 30);
INSERT INTO program (id, name, description, childLimit) VALUES (6, 'program 6', 'In finibus egestas purus sit amet maximus. Integer rhoncus blandit neque quis elementum. Pellentesque quis dui tempor, semper tellus quis, dictum libero. Nunc feugiat tortor sed ex lacinia, vel consectetur metus congue. Etiam eget accumsan nisl, quis varius felis. Praesent sodales in libero ut placerat. Morbi nec tempor nunc. Mauris id gravida lorem, eget tristique urna. Duis dictum erat nisl, nec euismod est scelerisque sit amet. Etiam metus est, faucibus quis diam ac, maximus mattis quam. In hac habitasse platea dictumst. Curabitur suscipit, quam vitae dignissim posuere, ex dui rhoncus metus, eu maximus magna odio a massa. Donec sodales, nunc eget tristique porttitor, sem justo iaculis dolor, a feugiat nunc nisl sit amet arcu. Nam maximus urna at mi dapibus ultrices eu ut neque. Sed vitae nisl varius, pellentesque augue sit amet, tempor ante. Cras dignissim sollicitudin justo, id congue est placerat quis.', 100);
INSERT INTO program (id, name, description, childLimit) VALUES (7, 'program 7', 'Aliquam tincidunt massa quis libero commodo, in ullamcorper dui pharetra. Nulla hendrerit, lorem quis dictum bibendum, dui velit porta libero, in tincidunt nisi sem quis mauris. Pellentesque ornare ipsum dictum, tristique lorem eget, consequat dolor. Mauris eleifend auctor accumsan. Sed tristique rutrum nisl, vel posuere nulla. Pellentesque scelerisque consectetur hendrerit. Sed ac sapien turpis. Donec nec accumsan nisi. Mauris ultricies orci enim, eu placerat leo varius non. Maecenas viverra in massa sed laoreet.', 25);
INSERT INTO program (id, name, description, childLimit) VALUES (8, 'program 8', 'Maecenas ut ex auctor, tincidunt risus quis, gravida mi. Integer rhoncus sollicitudin augue eget lacinia. Quisque dolor nisi, congue aliquam imperdiet et, aliquam euismod elit. Aliquam non interdum lorem. Vivamus sodales odio quis purus viverra cursus. Integer ullamcorper mauris sit amet mauris blandit vehicula. Suspendisse elementum consectetur nisl nec mattis. Praesent scelerisque, erat id pretium accumsan, nisl leo posuere lectus, eu consectetur ipsum dui et justo. Ut a orci leo. Aliquam cursus, mi at fringilla ultrices, nunc urna pulvinar enim, in bibendum neque eros rutrum dui. Donec molestie magna sit amet leo efficitur ultrices. Etiam vel dolor non lectus hendrerit maximus ac eu nulla. Nulla sed eros dignissim nunc sollicitudin efficitur. Suspendisse potenti. In pulvinar egestas laoreet. Nunc tristique euismod sem.', 20);
INSERT INTO program (id, name, description, childLimit) VALUES (9, 'program 9', 'Duis accumsan ex sed felis feugiat mattis. Morbi consectetur ligula turpis, vel vehicula turpis feugiat ac. Nullam pellentesque sollicitudin ante eu bibendum. Aenean pretium gravida arcu, vitae sollicitudin est mattis in. Proin faucibus faucibus hendrerit. Donec nec leo tempus, cursus nisi non, viverra ligula. Sed auctor blandit tellus, id vestibulum tellus pharetra laoreet. Nulla faucibus auctor dolor, vitae varius nisi vulputate quis. Sed suscipit tellus id risus luctus, id egestas risus rhoncus. Nulla efficitur sit amet sem id suscipit. Nullam libero nunc, pharetra sed urna vestibulum, aliquet condimentum nibh. Pellentesque nulla sem, vulputate nec lorem eu, aliquet venenatis lorem. In vel risus at mauris euismod consequat.', 15);
INSERT INTO program (id, name, description, childLimit) VALUES (10, 'program 10', 'Integer placerat lacus id erat volutpat finibus. Donec pharetra ante eget elit eleifend, at aliquet dolor ornare. Sed ut efficitur nunc. Nullam sit amet elementum dui, id sagittis nunc. Donec faucibus sed turpis vel viverra. Ut nec arcu urna. Nunc massa nibh, auctor ac dui eu, blandit rutrum sem. Praesent consequat, elit nec mattis pulvinar, ipsum arcu facilisis lorem, non imperdiet justo justo in nisl. Quisque et tincidunt arcu.', 50);

-- Table: teachersInGroups
DROP TABLE IF EXISTS teachersInGroups;
CREATE TABLE IF NOT EXISTS teachersInGroups (
  userId INTEGER NOT NULL,
  groupId INTEGER NOT NULL,
  PRIMARY KEY (userId, groupId),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE
);

-- Table: TimeTable
DROP TABLE IF EXISTS TimeTable;
CREATE TABLE IF NOT EXISTS TimeTable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  startDate DATE,
  startTime TIME,
  programId INTEGER NOT NULL,
  registered INTEGER DEFAULT 0,
  holderId INTEGER,
  FOREIGN KEY (programId) REFERENCES program(id),
  FOREIGN KEY (holderId) REFERENCES users(id)
);
INSERT INTO TimeTable (id, startDate, startTime, programId, registered, holderId) VALUES (1, '2026.06.01', '8:00', 1, 0, NULL);
INSERT INTO TimeTable (id, startDate, startTime, programId, registered, holderId) VALUES (2, '2026.06.01', '9:00', 1, 0, NULL);
INSERT INTO TimeTable (id, startDate, startTime, programId, registered, holderId) VALUES (3, '2026.06.01', '10:00', 1, 0, NULL);
INSERT INTO TimeTable (id, startDate, startTime, programId, registered, holderId) VALUES (4, '2026.06.01', '8:00', 2, 0, NULL);
INSERT INTO TimeTable (id, startDate, startTime, programId, registered, holderId) VALUES (5, '2026.06.01', '9:00', 2, 0, NULL);
INSERT INTO TimeTable (id, startDate, startTime, programId, registered, holderId) VALUES (6, '2026.06.02', '8:00', 3, 0, NULL);

-- Table: users
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  institutionId INTEGER NULL,
  groupId INTEGER,
  color INTEGER,
  bandNumber INTEGER,
  address TEXT,
  FOREIGN KEY (institutionId) REFERENCES institutions(om) ON DELETE SET NULL,
  FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE SET NULL
);
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (1, 'tabor1', '$2a$10$5.uHSlwVeLkct1NSBRSbDuTbOC7TKefDEyqW3cb7uuB82mVhl0xrS', 'Táboroztató 1', 'taboroztato@staff.com', 'Taboroztato', NULL, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (2, 'Kisero1', '$2a$10$mgzvAXDXOwl40IKZ9LwTyOLnF7TJKIkkDWVm3.mliG6a9.DEnvjhm', 'Teszt Tanár 1', 'tanarteszteszt1@intezmeny.com', 'Kisero', 10001, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (3, 'Kisero2', '$2a$10$bHW99bk.B19Ge6QJeEo6peFGVRvnmyaet3hBohgwi0wPBQru.Wv6q', 'Teszt Tanár 2', 'tanarteszteszt2@intezmeny.com', 'Kisero', 10001, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (4, 'Kisero3', '$2a$10$BUVncF.MBjqIEKPobUBeJOlppMNTPWoz3vp2qdD2gWt1F0YKgZZNO', 'Teszt Tanár 3', 'tanarteszteszt3@intezmeny.com', 'Kisero', 10001, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (5, 'Kisero4', '$2a$10$yCO4.A4A9d.RJ2ZRtJlxdOHx.3zKYNXN6GIrLqQfw9wziCvcsrfV.', 'Teszt Tanár 4', 'tanarteszteszt4@intezmeny.com', 'Kisero', 10001, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (6, 'Kisero5', '$2a$10$FvqNo8ayMoWVnCOJ87zbZOIw71PLgK5GP6Dg4BmnIHQheSmskNQX6', 'Teszt Tanár 5', 'tanarteszteszt5@intezmeny.com', 'Kisero', 10001, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (7, 'Kisero6', '$2a$10$NqyW4vNxOLel/id4h6CwEu0IRYYL.VHqYT9eg.jvjp52jo8.ciaV2', 'Teszt Tanár 6', 'tanarteszteszt6@intezmeny.com', 'Kisero', 10001, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (8, 'Kisero7', '$2a$10$eqQMtyUsmdPNfGC39ZtbYuRhq/GaqzfRa5F7wD2KLiPPxjaydlKXC', 'Teszt Tanár 7', 'tanarteszteszt7@intezmeny.com', 'Kisero', 10001, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (9, 'Kisero8', '$2a$10$F7QzGFkWrbw.Bg35RkeG/u05NRiRwnymU9d1SlFUFhpLA5VAdglJe', 'Teszt Tanár 8', 'tanarteszteszt8@intezmeny.com', 'Kisero', 10001, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (10, 'tabor1', '$2a$10$zx8r3vmP0QRpebsezw17eu9Tg7GwNOEV/H46humpRk/PdZ1lJ3JvG', 'Teszt Táboroztató1', 'taboroztato1@staff.com', 'Taboroztato', NULL, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (11, 'tabor2', '$2a$10$HIt..zvXZzNLpFv3GO.pxuKxVmjBxryLaB5hKCUWbmgXyLD.nPQGG', 'Teszt Táboroztató2', 'taboroztato2@staff.com', 'Taboroztato', NULL, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (12, 'tabor3', '$2a$10$0TcP2ZNE.YnURjVxFQoRJuBfwIneD9SMz7lEJP7frrOZ9MwZ1Jtdm', 'Teszt Táboroztató3', 'taboroztato3@staff.com', 'Taboroztato', NULL, NULL, NULL, NULL, '4321 Miskolc test utca 16');
INSERT INTO users (id, username, password, name, email, role, institutionId, groupId, color, bandNumber, address) VALUES (13, 'tabor4', '$2a$10$a0S1hJgqp.ZLYbRVbQCb9eNp/Rqp1ROlfSDd/AR/iH8xypICU/wzi', 'Teszt Táboroztató4', 'taboroztato4@staff.com', 'Taboroztato', NULL, NULL, NULL, NULL, '4321 Miskolc test utca 16');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
