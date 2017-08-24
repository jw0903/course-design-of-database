const formidable = require('formidable')
var querystring = require('querystring')
const config = require('./config')
const db = require('./common/db.js')
const path = require('path')
var session = require('express-session');
var sessionId;  //存储session值
var sessionName;
const md5 = require('./node_modules/md5.js');
exports.showIndex = (req, res) => {
  if(!req.session) {
      res.send("location.href='/signin';</script>")
  } else {
    if(!req.session.br_no){
      res.send("<script>alert('更改出现错误!');location.href='/add';</script>")
    } else{
      res.render('index');
    }
  }
}
//添加注册
exports.addBr = (req, res) => {
  var brPwd = req.body.ps;
  var brNo = req.body.yh;
  let flag = 0;
  console.log(brPwd);
  var sql= 'INSERT INTO br(br_no, br_pwd) VALUES(?, ?)';
  db.query(sql, [
    brNo,brPwd
  ], (err, rows) => {
    if (err) {
      return res.json({
        code:2001,
        msg:'注册失败，请重试'
      })
    } else {
      flag = 1;
    }
  })
  var sql1 = 'INSERT INTO cf(br_id) VALUES (?)';
  db.query(sql1,[brNo],
    (err,rows) => {
      if(err) {
        return res.json({
          code:2001,
          msg:'注册失败，请重试'
        })
      } else if(flag == 1){
        return res.json({
          code:2000,
          msg:'注册成功'
        })
      }
    })
}


//显示登录界面
exports.showSignin = (req, res) => {
  if(req.session){
    req.session=null;
  }
  res.render('signin');
}

//以下是关于病人的操作
//病人登录
exports.br_signin = (req, res) => {
  var id = req.body.id_input;
  console.log(id);
  var pwd = req.body.pwd_input;
  console.log(pwd);
    db.query('select * from br where br_no = ?',[id],(err, result) => {
      if(err) {
        throw err;
      }
      if(!result[0]) {
        console.log('不存在该帐号');
        res.send("<script>alert(':(   登录失败！不存在该帐号。');location.href='signin'</script>")
        // res.render('confirm');
      } else {
        if(result[0].br_pwd === pwd) {
          console.log('密码正确');
          req.session.br_no = id;
          sessionId = req.session.br_no;
          res.render('index')
        } else {
          console.log('密码错误');
          res.send("<script>alert(':(   登录失败！密码错误。');location.href='signin'</script>")
          // res.render('confirm');
        }
      }
    });
}

//病人登录界面的操作
exports.showAdd = (req, res) => {
  if(!req.session.br_no) {
    res.send("<script>alert('登录超时，请重新登录!');location.href='/';</script>")
  } else {
    db.query("SELECT * FROM br where br_no=?",
      [req.session.br_no],
      (err, rows) => {
        if(err) {
          console.log("病人登记页面显示错误");
          throw err;
        }
        console.log("病人登记页面显示正常");
        res.render('add',{
          br: rows[0]
        })
      })
  }
}

exports.doAdd = (req, res) => {
  const id = req.session.br_no;
  const form = new formidable.IncomingForm()
  form.uploadDir = config.uploadDir // 配置上传文件的路径
  form.keepExtensions = true // 保持扩展名
  form.maxFieldsSize = 20 * 1024 * 1024 // 配置上传文件的大小
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    // 病人登记表的8个属性
    const br_no = fields.br_no;
    const br_name = fields.br_name;
    const gender = fields.gender;
    const age = fields.age;
    const address = fields.address;
    const phone = fields.phone;
    const zgys = fields.zgys;
    const bf_no = fields.bf_no;
    const zd = fields.zd;
    if(zgys==''){
      db.query('UPDATE br SET br_no=?, br_name=?, gender=?, age=?, address=?, phone=? WHERE br_no=?', 
        [id, br_name, gender, age, address, phone, id], 
        (err, rows) => {
        if (err) {
          console.log('保存出现错误')
          console.log(id, br_name, gender, age, address, phone, zgys, bf_no, zd, id);
          return res.send("<script>alert(':( 保存失败');location.href='add'</script>")
        }
        res.send("<script>alert(':) 登记成功');location.href='/index'</script>");
        // res.redirect('back');
        //添加数据之后返回原来界面
      })
    } else {
      db.query('UPDATE br SET br_no=?, br_name=?, gender=?, age=?, address=?, phone=?, zgys=?, bf_no=?, zd=? WHERE br_no=?', 
        [id, br_name, gender, age, address, phone, zgys, bf_no, zd, id], 
        (err, rows) => {
        if (err) {
          console.log('保存出现错误')
          console.log(id, br_name, gender, age, address, phone, zgys, bf_no, zd, id);
          return res.send("<script>alert(':( 保存失败');location.href='add'</script>")
        }
        res.send("<script>alert(':) 登记成功');location.href='/index'</script>");
        // res.redirect('back');
        //添加数据之后返回原来界面
      })
    }
 })
}

//病人查看医生信息的操作
exports.getYsMsg = (req, res) => {
  if(!req.session.br_no) {
    res.send("<script>alert('登录超时,请重新登录!');location.href='/';</script>");
  } else {
    res.render('ysMsg')
  }
}

exports.showYsMsg = (req, res) => {
  db.query("select ys_no,ys_name,ys_gender,ys.phone,ys.age,zc,ks_name,ks_address,a.br_name from ys,ks,(select zgys,group_concat(br_name separator ',')as br_name from br group by zgys)as a where ys.ks_no=ks.ks_no and ys.ys_name=a.zgys", (err, rows) => {
    if (err) {
      throw err
    }
    console.log("显示全部医生信息:")
    console.log(rows)
    console.log(" 所有医生信息显示结束")

    res.json({
      list:rows
    })
  })
}

exports.searchYsMsg = (req, res) => {
  console.log('查询有关: ' + req.query.name + ' 的所有数据');
  db.query("select ys_no,ys_name,ys_gender,ys.phone,ys.age,zc,ks_name,ks_address,a.br_name from ys,ks,(select zgys,group_concat(br_name separator ',')as br_name from br group by zgys)as a where ys.ks_no=ks.ks_no and ys.ys_name=a.zgys and ys_name like '%" + req.query.name + "%'",[],(err, rows) => {
    if(err) {
      throw err
    }
    console.log('显示搜索信息' + rows + '显示结束');
    res.json({
      list:rows
    })
  })
}

//病人查看处方的操作
exports.showCfmsg = (req, res) => {
  if(!req.session.br_no) {
    res.send("<script>alert('登录超时,请重新登录!');location.href='/';</script>");
  } else {
    db.query("SELECT br_no,br_name,gender,age,cf_content,fee,zgys FROM br,cf WHERE br_no=br_id AND br_no=?",
      [req.session.br_no],
      (err, rows) => {
        if(err) {
          console.log('抛出错误');
          throw err;
        }
        console.log('输出处方成功');
        res.render('cfMsg',{
          br: rows[0]
        })
      })
  }
}

//病人出院手续的操作
exports.showDel = (req, res) => {
  const id = req.session.br_no;
  console.log("输出req.session.br_no: " + id);
  if(!req.session.br_no) {
    res.send("<script>alert('登录超时,请重新登录!');location.href='/';</script>")
  } else {
    db.query("SELECT * FROM br WHERE br_no=?",[id], (err, rows) => {
      if(err) {
        console.log("抛出错误");
        throw err
      }
      console.log("选择成功");
      res.render('del', {
        br: rows[0]
      })
    })
  }
}

exports.doDel = (req, res) => {
  const id = req.session.br_no
  console.log("办理出院的病人ID:" + id);
  db.query('DELETE FROM br WHERE br_no=?', 
    [id], 
    (err, rows) => {
      if (err) {
        console.log('删除病人失败')
        // return res.send("<script>alert(':( 修改失败，请重试！');</script>")
        throw err;
      } 
      if(rows.affectedRows === 1) {
        db.query("DELETE FROM cf WHERE br_id=?",[id],
          (err, rows1) => {
            if(err) {
              console.log("删除处方失败")
            } 
            if(rows1.affectedRows === 1) {
              return res.json({
                code: 2000,
                msg: 'del success'
              })
            }
          })
      } else {
        res.json({
          code: 2001,
          msg: 'del failed'
        })
      }
  })
}

//以下是医生登录及之后的相关操作
//医生登录
exports.ys_signin = (req, res) => {
  var id = req.body.id_input;
  console.log(id);
  var pwd = req.body.pwd_input;
  console.log(pwd);
    db.query('select * from ys where ys_no = ?',[id],(err, result) => {
      if(err) {
        throw err;
      }
      if(!result[0]) {
        console.log('不存在该帐号');
        res.send("<script>alert(':(   登录失败！不存在该帐号。');location.href='signin'</script>")
      } else {
        if(result[0].ys_pwd === pwd) {
          console.log('密码正确');
          req.session.ys_name = result[0].ys_name;
          req.session.ys_no = id;
          sessionId = req.session.ys_no;
          res.render('ys_index',{name:result[0].ys_name})
        } else {
          console.log('密码错误');
          res.send("<script>alert(':(   登录失败！密码错误。');location.href='signin'</script>")
        }
      }
    });
}

exports.ys_showAdd = (req, res) => {
  if(!req.session.ys_no){
    res.send("<script>alert('登录超时,请重新登录!');location.href='/';</script>");
  } else {
    res.render('ys_add',{
      name: req.session.ys_name
    });
  }
}

exports.getysList = (req, res) => {
  db.query('SELECT ys_name as name FROM ys', (err, rows) => {
    if (err) {
      throw err
    }
    console.log(rows)
    // 返回一个 JSON 响应
    res.json({
      list: rows
    })
  })
}

exports.ys_doAdd = (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = config.uploadDir // 配置上传文件的路径
  form.keepExtensions = true // 保持扩展名
  form.maxFieldsSize = 20 * 1024 * 1024 // 配置上传文件的大小
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    // 病人登记表的8个属性
    const br_no = fields.br_no;
    const br_name = fields.br_name;
    const gender = fields.gender;
    const age = fields.age;
    const address = fields.address;
    const phone = fields.phone;
    const zgys = fields.zgys;
    const bf_no = fields.bf_no;
    const zd = fields.zd;
    var sql= 'INSERT INTO br(br_no, br_name, gender, age, address, phone, zgys, bf_no, zd) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [
      br_no,
      br_name,
      gender,
      age,
      address,
      phone,
      zgys,
      bf_no,
      zd
    ], (err, rows) => {
      if (err) {
        console.log('插入出现错误')
        return res.send("<script>alert(':( 登记失败！请核实后再登录。');location.href='ys_add'</script>")
      } else {
        db.query('INSERT INTO cf(br_id) VALUE(?)',[br_no],
          (err, rows) => {
            if(err) {
              console.log("插入出现错误");
              return res.send("<script>alert(':( 登记失败！请核实后再登录。');location.href='ys_add'</script>")
            } else {
              res.send("<script>alert(':) 登记成功');location.href='ys_add'</script>");
            }
          })
      }
      // res.redirect('back');
      //添加数据之后返回原来界面
    })
 })
}

exports.ys_brMsg = (req, res) => {
  if(!req.session.ys_no) {
    res.send("<script>alert('登录超时,请重新登录!');location.href='/';</script>");
  } else {
    res.render('ys_brMsg',
      {
        name: req.session.ys_name
      });
  }
}

exports.showBrMsg = (req, res) => {
  db.query('SELECT * FROM br', (err, rows) => {
    if (err) {
      throw err
    }
    console.log("显示全部病人信息：")
    console.log(rows)
    console.log(" 病人信息显示结束")
    // 返回一个 JSON 响应
    res.json({
      list: rows
    })
  })
}

exports.searchBrMsg = (req, res) => {
  console.log('查询有关：' + req.query.name + ' 的所有数据');
  db.query("SELECT * FROM br WHERE br_name like '%"+req.query.name+"%'",[],(err, rows) => {
    if(err) {
      throw err
    }
    console.log("显示搜索信息"+rows+"显示结束");
    res.json({
      list: rows
    })
  })
}

exports.showEdit = (req, res) => {
  const id = req.query.br_no;
  // console.log(id)
  // 按id查询数据库
  db.query('SELECT * FROM br WHERE br_no=?', [id], (err, rows) => {
    if (err) {
      throw err
    }
    res.render('edit', {
      br: rows[0],
      name:req.session.ys_name
    })
  })
}

exports.doEdit = (req, res) => {
  const id = req.query.br_no
  const br_name = req.body.br_name
  const gender = req.body.gender
  const age = req.body.age
  const address = req.body.address
  const phone = req.body.phone
  const zgys = req.body.zgys
  const bf_no = req.body.bf_no
  const zd = req.body.zd
  // 数据存入数据库之前，一定要做数据安全校验
  // 更新数据库中id为id那一行的数据
  
  db.query('UPDATE br SET br_no=?, br_name=?, gender=?, age=?, address=?, phone=?, zgys=?, bf_no=?, zd=? WHERE br_no=?', [
    id, br_name, gender, age, address, phone, zgys, bf_no, zd, id
  ], (err, rows) => {
    if (err) {
      console.log('修改失败')
      // return res.send("<script>alert(':( 修改失败，请重试！');</script>")
    } else {
      if (rows.affectedRows === 1) {
        return res.json({
          code: 2000,
          msg: 'update success'
        })
      }
    }
    //如果改行的affectedRows状态不为1，则证明更新失败
      res.json({
        code: 2001,
        msg: 'uploads failed'
      })
  })
}

exports.ys_cfmsg = (req, res) => {
  // const name = req.body.getbr_name;
  // console.log("查询的病人名字:" + name);
  if(!req.session.ys_no) {
    res.send("<script>alert('登录超时,请重新登录!');location.href='/';</script>");
  } else {
    res.render('ys_cfmsg',{
      name:req.session.ys_name
    });
  }
}

exports.getysList = (req, res) => {
  db.query('SELECT ys_name as name FROM ys', (err, rows) => {
    if (err) {
      throw err
    }
    console.log(rows)
    // 返回一个 JSON 响应
    res.json({
      list: rows
    })
  })
}

exports.getbr_name = (req, res) => {
  db.query("SELECT br_name FROM br,ys WHERE zgys=ys_name AND ys_no=?",
    [req.session.ys_no],
    (err, rows) => {
      if (err) {
        throw err
      }
      // console.log('对应该医生的病人名字');
      // console.log(rows);
      res.json({
        list: rows
      })
    })
}

exports.getbr_msg = (req, res) => {
  db.query("SELECT br_no,address,phone,br_name,gender,age,cf_content,fee,zd FROM br,cf WHERE br_name=? AND br_no=br_id",
    [req.query.name],
    (err, rows) => {
      if(err) {
        throw err
      } 
      console.log("要修改处方的病人的信息");
      console.log(rows);
      res.json({
        list: rows
      })
    })
}

exports.do_cfmsg = (req, res) => {
  var name = req.body.getbr_name;
  console.log("要修改处方的病人的名字" + name);
  db.query("SELECT br_no,br_name,gender,age,cf_content,fee,zd FROM br,cf WHERE br_name=? AND br_no=br_id",
  [name],
  (err, rows) => {
    if(err) {
      throw err;
    }
    console.log("要修改处方的病人的信息");
    console.log(rows);
    res.render('ys_cfmsg1', {
      br: rows[0],
      name:req.session.ys_name
    })
  })
}

exports.modcf = (req, res) => {
  const id = req.query.br_no;
  const cfContent = req.body.cf_content;
  const fee = req.body.fee;
  const zd = req.body.zd;
  console.log("病人修改的诊断信息: " + zd)
  db.query("UPDATE br,cf SET cf_content=?,fee=?,zd=? WHERE br_no=br_id AND br_no=?",
  [cfContent,fee,zd,id],
  (err, rows) => {
    if(err) {
      console.log("更行失败");
      throw err
    } 
    if(rows.affectedRows === 2){         return res.json({
          code: 2000,
          msg: 'update success'
        })
    }
    res.json({
        code: 2001,
        msg: 'uploads failed'
      })
  })
}

exports.ys_del = (req, res) => {
  res.render('ys_del',{
    name: req.session.ys_name
  })
}

exports.ys_dodel = (req, res) => {
  const id = req.query.br_no;
  console.log("需要删除的病人的ID为：" + id);
  db.query("DELETE FROM br WHERE br_no=?",[id],
    (err, rows) => {
      if(err) {
        console.log("删除操作失败");
        throw err
      } 
      if(rows.affectedRows === 1) {
        db.query("DELETE FROM cf WHERE br_id=?",[id],
          (err, rows1) => {
            if(rows1.affectedRows === 1){
              return res.send("<script>alert('病人出院成功!');location.href='/ys_del';</script>")
            } else {
              res.send("<script>alert('删除出现错误!');location.href='/';</script>")
            }
          })
      } else {
        res.send("<script>alert('删除出现错误!');location.href='/';</script>")
      }
    })
}