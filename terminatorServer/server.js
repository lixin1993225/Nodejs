const express = require("express");
const server = express();
const expressStatic = require("express-static");
const multer = require("multer");//处理上传图片的问题
const multerObj = multer({dest:'./static/upload'});
const mysql = require("mysql");
const cookieParser = require("cookie-parser");//读取cookie
const cookieSession = require("cookie-session");
const consolidate = require("consolidate");
const ejs = require("ejs");
const bodyParser = require("body-parser");//处理post数据
//处理post数据
server.use(bodyParser.urlencoded({
	extend:false
}));
server.use(multerObj.any());
server.use(cookieParser());
//cookiesession
(function(){
	var keysarr = [];
	for(var i=0;i<10000;i++){
		keysarr[i] = 'a_'+Math.random();
	};
	server.use(cookieSession({
		name:'blog',
		keys:keysarr,
		maxAge:20*60*1000
	}))
})();
//模版
server.set('views','./template');//模版的地址
server.set('view engine','html');//需要视图引擎渲染成html
server.engine('html',consolidate.ejs);//将ejs文件渲染成html元素;

server.use('/admin/',require('./router/admin/index.js')());//进入后台登录页面


server.use(expressStatic('./static/'));
server.listen(8088);