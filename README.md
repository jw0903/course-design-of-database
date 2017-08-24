# 这是大二数据库课程设计，最近完善了部分细节，采用了node.js和mysql数据库实现的一个住院管理系统，主要功能是实现对于数据的增删查改。
# 住院管理系统

## 功能模块

- 病人医生分类登录/病人注册
- 医生
-     1添加病人(默认密码为123456)
-     2查看病人信息，并可进行修改
-     3对自己的病人处方信息进行修改
-     4为自己的病人办理出院手续(对应数据库进行删除)
- 病人
-     1注册账号
-     2登记自己个人信息
-     3可查看所有医生信息
-     4查看处方信息
-     5自己办理出院手续

### 打开步骤  
-    1下载相关依赖
-    2将主目录中的hospital1.sql文件导入到数据库
-    3根据自己情况设置db.js相关配置
-    4运行node app.js
-    5打开浏览器http://localhost:3000
-    6病人默认账号为：601  密码：123456
      医生默认账号为：5028 密码：123456



## 路由设计
- router.js文件中


``` 
#### `http://localhost:3000/`，响应首页
```js
// router.js文件代码
router
  // 设置路由
  .get('/', handler.showIndex)

// handler.js文件代码，后台处理代码，具体的路由处理函数
exports.showIndex = (req, res) => {
  res.render('index')
}




