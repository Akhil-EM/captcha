require("dotenv").config();
var express = require('express');
var axios = require("axios");
var router = express.Router();
var siteKey = process.env.SITE_KEY;
var names = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',siteKey,names:[],error:null,success:null});
});

router.post('/',(req,res,next)=>{
 let captchaResponse = req.body['g-recaptcha-response'];
  if (captchaResponse === undefined || captchaResponse === null ||  captchaResponse === ''){
    return res.render('index', { title: 'Express',siteKey,names,error:"something went wrong",success:""});
  }

  const secretKey = process.env.SECRET_KEY;

  axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`,
       {})
       .then(data=>{
          names.push(req.body.name);
          res.render('index', { title: 'Express',siteKey,names,error:"",success:"captcha verified"});
       })
       .catch(error =>{
          res.render('index', { title: 'Express',siteKey,names,error:error.message,success:""});
       })
       
  
})
module.exports = router;
