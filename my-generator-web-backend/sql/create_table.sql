# 数据库初始化
# @author <a href="https://github.com/liyupi">程序员鱼皮</a>
# @from <a href="https://yupi.icu">编程导航知识星球</a>

-- 创建库
create database if not exists my_db;

-- 切换库
use my_db;

-- 用户表
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
    userAccount  varchar(256)                           not null comment '账号',
    userPassword varchar(512)                           not null comment '密码',
    userName     varchar(256)                           null comment '用户昵称',
    userAvatar   varchar(1024)                          null comment '用户头像',
    userProfile  varchar(512)                           null comment '用户简介',
    userRole     varchar(256) default 'user'            not null comment '用户角色：user/admin/ban',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_userAccount (userAccount)
    ) comment '用户' collate = utf8mb4_unicode_ci;

-- 代码生成器表
create table if not exists generator
(
    id          bigint auto_increment comment 'id' primary key,
    name        varchar(128)                       null comment '名称',
    description text                               null comment '描述',
    basePackage varchar(128)                       null comment '基础包',
    version     varchar(128)                       null comment '版本',
    author      varchar(128)                       null comment '作者',
    tags        varchar(1024)                      null comment '标签列表（json 数组）',
    picture     varchar(256)                       null comment '图片',
    fileConfig  text                               null comment '文件配置（json字符串）',
    modelConfig text                               null comment '模型配置（json字符串）',
    distPath    text                               null comment '代码生成器产物路径',
    status      int      default 0                 not null comment '状态',
    userId      bigint                             not null comment '创建用户 id',
    createTime  datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint  default 0                 not null comment '是否删除',
    index idx_userId (userId)
    ) comment '代码生成器' collate = utf8mb4_unicode_ci;

INSERT INTO my_db.user (id, userAccount, userPassword, userName, userAvatar, userProfile, userRole) VALUES (1, 'yupi', 'b0dd3697a192885d7c055db46155b26a', '程序员鱼皮', 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', '我有一头小毛驴我从来也不骑', 'admin');
INSERT INTO my_db.user (id, userAccount, userPassword, userName, userAvatar, userProfile, userRole) VALUES (2, 'yupi2', 'b0dd3697a192885d7c055db46155b26a', '普通鱼皮', 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', '我有一头小毛驴我从来也不骑', 'user');

INSERT INTO my_db.generator (id, name, description, basePackage, version, author, tags, picture, fileConfig, modelConfig, distPath, status, userId) VALUES (1, 'ACM 模板项目', 'ACM 模板项目生成器', 'com.yupi', '1.0', '程序员鱼皮', '["Java"]', 'https://pic.code-nav.cn/migrate_image/f22a0535d56b9513066da1e2ea02fd7c.webp', '{}', '{}', null, 0, 1);
INSERT INTO my_db.generator (id, name, description, basePackage, version, author, tags, picture, fileConfig, modelConfig, distPath, status, userId) VALUES (2, 'Spring Boot 初始化模板', 'Spring Boot 初始化模板项目生成器', 'com.yupi', '1.0', '程序员鱼皮', '["Java"]', 'https://pic.code-nav.cn/migrate_image/0ca8d627031dd9f59d67ed0c105c4ef3.webp', '{}', '{}', null, 0, 1);
INSERT INTO my_db.generator (id, name, description, basePackage, version, author, tags, picture, fileConfig, modelConfig, distPath, status, userId) VALUES (3, '鱼皮外卖', '鱼皮外卖项目生成器', 'com.yupi', '1.0', '程序员鱼皮', '["Java", "前端"]', 'https://pic.code-nav.cn/migrate_image/b0b13549d5470a2e543422ff334de854.webp', '{}', '{}', null, 0, 1);
INSERT INTO my_db.generator (id, name, description, basePackage, version, author, tags, picture, fileConfig, modelConfig, distPath, status, userId) VALUES (4, '鱼皮用户中心', '鱼皮用户中心项目生成器', 'com.yupi', '1.0', '程序员鱼皮', '["Java", "前端"]', 'https://pic.code-nav.cn/migrate_image/1775f5001880b6bbd4b5130085c99a39.webp', '{}', '{}', null, 0, 1);
INSERT INTO my_db.generator (id, name, description, basePackage, version, author, tags, picture, fileConfig, modelConfig, distPath, status, userId) VALUES (5, '鱼皮商城', '鱼皮商城项目生成器', 'com.yupi', '1.0', '程序员鱼皮', '["Java", "前端"]', 'https://pic.code-nav.cn/migrate_image/da9b9178e4a16ce519205e2fa593304d.webp', '{}', '{}', null, 0, 1);
