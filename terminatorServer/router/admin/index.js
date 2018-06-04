const express = require("express");
module.exports = function(){
	var router = express.Router();
	router.use((req,res,next)=>{
		if(!req.session['admin_id'] && req.url!='/login'){
			res.redirect("/admin/login");
		}else{
			next();
		};
	});
	router.get('/',(req,res)=>{
		res.render("admin/artical.ejs",{});
	});
	router.use('/login',require("./login")());
	router.use('/userinfo',require("./userinfo")())
	return router;
}