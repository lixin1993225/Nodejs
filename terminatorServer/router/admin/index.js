const express = require("express");
const mysql = require("mysql");
var db = mysql.createPool({
	host:'139.199.133.110',
	user:'terminator',
	password:'lx1993225',
	database:'terminator'
});
module.exports = function(){
	var router = express.Router();
	router.use((req,res,next)=>{
		if(!req.session['admin_id'] && req.url!='/login'){
			res.redirect("/admin/login");
			console.log(req.session['admin_id'],1)
		}else{
			next();
			console.log(2)
		};
	});
	router.get('/',(req,res)=>{
		res.render("admin/artical.ejs",{});
	});
	router.use('/login',require("./login")());
	return router;
}