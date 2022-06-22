require("dotenv").config();
var express = require('express');
var axios = require("axios");
var router = express.Router();
var siteKey = process.env.SITE_KEY;
var db = [],id;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',siteKey,db,error:null,success:null});
});

router.post('/',(req,res,next)=>{
 let captchaResponse = req.body['g-recaptcha-response'];
  if (captchaResponse === undefined || captchaResponse === null ||  captchaResponse === ''){
    return res.render('index', { title: 'Express',siteKey,db,error:"something went wrong",success:""});
  }

  const secretKey = process.env.SECRET_KEY;

  axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`,
       {})
       .then(data=>{
         id = Math.floor(1000 + Math.random() * 9000);
          db.push({id,title:req.body.title,content:req.body.content});
          res.render('index', { title: 'Express',siteKey,db,error:"",success:"captcha verified && card added"});
       })
       .catch(error =>{
          res.render('index', { title: 'Express',siteKey,db,error:error.message,success:""});
       })
       
  
});

router.get("/delete/:id",(req,res)=>{
  db.splice(db.findIndex(element => element.id == id),1);
  res.render('index', { title: 'Express',siteKey,db,error:"",success:"card removed"});
})


module.exports = router;
