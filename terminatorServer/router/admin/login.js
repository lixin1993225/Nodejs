const express = require("express");
const mysql = require("mysql");
const db = mysql.createPool({
	host:'139.199.133.110',
	user:'terminator',
	password:'lx1993225',
	database:'terminator'
});
module.exports = function(){
	const router = express.Router();
	router.get('/',(req,res)=>{
		res.render('admin/login.ejs',{})
	});
	router.post('/',(req,res)=>{
		var username = req.body.username;
		var password = req.body.password;
		db.query(`SELECT * FROM user_table WHERE username='${username}'`,(err,data)=>{
			if(err){
				res.status(500).send(err).end()
			}else{
				console.log(data.length)
				if(data.length == 0){
					res.status(404).send('no data').end()
				}else{
					console.log(data[0].password==password)
					if(data[0].password==password){
						req.session['admin_id']=data[0].ID;
						res.redirect('/admin/');
					}else{
						res.status(404).send('this password is error').end()
					}
				};
			};
		});
	});
	return router;
};
