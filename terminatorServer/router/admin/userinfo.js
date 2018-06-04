const express = require("express");
const mysql = require("mysql");
const pathObj = require("path");
const fs = require('fs')
const db = mysql.createPool({
	host:"139.199.133.110",
	user:"terminator",
	password:"lx1993225",
	database:"terminator"
});
module.exports = function(){
	const router = express.Router();
	router.get('/',(req,res)=>{
		const userID = req.session["admin_id"];
		db.query(`SELECT * FROM userInfo_table WHERE userID='${userID}'`,(err,data)=>{
			if(err){
				res.status(500).send(err).end();
			}else{
				res.render("admin/userinfo.ejs",{userInfo:data[0]});
				console.log(data)
			}
		});
	});
	router.post('/',(req,res)=>{
		const nickname = req.body.username;
		console.log(req.files[0])
		if(req.files[0]){
			var ext = pathObj.parse(req.files[0].originalname).ext;
			var oldPath = req.files[0].path;
			var newPath = oldPath+ext;
			var newFileName = req.files[0].filename+ext;
		}else{
			var newFileName = null;
		};
		if(newFileName){
			fs.rename(oldPath,newPath,(err)=>{
				if(err){
					res.status(500).send(err).end();
				}else{
					db.query(`SELECT * FROM userInfo_table WHERE userID='${req.session["admin_id"]}'`,(err,data)=>{
						if(err){
							res.status(500).send(err).end();
						}else{
							if(data.length==0){
								db.query(`INSERT INTO userInfo_table \
									(headerimg,nickname) VALUE('${newFileName}','${nickname}')`,(err,data)=>{
									if(err){
										res.status(500).send(err).end();
									}else{
										res.redirect('/admin/userinfo')
									}
								})
							}else{
								db.query(`UPDATE userInfo_table SET \
									headerimg='${newFileName}', \
									nickname='${nickname}' \
									WHERE userID='${req.session["admin_id"]}'`,(err,data)=>{
										if(err){
											res.status(500).send(err).end();
										}else{
											res.redirect('/admin/userinfo')
										}
								});
							}
						}
					});					
				}
			})

		}else{

		};
	})
	return router;
}