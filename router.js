const express = require('express')
const router = express.Router()
const handler = require('./handler')

router
  //showSignin展示的是登录界面
  .get('/', handler.showSignin)
  .get('/signin', handler.showSignin)
  .get('/index', handler.showIndex)
  .post('/addBr',handler.addBr)
  //病人的相关操作
  //病人登录
  .post('/br_signin', handler.br_signin)
  //病人信息的修改完善
  .get('/add', handler.showAdd)
  .post('/add', handler.doAdd)
  //病人登陆之后 获取全部医生的信息
  .get('/ysMsg', handler.getYsMsg)
  .get('/showYsMsg', handler.showYsMsg)
  .get('/searchYsMsg', handler.searchYsMsg)
  //获取病人的处方信息
  .get('/showCfmsg', handler.showCfmsg)
  //病人出院手续的相关操作
  .get('/del', handler.showDel)
  .post('/del', handler.doDel)


  //医生的相关操作
  //医生登录
  .post('/ys_signin', handler.ys_signin)
  //医生登记病人信息
  .get('/ys_add', handler.ys_showAdd)
  .get('/ysList', handler.getysList)
  .post('/ys_add', handler.ys_doAdd)
  //医生查看所有病人的信息
  .get('/ys_brMsg', handler.ys_brMsg)
  .get('/showBrMsg',handler.showBrMsg)
  .get('/searchBrMsg', handler.searchBrMsg)
  //修改病人的基本信息
  .get('/edit', handler.showEdit)
  .post('/edit', handler.doEdit)
  //修改病人处方的信息
  .get('/ys_cfmsg', handler.ys_cfmsg)
  .get('/getbr_name', handler.getbr_name)
  .get('/getbr_msg', handler.getbr_msg)
  .post('/ys_cfmsg', handler.do_cfmsg)
  .post('/modcf', handler.modcf)
  //病人出院操作
  .get('/ys_del', handler.ys_del)
  .post('/ys_dodel', handler.ys_dodel)

module.exports = router
