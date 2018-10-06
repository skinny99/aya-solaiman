var express = require("express");
var app = express();
var http = require('http');
var fs = require('fs');
var https = require('https');
var sessions = require('express-session');

var current_user ;

app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true,limit: '50mb'
}));
app.use(express.json({limit: '50mb'}));
app.use(sessions({
    secret:'omar aya',
    resave:false,
    saveUninitialized:false
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
app.engine('html', require('ejs').renderFile);
app.set('port', process.env.PORT || 3000);

app.get('/',function(req,res,next){
    
    current_user = req.session;
    
    if(!current_user.email){
        res.render('index.html');
        res.end();
    }
    else
        res.redirect('/myaccount');
});

app.get('/copyrights',function(req,res,next){
    res.render('copyRights.html');
    res.end();
});

app.post('/signup/data',function(req,res,next){
    
    var status = {error:'',wendy:'',html:''};
    var inputArr = [req.body.name,req.body.email,req.body.password,req.body.day,req.body.month,req.body.year];
    var inputID = ['name','email2','password2','day','month','year','gender','confirm'];
    var regexArr = [/^([A-Za-z]+\s[A-Za-z]){1}/i,/^[A-Za-z]+[\w.]*@[A-Za-z]+(\.[A-Za-z]{3})$/i,/^\w{8,}$/i,/^(0?[1-9]|[12][0-9]|3[01])$/,/^(0?[1-9]|1[012])$/,/^\d{4}$/];
    
    
    db_collection('db_1',{selector:{email:inputArr[1]}},'search',function(err,result){

        if(err){
            status.error = "connection";
            status.wendy = "You have lost internet connection";
            res.end(JSON.stringify(status));
        }
        else {
            if (result.docs.length != 0){
                status.error = "email2";
                status.wendy = "Hey!! You already have an account";
                res.end(JSON.stringify(status));
            }
            else {


                for(i =0; i < inputArr.length+2; i++){
                    //checking input validation

                    if(i==6){

                        if(!req.body.gender){
                            status.error +=  status.error.length == 0 ? inputID[i]: ","+inputID[i];
                        }

                        if(req.body.confirm == false){
                            status.error +=  status.error.length == 0 ? inputID[i+1]: ","+inputID[i+1];
                        }

                        break;
                    }

                    if(! regexArr[i].test(inputArr[i])){
                        status.error +=  status.error.length == 0 ? inputID[i]: ","+inputID[i];
                    }
                }

                if(status.error.length != 0){
                    if(status.error.search(',') != -1) {
                        status.wendy = "Ops! You entered wrong inputs";
                    }
                    else {

                        if(status.error == "name"){
                        status.wendy = "May you tell me your full name ?";
                        }
                        else if (status.error == "email2"){
                            status.wendy = "Ops! wrong email";
                        }
                        else if (status.error == "password2"){
                            status.wendy = "Hey!! password is less than 8 characters";
                        }
                        else if (status.error == "day"){
                            status.wendy = "What a day ?!! we should meet on that day";
                        }
                        else if (status.error == "month"){
                            status.wendy = "Ops! wrong month";
                        }
                        else if (status.error == "year"){
                            status.wendy = "That's not a year";
                        }
                        else if (status.error == "gender"){
                            status.wendy = "tell me are you a girl or a boy ?";
                        }
                        else if (status.error == "confirm"){
                            status.wendy = "You must accept the terms";
                        }
                    }

                    res.end(JSON.stringify(status));
                }
            else {
                req.data = status;
                next();
            }

        }
    }
        
        
    });
    
    // function(req,res,next){}
 // middleware for getting ids then updating them // checking <-- --> // create account // send id    
},function(req,res,next){
    var code = generate_Code();
    var data = {
        
        fullname : req.body.name,
        profile_img:"none",
        birth_date: req.body.day+"/"+req.body.month+"/"+req.body.year,
        email: req.body.email,
        pass: req.body.password, // password or none if logged by facebook and didn't add a system password
        posts:"none",
        No_posts:0,
        event_packages:"none",
        event_invitations:"none",
        Confirmed:"false_"+code+"_"+new Date().toLocaleDateString()+"_"+new Date().toLocaleTimeString(),
        general_settings:{
            default_page:"posts",
            background_img:"none",
            color:"blue"
        },
        
        privacy_settings:{
            who_see_posts:{
                who:"Everybody",
                friend_list:[]
            },
            block_list:[]
        }
        
    };
    
    // create account 
    // send code to user email 
    
    
    db_collection('db_1',data,'insert',function(err,header,body){
        // send email ;
        if(err){
            req.data.error = "connection";
            req.data.wendy = "You have lost internet connection";
            res.end(JSON.stringify(req.data));
        }
        else {
            var nodemailer = require('nodemailer');
            // Create the transporter with the required configuration for Gmail
            // change the user and pass !
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: 'bluebook.team2018@gmail.com',//system email
                    pass: '123456789blue'
                }
            });
            // setup e-mail data
            var mailOptions = {
                from: '"Bluebook Team" <bluebook.team2018@gmail.com>', // sender address (who sends)
                to: req.body.email,// list of receivers (who receives)
                subject: req.body.name+', welcome to your new Bluebook account', // Subject line
                html: '<p style="font-size: 25px; font-style: italic; text-align: center"><img src="https://image.ibb.co/hOFRE7/logo.png" /> &nbsp;Welcome to <span style="font-size: 35px; font-style: normal; font-weight: bold; color:  #0f6f92">Bluebook</span></p><p style="padding-left: 20px;">Hello,'+req.body.name+'</p><p style="padding-left: 20px;">We are so glad that you created a Bluebook account, we  wish you joyful time.</p><p style="padding-left: 20px; color: #404040">Your activation link:</p><p style="text-align: center"><a style="font-size: 25px; color:#80c8e2;" href="https://192.168.1.7:3000/signup/confirm/'+req.body.email+'/'+code+'">Activate now</a></p><p style="text-align: right;padding-right: 20px;">Bluebook team</p>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions,function(){
                req.data.html = '<br/><br/><br/><br/><br/><br/><br/><p style="text-align: center;"><img src="/images/logo.png" /></p><br/><p style="font-family: bold_text; text-align:center; font-size: 27px; font-weight: bold; color:#58bce1;" >Congratulations <span style="color:#999999;font-size: 22px; font-weight: normal; font-family: wendy_Txt">you have successfully created an account</span> </p><p style="color:#999999;text-align: center;font-size: 22px; font-weight: normal; font-family: wendy_Txt">please check your email for activation ...</p>';
                req.data.wendy = "Nice to meet you "+req.body.name;

                res.end(JSON.stringify(req.data));
            });
        }
});
    
});

app.post('/feedback',function(req,res,next){
    var feedstatus={error:'',wendy:''};
    var feeddata={message:req.body.data};
        db_collection('feedback',feeddata,'insert',function(err,header,body){
            // send email ;
            if(err){
                feedstatus.error = "connection";
                feedstatus.wendy = "You have lost internet connection";
                res.end(JSON.stringify(feedstatus));
            }
            else {
                feedstatus.wendy = "your feedback has been sent";
              res.end(JSON.stringify(feedstatus));
            }
    });
    
});

app.post('/resendmail',function(req,res,next){
    
        var status = {error:'',wendy:'',html:''}; 
    
        db_collection('db_1',{selector:{
            email:req.body.email
        }},'search',function(err,result){
            
            if(err){
                status.error = "connection";
                status.wendy = "You have lost internet connection";
                res.end(JSON.stringify(status));
            }
            else {
              
                var confirm_data = result.docs[0].Confirmed.split('_');
                var nodemailer = require('nodemailer');
                // Create the transporter with the required configuration for Gmail
                // change the user and pass !
                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // use SSL
                    auth: {
                        user: 'bluebook.team2018@gmail.com',//system email
                        pass: '123456789blue'
                    }
                });
                // setup e-mail data
                var mailOptions = {
                    from: '"Bluebook Team" <bluebook.team2018@gmail.com>', // sender address (who sends)
                    to: req.body.email,// list of receivers (who receives)
                    subject: result.docs[0].fullname+', welcome to your new Bluebook account', // Subject line
                    html: '<p style="font-size: 25px; font-style: italic; text-align: center"><img src="https://image.ibb.co/hOFRE7/logo.png" /> &nbsp;Welcome to <span style="font-size: 35px; font-style: normal; font-weight: bold; color:  #0f6f92">Bluebook</span></p><p style="padding-left: 20px;">Hello,'+result.docs[0].fullname+'</p><p style="padding-left: 20px;">We are so glad that you created a Bluebook account, we  wish you joyful time.</p><p style="padding-left: 20px; color: #404040">Your activation link:</p><p style="text-align: center"><a style="font-size: 25px; color:#80c8e2;" href="https://192.168.1.7:3000/signup/confirm/'+req.body.email+'/'+confirm_data[1]+'">Activate now</a></p><p style="text-align: right;padding-right: 20px;">Bluebook team</p>' // html body
            };
    
                // send mail with defined transport object
                transporter.sendMail(mailOptions,function(){
                    status.html = '<br/><br/><br/><br/><br/><br/><br/><p style="text-align: center;"><img src="/images/logo.png" /></p><br/><p style="font-family: bold_text; text-align:center; font-size: 27px; font-weight: bold; color:#58bce1;" >Congratulations <span style="color:#999999;font-size: 22px; font-weight: normal; font-family: wendy_Txt">you have successfully created an account</span> </p><p style="color:#999999;text-align: center;font-size: 22px; font-weight: normal; font-family: wendy_Txt">please check your email for activation ...</p>';
                    status.wendy = "Nice to meet you "+result.docs[0].fullname;
    
                    res.end(JSON.stringify(status));
                });
                
            }
        });
    
});

app.get('/signup/confirm/:email/:code',function(req,res,next){
    
    current_user = req.session;
    
    db_collection('db_1',{selector:{
        email:req.params.email
    }},'search',function(err,result){
        
        if(result.docs.length == 0){
            res.redirect('/');
        }
        else {
            
            var confirm_data = result.docs[0].Confirmed.split('_');
            var user_data = result.docs[0]; 
            
            user_data.Confirmed = "true";
            
            if(confirm_data[1] == req.params.code){
                
                db_collection('db_1',user_data,'update',function(){
                    
                    current_user.email = user_data.email;
                    current_user.password = user_data.pass;
                    current_user.name = user_data.fullname;
                    current_user.pic = user_data.profile_img;
                    current_user.shortcuts = user_data.general_settings.shortcuts_icons;
                    current_user.ID = user_data._id;
                    current_user.rev = user_data._rev;
                    current_user.generalSettings = user_data.general_settings;
                    current_user.privacySettings = user_data.privacy_settings;
                    current_user.eventList = user_data.event_packages;
                    current_user.eventInvite = user_data.event_invitations;
                    
                    res.redirect('/myaccount');  // change this to user home page
                    
                });
                
            }
            else {
                res.redirect('/');
            }
            
            
        }
        
    });
    
    
});

app.post('/login',function(req,res,next){
    
    current_user = req.session;
    
    if(req.body.id == 1){
        var status = {error:'',wendy:'',image:''};
        db_collection('db_1',{selector:{
            email: req.body.email
        }},'search',function(err,result){

            if(err){
                status.error = "connection";
                status.wendy = "You have lost internet connection";
                res.end(JSON.stringify(status));
            }
            else {
                if (result.docs.length == 0){
                    status.error = "email";
                    status.wendy = "Hey!! this email dosen't exist ";
                    res.end(JSON.stringify(status));
                }
                else if(result.docs[0].Confirmed.includes('false')){

                    status.error = "not confirmed";
                    status.wendy = "You didn't confirm your email, re-send confirmation ?";
                    res.end(JSON.stringify(status));

                }else{
                    
                    status.image = result.docs[0].profile_img;
                    
                    status.wendy = "Welcome back "+ result.docs[0].fullname.split(' ')[0];
                    res.end(JSON.stringify(status));

                }
            }
          });
        
    }
    else if (req.body.id == 2 && !req.body.pass){
        
        var status = {error:'',wendy:''}; 
        db_collection('db_1',{selector:{
            email:req.body.email
        }},'search',function(err,result){
            if(err){
                status.error = "connection";
                status.wendy = "You have lost internet connection";
                res.end(JSON.stringify(status));
            }
            else {
                if(result.docs[0].pass != req.body.password){
                    status.error = "wrong password";
                    status.wendy = "This is a wrong password";
                    res.end(JSON.stringify(status));
                }
                else {
                    
                    current_user.email = result.docs[0].email;
                    current_user.password = result.docs[0].pass;
                    current_user.name = result.docs[0].fullname;
                    current_user.pic = result.docs[0].profile_img;
                    current_user.ID = result.docs[0]._id;
                    current_user.rev = result.docs[0]._rev;
                    current_user.generalSettings = result.docs[0].general_settings;
                    current_user.privacySettings = result.docs[0].privacy_settings;
                    
                    
                    
                    console.log('\n'+current_user.name+' logged in at '+ new Date().getHours() + ':'+new Date().getMinutes());
                    
                    res.end(JSON.stringify(status));
                }
                
            }
        });


    }
    
    else if (req.body.id == 2 && req.body.pass) {
        
        var status = {error:'',wendy:''}; 
        db_collection('db_1',{selector:{
            email:req.body.email
        }},'search',function(err,result){
            if(err){
                status.error = "connection";
                status.wendy = "You have lost internet connection";
                res.end(JSON.stringify(status));
            }
            else {
              
                var nodemailer = require('nodemailer');
                // Create the transporter with the required configuration for Gmail
                // change the user and pass !
                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // use SSL
                    auth: {
                        user: 'bluebook.team2018@gmail.com',//system email
                        pass: '123456789blue'
                    }
                });
                // setup e-mail data
                var mailOptions = {
                    from: '"Bluebook Team" <bluebook.team2018@gmail.com>', // sender address (who sends)
                    to: req.body.email,// list of receivers (who receives)
                    subject: result.docs[0].fullname+', your password for the bluebook account', // Subject line
                    html: '<p style="font-size: 25px; font-style: italic; text-align: center"><img src="https://image.ibb.co/hOFRE7/logo.png" /> &nbsp;Welcome to <span style="font-size: 35px; font-style: normal; font-weight: bold; color:  #0f6f92">Bluebook</span></p><p style="padding-left: 20px;">Hello,'+result.docs[0].fullname +'</p><p style="padding-left: 20px;">your password is '+result.docs[0].pass+'.</p><p style="text-align: right;padding-right: 20px;">Bluebook team</p>' // html body
                };
    
                // send mail with defined transport object
                transporter.sendMail(mailOptions,function(){
                   status.wendy = "please check your email for your password";
    
                   res.end(JSON.stringify(status));
                });
                
            }
        });


    }
});

app.post('/loginfb',function(req,res,next){
    
    current_user = req.session;
    
    var status = {error:'',wendy:'',html:''};
    var inputArr = req.body.password;
    var regexArr = /^\w{8,}$/i;
    
    
    if(!req.body.password)
    {
        var db = db_connect('db_1');
        
        db.find({selector:{
            email:req.body.email
        }},function(err,result){
            
            if(err){
                status.error = "connection";
                status.wendy = "You have lost internet connection";
                res.end(JSON.stringify(status));
            }
            else {
                if (result.docs.length != 0){
                    if(result.docs[0].Confirmed.includes('false')){

                        status.error = "not confirmed";
                        status.wendy = "You didn't confirm your email, re-send confirmation ?";
                        res.end(JSON.stringify(status));

                    }
                    else{
                        current_user.email = req.body.email;
                        current_user.name = result.docs[0].fullname;
                        current_user.password = result.docs[0].pass;
                        current_user.pic = result.docs[0].profile_img;
                        current_user.ID = result.docs[0]._id;
                        current_user.rev = result.docs[0]._rev;
                        current_user.generalSettings = result.docs[0].general_settings;
                        current_user.privacySettings = result.docs[0].privacy_settings;
                        
                        
                        
                    console.log('\n'+current_user.name+' logged in at '+ new Date().getHours() + ':'+new Date().getMinutes());
                        
                        res.end(JSON.stringify(status));
                        
                    }
                }
                else {
                    status.error="Nopassword";
                    status.wendy="enter an 8 charchter password";
                    res.end(JSON.stringify(status));
                }
            }
            
            
        });  
    }
    else
    {
        if(! regexArr.test(inputArr))
        {
            status.error="Wrongpassword";
            status.wendy="This is not an 8 charchter password";
            res.end(JSON.stringify(status));
        }
        else{
            req.data = status;
            next();
        }
    }
    // function(req,res,next){}
 // middleware for getting ids then updating them // checking <-- --> // create account // send id    
},function(req,res,next){
    var code = generate_Code();
    var data = {
        
        fullname : req.body.name,
        profile_img:"none",
        birth_date: req.body.day+"/"+req.body.month+"/"+req.body.year,
        email: req.body.email,
        pass: req.body.password, // password or none if logged by facebook and didn't add a system password
        posts:"none",
        No_posts:0,
        event_packages:"none",
        event_invitations:"none",
        Confirmed:"false_"+code+"_"+new Date().toLocaleDateString()+"_"+new Date().toLocaleTimeString(),
        general_settings:{
            default_page:"posts", 
            background_img:"none",
            color:"blue"
        },
        
        privacy_settings:{
            who_see_posts:{
                who:"Everybody",
                friend_list:[]
            },
            block_list:[]
        }
        
    };
    
    // create account 
    // send code to user email 
    
    
    db_collection('db_1',data,'insert',function(err,header,body){
        // send email ;
        if(err){
            req.data.error = "connection";
            req.data.wendy = "You have lost internet connection";
            res.end(JSON.stringify(req.data));
        }
        else {
            var nodemailer = require('nodemailer');
            // Create the transporter with the required configuration for Gmail
            // change the user and pass !
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: 'bluebook.team2018@gmail.com',//system email
                    pass: '123456789blue'
                }
            });
            // setup e-mail data
            var mailOptions = {
                from: '"Bluebook Team" <bluebook.team2018@gmail.com>', // sender address (who sends)
                to: req.body.email,// list of receivers (who receives)
                subject: req.body.name+', welcome to your new Bluebook account', // Subject line
                html: '<p style="font-size: 25px; font-style: italic; text-align: center"><img src="https://image.ibb.co/hOFRE7/logo.png" /> &nbsp;Welcome to <span style="font-size: 35px; font-style: normal; font-weight: bold; color:  #0f6f92">Bluebook</span></p><p style="padding-left: 20px;">Hello,'+req.body.name+'</p><p style="padding-left: 20px;">We are so glad that you created a Bluebook account, we  wish you joyful time.</p><p style="padding-left: 20px; color: #404040">Your activation link:</p><p style="text-align: center"><a style="font-size: 25px; color:#80c8e2;" href="https://192.168.1.7:3000/signup/confirm/'+req.body.email+'/'+code+'">Activate now</a></p><p style="text-align: right;padding-right: 20px;">Bluebook team</p>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions,function(){
                req.data.html = '<br/><br/><br/><br/><br/><br/><br/><p style="text-align: center;"><img src="/images/logo.png" /></p><br/><p style="font-family: bold_text; text-align:center; font-size: 27px; font-weight: bold; color:#58bce1;" >Congratulations <span style="color:#999999;font-size: 22px; font-weight: normal; font-family: wendy_Txt">you have successfully created an account</span> </p><p style="color:#999999;text-align: center;font-size: 22px; font-weight: normal; font-family: wendy_Txt">please check your email for activation ...</p>';
                req.data.wendy = "Nice to meet you "+req.body.name;

                res.end(JSON.stringify(req.data));
            });
        }
});
    
});

app.get('/logout',function(req,res,next){
    req.session.destroy(function(err){
        console.log('\n'+current_user.name+' logged out at '+ new Date().getHours() + ':'+new Date().getMinutes());
        res.redirect('/'); 
    });
});

app.get('/myaccount',function(req,res,next){
    current_user = req.session;
    if(current_user.email){
        var basic = false;
        
        if(!JSON.stringify(req.query).includes('basic')){
            basic = true;
        }
        
        if(req.query.content){
            res.end(generateHtml(basic,req.query.content,current_user));
        }
        else {
            res.end(generateHtml(basic,current_user.generalSettings.default_page,current_user));
        }
        
        
    }
    else {
        res.redirect('/');
    }
    
});

app.get('/test',function(req,res,next){
    res.render('myaccount.html');
    res.end();
});

app.get('/tag/:what',function(req,res,next){
    current_user = req.session;
    
    if(current_user.email){
        
            // req.query.name
            var friends_data;
            
            db_collection('db_1',{selector:{
                _id:{"$ne":current_user.ID}
            }},'search',function(err,result){
                if(result.docs){
                    friends_data = new Array(result.docs.length);
                    for (var i=0;i<result.docs.length;i++){
                        if(req.params.what == 'post')
                        friends_data[i] = {"id":result.docs[i]._id,"name":result.docs[i].fullname,"profile_img":result.docs[i].profile_img};
                        else
                            friends_data[i] = {"id":result.docs[i]._id,"name":result.docs[i].fullname,"profile_img":result.docs[i].profile_img,bg:result.docs[i].general_settings.background_img,email:result.docs[i].email,postNo:result.docs[i].No_posts};
                    }

                    if(!req.query.all)
                        res.end(JSON.stringify(Search(friends_data,req.query.name)));
                    else
                        res.end(JSON.stringify(friends_data));
                }
                else{
                    console.log(err);
                }
            });
        
        
    }
    
});

function friendsID(Ids){
    
    var list = new Array(Ids.length);
    
    for (var i=0;i<Ids.length;i++){
        list[i] = {"_id":Ids[i]};
    }
    
    return list;
}

function Search(friends_data,query){
    
    var result = [];
    
    for (var i=0;i<friends_data.length;i++){
        if(friends_data[i].name.toLowerCase().search(query.trim().toLowerCase()) == 0 && query.trim().length){
            result.push(friends_data[i]);
        }
    }
    
    return result;
}

app.post('/create/:what',function(req,res,next){
    
    current_user = req.session;
    
    var data = {};
    
    if(current_user.ID){
        if(req.params.what.toString().toLowerCase() == "post"){
            
            // check post category
            // check user post packages
            // if there is a package with the same category check the number of posts in it
            // if 20 then create a new package with that category else add in the package the new post 
            // increment the no of posts in the user account and if a new package is created add it in the db_1 user posts
            
        }
        else if (req.params.what.toString().toLowerCase() == "event"){
            
            var d=new Date();
            var eventpackageid;
            var friendsarray=[];
            var eventtime;
            
            function checkTimeOrDate(time)
            {
                if(time){
                    if ((req.body.hour.length!=0||req.body.minute.length!=0)&&((req.body.hour.length!=0&&req.body.minute.length!=0&&(!/^(0?[0-9]|[01][0-9]|2[0124])$/.test(req.body.hour)||!/^(0?[0-9]|[012345][0-9])$/.test(req.body.minute)))||(req.body.hour.length!=0&&req.body.minute.length==0&&(!/^(0?[1-9]|[1][0-9]|2[0124])$/.test(req.body.hour)))||(!req.body.hour.length&&req.body.minute.length!=0&&(!/^(0?[1-9]|[12345][0-9])$/.test(req.body.minute))))){
                        return true;
                    }
                    return false;
                }
                else{
                    if((req.body.year<d.getFullYear())||(req.body.month<d.getMonth()&&req.body.year==d.getFullYear())||(req.body.month==d.getMonth()&&req.body.day<d.getDate()&&req.body.year==d.getFullYear()))
                        return true;
                    else
                        return false;
                }
            }
            
            if(!/^(0?[1-9]|[12][0-9]|3[01])$/.test(req.body.day))
            {
                res.end(JSON.stringify({error:"day"}));
            }
            else if(!/^(0?[1-9]|1[012])$/.test(req.body.month))
            {
                res.end(JSON.stringify({error:"month"}));
            }
            else if(!/^\d{4}$/.test(req.body.year))
            {
                res.end(JSON.stringify({error:"year"}));
            }
            else if (checkTimeOrDate(false))
            {
                res.end(JSON.stringify({error:"date"}));
            }
            else if(checkTimeOrDate(true))
            {  
                if(req.body.hour.length!=0&&req.body.minute.length!=0){
                
                     if(!/^(0?[0-9]|[01][0-9]|2[0124])$/.test(req.body.hour)||!/^(0?[0-9]|[012345][0-9])$/.test(req.body.minute)){
                         res.end(JSON.stringify({error:"time"}));
                     }
                }
                else if(req.body.hour.length!=0&&req.body.minute.length==0){
                    
                    if(!/^(0?[1-9]|[1][0-9]|2[0124])$/.test(req.body.hour)){
                        res.end(JSON.stringify({error:"hour"}));
                    }
                }
                else if(!req.body.hour.length&&req.body.minute.length!=0){
                    
                    if(!/^(0?[1-9]|[12345][0-9])$/.test(req.body.minute)){
                        res.end(JSON.stringify({error:"minute"}));
                    }
                }             
            }
            else{
                if(!req.body.hour&&!req.body.minute){ 
                    eventtime='All day';
                }
                else if(!req.body.hour&&req.body.minute){
                    eventtime=00+':'+req.body.minute;
                }
                else if(req.body.hour&&!req.body.minute){
                    eventtime=req.body.hour+':'+00;
                }
                else{
                    eventtime=req.body.hour+':'+req.body.minute;
                }
                 db_collection('db_1',{selector:{ _id:(req.body.friends.length? { $in:req.body.friends}:{ $ne:current_user.ID}) }},'search',function(err,result){
                    if(!err){ 
                        var arrayminup;
                        for(i=0;i<result.docs.length;i++)
                        {
                            arrayminup={ };
                                arrayminup.friend_id=result.docs[i]._id,
                                arrayminup.friend_name=result.docs[i].fullname,
                                arrayminup.friend_img=result.docs[i].profile_img.replace("w_145,h_145","w_31,h_31");

                            friendsarray.push(arrayminup);
                        }
                     }
                    else {
                        res.end('Error');
                    }
                });
            var insertpackage = {

                    av_ids: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
                    data: [
                        {
                          "id": "0",
                          "owner_id": current_user.ID,
                          "owner_name": current_user.name,
                          "owner_img": current_user.pic,
                          "date": req.body.day+'/'+req.body.month+'/'+req.body.year,
                          "time": eventtime,
                          "title": req.body.title,
                          "description": req.body.description,
                          "invited_friends":friendsarray
                        }
                      ]    
                };
                db_collection('db_1',{selector:{_id:current_user.ID}},'search',function(err,result1){
                 if(!err){

                     if(result1.docs[0].event_packages!='none'){
                    var eventpackage=result1.docs[0].event_packages.split(',');
                     eventpackageid= eventpackage[eventpackage.length-1];
                     db_collection('db_3',{selector:{_id:eventpackageid}},'search',function(err,result){
                        if(!err){
                            if(result.docs.length!=0&&result.docs[0].av_ids.length!=0){
                            //hant2aked el 2awel en el docs msh fadih

                            var newid =""+result.docs[0].av_ids.shift();

                            var updatepackage = {
                                //the db structure
                                    //el id mota3'ier
                                          "id":  newid,
                                          "owner_id": current_user.ID,
                                          "owner_name": current_user.name,
                                          "owner_img": current_user.pic,
                                          "date": req.body.day+'/'+req.body.month+'/'+req.body.year,
                                          "time": eventtime,
                                          "title": req.body.title,
                                          "description": req.body.description,
                                          "invited_friends":friendsarray
                                };
                             //hena hanshil men av_ids 
                            //we han7oto fel id beta3 el event 
                            result.docs[0].data.push(updatepackage);
                            db_collection('db_3',result.docs[0],'update',function(error,response){
                                if(!err){
                                    db_collection('db_1',{selector:{ _id:{$in:req.body.friends} }},'search',function(err,result2){
                                        if(!err){

                                            for(var i=0;i<result2.docs.length;i++){
                                                if(result2.docs[i].event_invitations == 'none'){
                                                    result2.docs[i].event_invitations =result.docs[0]._id+'_'+newid;
                                                }
                                                else{
                                                    result2.docs[i].event_invitations =result2.docs[i].event_invitations+','+result.docs[0]._id+'_'+newid;
                                                }
                                            }
                                            var db = db_connect('db_1');
                                            db.bulk({docs:result2.docs},function(err){
                                                  res.end(JSON.stringify({}));
                                            });
                                        }
                                    });
                                } 
                               else{
                                console.log(err);
                               }
                            });
                           //the end of the if 
                        }
                        else 
                        {
                            db_collection('db_3',insertpackage,'insert',function(err,header,body){
                                // send email ;
                                if(err){
                                    console.log(err);
                                    res.end();
                                }
                                else
                                {
                                   //update the user db

                                     result1.docs[0].event_packages=result1.docs[0].event_packages+','+header.id;
                                    db_collection('db_1',result1.docs[0],'update',function(error,response){
                                        if(!err){           
                                            db_collection('db_1',{selector:{ _id:{$in:req.body.friends} }},'search',function(err,result2){
                                                if(!err){

                                                    for(var i=0;i<result2.docs.length;i++){
                                                        if(result2.docs[i].event_invitations == 'none'){
                                                            result2.docs[i].event_invitations =header.id+'_'+0;
                                                        }
                                                        else{
                                                            result2.docs[i].event_invitations =result2.docs[i].event_invitations+','+header.id+'_'+0;
                                                        }
                                                    }
                                                    var db = db_connect('db_1');

                                                    db.bulk({docs:result2.docs},function(err){

                                                          res.end(JSON.stringify({}));

                                                    });
                                                }
                                            });
                                        } 
                                       else{
                                        console.log(err);
                                       }
                                    });
                                }
                            });
                            }
                        }
                        else {
                            console.log(err);
                        }
                    });    
                     }
                     else 
                     {
                        db_collection('db_3',insertpackage,'insert',function(err,header,body){
                            // send email ;
                            if(err){
                                console.log(err);
                                res.end();
                            }
                            else
                            {
                               //update the user db
                                 result1.docs[0].event_packages=""+header.id;
                                db_collection('db_1',result1.docs[0],'update',function(error,response){
                                    if(!err){

                                        db_collection('db_1',{selector:{ _id:{$in:req.body.friends} }},'search',function(err,result2){
                                            if(!err){

                                                for(var i=0;i<result2.docs.length;i++){
                                                    if(result2.docs[i].event_invitations == 'none'){
                                                        result2.docs[i].event_invitations =header.id+'_'+0;
                                                    }
                                                    else{
                                                        result2.docs[i].event_invitations =result2.docs[i].event_invitations+','+header.id+'_'+0;
                                                    }
                                                }
                                                var db = db_connect('db_1');

                                                db.bulk({docs:result2.docs},function(err){
                                                    console.log('before the second insert');
                                                      res.end(JSON.stringify({}));
                                                });
                                            }
                                        });
                                    } 
                                    else{
                                        console.log(err);
                                    }
                                });
                            }
                        });
                     }
                }
             });
            }
        }
        
    }
    
});

app.post('/camera',function(req,res,next){
    
    current_user = req.session;
    
    if(current_user.email){
        var base64Data = req.body.imageDataURL.replace(/^data:image\/png;base64,/, "");
        fs.writeFile(__dirname+"/public/temp/"+current_user.ID+".png", base64Data, 'base64', function(err) {
            if(!err){

                var Path = __dirname+"/public/temp/"+current_user.ID+".png";
                var cloudinary = require('cloudinary');

                cloudinary.config({ 
                  cloud_name: 'du7f72t0q', 
                  api_key: '131576942194972', 
                  api_secret: 'P8es0dXE60CH3OVX5p90EN9Bgr0' 
                });

                cloudinary.uploader.upload(Path, function(result) {
                    var URLs = "";
                    var effects =['w_135,h_135,c_fill,e_cartoonify','w_135,h_135,c_fill,e_blackwhite','w_135,h_135,c_fill,e_oil_paint:0'];
                    var lenght = result.url.search('upload')+7;

                    for (var j=0;j<3;j++){
                        var img_url = '';

                        for (var i=0;i<result.url.length;i++){

                            if (i == lenght){
                                img_url += effects[j]+'/';
                            }

                            img_url += result.url.charAt(i);

                        }
                        URLs += img_url + (j == 2? "":"-");
                    }

                    fs.unlink(Path, function(err){});

                    res.end(JSON.stringify({images:URLs}));
                });
            }
            else {
                res.end('Error');
            }
        });
    }
    else {
        res.redirect('/');
    }
    
});

app.post('/upload/:what',function(req,res,next){
    
    current_user = req.session;
    
    if(current_user.email){
        
        if(req.params.what == "image"){
            
                fs.writeFile(__dirname+"/public/temp/"+current_user.ID+".jpg", req.body.imageDataURL, 'base64', function(err) {
                    if(!err){
                        var Path = __dirname+"/public/temp/"+current_user.ID+".jpg";
                        var cloudinary = require('cloudinary');
                        
                        cloudinary.config({ 
                          cloud_name: 'du7f72t0q', 
                          api_key: '131576942194972', 
                          api_secret: 'P8es0dXE60CH3OVX5p90EN9Bgr0' 
                        });
                        
                        
                            cloudinary.v2.uploader.upload(Path, function(err,result) {
                                if(!err){

                                    var lenght = result.url.search('upload')+7;

                                    var img_url = '';

                                    for (var i=0;i<result.url.length;i++){

                                        if (i == lenght){
                                            img_url += 'w_140,h_140,c_fill/';
                                        }

                                        img_url += result.url.charAt(i);

                                    }

                                    fs.unlink(Path, function(err){});
                                    res.end(JSON.stringify({image:img_url}));
                                }
                                else {
                                    console.log('Error');
                                    res.end('Error');
                                }
                            });
                            
                    }
                    else {
                        res.end('Error');
                    }
                });
            
        }
        else if (req.params.what == "video"){
            fs.writeFile(__dirname+"/public/temp/"+current_user.ID+".mp4", req.body.videoDataURL, 'base64', function(err) {
                    if(!err){
                        var Path = __dirname+"/public/temp/"+current_user.ID+".mp4";
                        var cloudinary = require('cloudinary');
                        
                        cloudinary.config({ 
                          cloud_name: 'du7f72t0q', 
                          api_key: '131576942194972', 
                          api_secret: 'P8es0dXE60CH3OVX5p90EN9Bgr0' 
                        });

                        cloudinary.v2.uploader.upload(Path,{ resource_type: "video"} ,function(err,result) {
                            if(!err){
                                fs.unlink(Path, function(err){});
                                res.end(JSON.stringify({video:result.url}));
                            }
                            else {
                                console.log('Error');
                                res.end('Error');
                            }
                        });
                            
                    }
                    else {
                        res.end('Error');
                    }
                });
            
        }
        else if(req.params.what == "file"){
			
			var base64 = req.body.DataURL.split(',')[1];
            
            fs.writeFile(__dirname+"/public/temp/"+current_user.ID+"."+req.body.Extension, base64, 'base64', function(err) {
                    if(!err){
                        var Path = __dirname+"/public/temp/"+current_user.ID+"."+req.body.Extension;
                        var cloudinary = require('cloudinary');
                        
                        cloudinary.config({ 
                          cloud_name: 'du7f72t0q', 
                          api_key: '131576942194972', 
                          api_secret: 'P8es0dXE60CH3OVX5p90EN9Bgr0' 
                        });
                        
                        cloudinary.v2.uploader.upload(Path,{ resource_type: "raw"} ,function(err,result) {
                            if(!err){
                                fs.unlink(Path, function(err){});
                                res.end(JSON.stringify({file:result.url}));
                            }
                            else {
                                console.log('Error');
                                res.end('Error');
                            }
                        });
                            
                        
                    }
                    else {
                        res.end('Error');
                    }
                });
		}
        else if(req.params.what == "audio"){
			
			var base64 = req.body.AudioDataURL.split(',')[1];
            
            fs.writeFile(__dirname+"/public/temp/"+current_user.ID+".mp3", base64, 'base64', function(err) {
                    if(!err){
                        var Path = __dirname+"/public/temp/"+current_user.ID+".mp3";
                        var cloudinary = require('cloudinary');
                        
                        cloudinary.config({ 
                          cloud_name: 'du7f72t0q', 
                          api_key: '131576942194972', 
                          api_secret: 'P8es0dXE60CH3OVX5p90EN9Bgr0' 
                        });
                        
                        cloudinary.v2.uploader.upload(Path,{ resource_type: "raw"} ,function(err,result) {
                            if(!err){
                                fs.unlink(Path, function(err){});
                                res.end(JSON.stringify({audio:result.url}));
                            }
                            else {
                                console.log('Error');
                                res.end('Error');
                            }

                        });
                        
                    }
                    else {
                        res.end('Error');
                    }
                });
		}
        
    }
    else {
        res.redirect('/');
    }
    
});

app.post('/cloudaniryProfile/:status',function(req,res,next){

    current_user = req.session;
    
    if(current_user.ID){
        
        fs.writeFile(__dirname+"/public/temp/"+current_user.ID+".jpg", req.body.imageDataURL, 'base64', function(err) {
            if(!err){
                var Path = __dirname+"/public/temp/"+current_user.ID+".jpg";
                var cloudinary = require('cloudinary');
                
                cloudinary.config({ 
                  cloud_name: 'du7f72t0q', 
                  api_key: '131576942194972', 
                  api_secret: 'P8es0dXE60CH3OVX5p90EN9Bgr0' 
                });


                    cloudinary.v2.uploader.upload(Path, function(err,result) {
                        if(!err){

                            var lenght = result.url.search('upload')+7;

                            var img_url = '';

                            for (var i=0;i<result.url.length;i++){

                                if (i == lenght){
                                    img_url += 'w_145,h_145,c_fill/';
                                }

                                img_url += result.url.charAt(i);

                            }
                            
                            if(req.params.status == 'save'){
                                current_user.generalSettings.background_img = img_url.replace('w_145,h_145,c_fill','w_809,h_617,c_fill');
                                
                                db_collection('db_1',{selector:{_id:current_user.ID}},'search',function(Err,Result){
                                   if(!Err){
                                       Result.docs[0].general_settings.background_img = img_url.replace('w_145,h_145,c_fill','w_809,h_617,c_fill');
                                       
                                       db_collection('db_1',Result.docs[0],'update');
                                   }
                                    else{
                                        console.log(Err);
                                    }
                                    
                                });
                                
                            }
                            
                            fs.unlink(Path, function(err){});
                            res.end(JSON.stringify({image:img_url}));

                        }
                        else {
                            console.log('Error');
                            res.end('Error');
                        }
                    });

            }
            else {
                console.log('Error');
                res.end('Error');
            }
        });
    }
    else{
        res.redirect('/');
    }
    
});

app.post('/updateProfile',function(req,res,next){
   current_user = req.session;
    
    var newData = req.body;
    
    if(current_user.ID){
        if(newData.old_password == current_user.password){
            
            if(/^([A-Za-z]+\s[A-Za-z]){1}/i.test(newData.full_name)|| newData.full_name == 'empty'){
                if(/^\w{8,}$/i.test(newData.new_password) || newData.new_password == 'empty'){
                    db_collection('db_1',{selector:{ _id:current_user.ID }},'search',function(err,result){
                        if(!err){
                            
                            result.docs[0].pass = (newData.new_password != 'empty' ? newData.new_password:result.docs[0].pass);
                            current_user.password = (newData.new_password != 'empty' ? newData.new_password:result.docs[0].pass);
                            
                            result.docs[0].fullname = (newData.full_name != 'empty' ? newData.full_name:result.docs[0].fullname);
                            current_user.name = (newData.full_name != 'empty' ? newData.full_name:result.docs[0].fullname);
                            
                            result.docs[0].profile_img = (newData.image == 'none' ? current_user.pic:(newData.image == 'remove' ? 'none':newData.image));
                            current_user.pic = (newData.image == 'none' ? current_user.pic:(newData.image == 'remove' ? 'none':newData.image));
                            
                            db_collection('db_1',result.docs[0],'update',function(result){
                                res.end(JSON.stringify({status:'ok'}));
                            });
                        }
                        else{
                            console.log('Error');
                            res.end('Error');
                        }
                    });
                }
                else{
                    res.end(JSON.stringify({error:'wrong new password\nminmum 8 characters'}));   
                }
            }
            else{
                res.end(JSON.stringify({error:'wrong name\nplease enter your full name'}));
            }
            
        }
        else{
            res.end(JSON.stringify({error:'wrong password'}));
        }
        
    }
    else{
        res.redirect('/');
    }
    
});

app.get('/user_data/:what/:package',function(req,res,next){
   current_user = req.session;
    
    if(current_user.email){
        if(req.params.what == 'myevents'){

            // get from database
            db_collection('db_1',{selector:{_id:current_user.ID}},'search',function(ERR,RESULT){
                if(!ERR){
                    
                    if(RESULT.docs[0].event_packages == 'none'){
                        res.end(JSON.stringify({data:'empty'}));
                    }
                    else{

                        var IDs = RESULT.docs[0].event_packages.split(',');

                        if(req.params.package){

                            if(req.params.package >= IDs.length){
                                res.end(JSON.stringify({data:'finished'}));
                            }
                            else {
                                db_collection('db_3',{selector:{_id:IDs[parseInt(req.params.package)]}},'search',function(err,result){
                                    if(!err){
                                        result.docs[0].today = [];

                                        for (var i=0;i<result.docs[0].data.length;i++){
                                            result.docs[0].today.push(checkDate(result.docs[0].data[i].date));
                                        }

                                        res.end(JSON.stringify(result.docs[0]));
                                    }
                                    else {
                                        res.end('Error');
                                    }
                                });
                            }

                        }
                        else {

                            db_collection('db_3',{selector:{_id:IDs[0]}},'search',function(err,result){
                                if(!err){
                                    res.end(JSON.stringify(result.docs[0]));
                                }
                                else {
                                    res.end('Error');
                                }
                            });
                        }
                    }
                }
            });
            
        }
        else if (req.params.what == 'upevents'){
            
            db_collection('db_1',{selector:{_id:current_user.ID}},'search',function(ERR,RESULT){
                    if(!ERR){

                        if(RESULT.docs[0].event_invitations == 'none'){
                            res.end(JSON.stringify({data:'empty'}));
                        }
                        else{
                            var PE_ID = getSelected_ids(RESULT.docs[0].event_invitations.split(','),parseInt(req.params.package));

                            var P_ID =[];

                            for (var i=0;i<PE_ID.length;i++){
                                P_ID.push(PE_ID[i].split('_')[0]);
                            }
                            
                            var PE_JSON = getJSON(PE_ID);

                            if(req.params.package){

                                if(PE_ID == 'finished'){
                                    res.end(JSON.stringify({data:'finished'}));
                                }
                                else {

                                    db_collection('db_3',{selector:{ _id:{ $in:P_ID } }},'search',function(err,result){
                                        if(!err){
                                            var responseJSON = {data:[],today:[]};
                                            for (var i=0;i<result.docs.length;i++){
                                                for(var j=0;j<result.docs[i].data.length;j++){
                                                    // 
                                                    var docIDS = PE_JSON[result.docs[i]._id].split(',');
                                                    if(docIDS.includes(result.docs[i].data[j].id)){
                                                        responseJSON.data.push(result.docs[i].data[j]);
                                                    }
                                                }
                                            }

                                            responseJSON.data.sort(function(z,y){

                                                var d1 = z.date.split('/'),d2 = y.date.split('/');

                                                for (var i=0;i<d1.length;i++){
                                                    d1[i] = parseInt(d1[i]);
                                                    d2[i] = parseInt(d2[i]);
                                                }


                                                if(d1[2] > d2[2]){
                                                    return 1;
                                                }
                                                else if(d1[2] == d2[2]){
                                                    if(d1[1] == d2[1]){
                                                        if(d1[0] == d2[0]){
                                                            return 1;
                                                        }
                                                        else if(d1[0] > d2[0]){
                                                            return 1;
                                                        }
                                                        else{
                                                            return 0;
                                                        }
                                                    }
                                                    else if(d1[1] > d2[1]){
                                                        return 1;
                                                    }
                                                    else{
                                                        return 0;
                                                    }
                                                }
                                                else{
                                                    return 0;
                                                }

                                            });

                                            for (var i=0;i<responseJSON.data.length;i++){
                                                responseJSON.today.push(checkDate(responseJSON.data[i].date));
                                            }

                                            res.end(JSON.stringify(responseJSON));
                                        }
                                        else {
                                            res.end('Error');
                                        }
                                    });
                                }

                            }
                            else{
                                res.end('Range is missed');
                            }
                        }
                    }
                     
            });
         
        }
    }
    else{
        res.redirect('/');
    }
    
});
    
function getSelected_ids(ids,initial){
    
    var S_ID = [];
    var end  ;
    
    if(ids.length - initial <= 0){
        return 'finished';
    }
    else{
        if(ids.length - initial <= 20){
            end = ids.length;
        }
        else{
            end = initial + 20;
        }
    }
    
    for(var i = initial;i<end;i++){
        S_ID.push(ids[i]);
    }
    return S_ID;
    
}

function getJSON(ids){
    
    var PE_JSON = [];

    for (var i=0;i<ids.length;i++){

        var tag = ids[i].split('_')[0];
        var value = ids[i].split('_')[1];

        if(PE_JSON[tag]){
            PE_JSON[tag] += ','+value;
        }
        else{
            PE_JSON[tag] = value;
        }
    }
    
    return PE_JSON;
    
}

app.get('/delete/event/:pe_id',function(req,res,next){
   current_user = req.session;
    
    if(current_user.email){
        db_collection('db_1',{selector:{_id:current_user.ID}},'search',function(ERR,RESULT){
           if(!ERR){
             
        var packageID = req.params.pe_id.split('_')[0];
        var eventID = req.params.pe_id.split('_')[1];
        
        if(RESULT.docs[0].event_packages.split(',').includes(packageID)){
            
            db_collection('db_3',{ selector:{ _id:packageID } },'search',function(err,result){
               
                    if(!err){
                            var packageData = result.docs[0].data;
                            var newData = [];
                            var invitedFriends=[];
                        for (var i=0;i<packageData.length;i++){
                            if(packageData[i].id == eventID){
                                invitedFriends = getFriendsID(packageData[i].invited_friends);
                            }
                        }
                        

                            db_collection('db_1',{selector:{ _id:{$in:invitedFriends} }},'search',function(err,result){
                                if(!err){

                                    for(var i=0;i<result.docs.length;i++){

                                        result.docs[i].event_invitations = removeItem('string',result.docs[i].event_invitations,(packageID+'_'+eventID));

                                        if(result.docs[i].event_invitations.length == 0){
                                            result.docs[i].event_invitations = 'none';
                                        }

                                    }


                                    var db = db_connect('db_1');

                                    db.bulk({docs:result.docs},function(err){});

                                }

                            });


                            for(var i=0;i<packageData.length;i++){

                                if(packageData[i].id != eventID){
                                    newData.push(packageData[i]);
                                }

                            }
                        
                            result.docs[0].av_ids.push(eventID);

                            if(newData.length){
                                result.docs[0].data = newData;
                                db_collection('db_3',result.docs[0],'update',function(err,response){

                                    if(!err){

                                        res.end(JSON.stringify({status:'done'}));
                                    }
                                    else{
                                        res.end('Error');
                                    }

                                });
                            }
                            else{
                                // delete package
                                var eventList = removeItem('string',RESULT.docs[0].event_packages,packageID);

                                if(eventList.length == 0){
                                    eventList = 'none';
                                }


                                db_collection('db_1',{selector:{_id:current_user.ID}},'search',function(Err,Result){

                                    if(!Err){
                                        Result.docs[0].event_packages = eventList;

                                        db_collection('db_1',Result.docs[0],'update',function(ERr,REsult){
                                            db_collection('db_3',{selector:{_id:packageID}},'delete',function(ERR,RESult){
                                               if(!ERR)
                                                    res.end(JSON.stringify({status:'done'}));
                                                else
                                                    res.end('Error');
                                            });
                                        });
                                    }

                                });


                            }  
                       }
                    });
                }
           }
        });
    }
    else{
        res.redirect('/');
    }
    
});

function getFriendsID(friendsJSON){
        
        var IDS = [];

        for (var i=0;i<friendsJSON.length;i++){
            IDS.push(friendsJSON[i].friend_id);
        }
        return IDS;
    
}

app.get('/userSettings',function(req,res,next){
    current_user = req.session;
    
    if(current_user.email){
        var Settings = [];
        Settings.push(current_user.generalSettings);
        Settings.push(current_user.privacySettings);
        res.end(JSON.stringify(Settings));
    }
    else{
        res.redirect('/');
    }
    
});

// use this to change Settings
app.get('/change_settings/:what/:newData',function(req,res,next){
    current_user = req.session;
    
    if(current_user.email){
        if(req.params.what == 'color' && (req.params.newData == 'purple'||req.params.newData == 'blue') ){
            db_collection('db_1',{selector:{_id:current_user.ID}},'search',function(err,result){
                
                if(!err){
                    result.docs[0].general_settings.color = req.params.newData;
                    db_collection('db_1',result.docs[0],'update',function(error,response){
                        if(!err){
                            current_user.generalSettings.color = req.params.newData;
                            current_user.rev = response.rev;
                        }
                        else {
                            console.log(err);
                        }
                        res.end();
                    });
                }
                else {
                    res.end();
                }
                
            });
        }
        else if (req.params.what == 'background' && req.params.newData == 'none'){
            db_collection('db_1',{selector:{ _id:current_user.ID }},'search',function(err,result){
                
                if(!err){
                    current_user.generalSettings.background_img = 'none';
                    result.docs[0].general_settings.background_img = 'none';
                    db_collection('db_1',result.docs[0],'update',function(){
                        res.end();
                    });
                }
                else{
                    console.log(err);
                    res.end();
                }
            });
        }
        else if (req.params.what == 'defaultPage'){
            var all = ["Posts","Events","Games","Friends"];
            
            if(all.includes(req.params.newData)){
                db_collection('db_1',{selector:{ _id:current_user.ID }},'search',function(err,result){
                    if(!err){
                        current_user.generalSettings.default_page = req.params.newData.toString().toLowerCase();
                        result.docs[0].general_settings.default_page = req.params.newData.toString().toLowerCase();
                        db_collection('db_1',result.docs[0],'update',function(){
                            res.end();
                        });
                    }
                    else{
                        console.log(err);
                        res.end();
                    }
                });
            }
        }
        else if (req.params.what == 'whoCanSee'){
            if(req.params.newData == 'Friends' || req.params.newData == 'Everybody' || req.params.newData == 'Me'){
                db_collection('db_1',{selector:{_id:current_user.ID}},'search',function(err,result){
                    if(!err){
                        result.docs[0].privacy_settings.who_see_posts.who = req.params.newData;
                        
                        if((checkEmails(req.query.friends)&& req.params.newData == 'Friends')||req.params.newData == 'Everybody'||req.params.newData == 'Me'){
                            result.docs[0].privacy_settings.who_see_posts.friend_list = (req.params.newData == 'Friends' ? req.query.friends:[]); 
                            current_user.privacySettings = result.docs[0].privacy_settings;
                            db_collection('db_1',result.docs[0],'update',function(){
                                res.end(JSON.stringify({status:'ok'}));
                            });
                        }
                        else{
                            res.end(JSON.stringify({error:'error'}));
                        }
                    }
                });
            }
        }
        // change other settings here
        
    }
    else {
        res.redirect('/');
    }
    
});

https.createServer({ 
        key: fs.readFileSync("privkey1.pem"),
        cert: fs.readFileSync("fullchain1.pem"),
        ca: fs.readFileSync("chain1.pem")
}, app).listen(3000,'0.0.0.0',function(){
    console.log('Secure Server is running on port 3000');
});

function getAge(d,m,y){
    
    var day = new Date().getDate();
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();
    
    var x = year - y;
    var y = month - m;
    var z = day - d;
    
    if ((y == 0 && z == 0) || y > 0){
        return x ;
    }
    else {
        return x-1;
    }
    
}

function checkDate(date){
    
    var day = new Date().getDate();
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();
    
    var sentDate = date.split('/');
    
    if(year == sentDate[2] && month == sentDate[1] && day == sentDate[0]){
        return true;
    }
    else {
        return false;
    }
    
}

function checkEmails(emails){
    
    if(!emails){
        return false;
    }
    
    for(var i=0;i<emails.length;i++){
        if(!/^[A-Za-z]+[\w.]*@[A-Za-z]+(\.[A-Za-z]{3})$/i.test(emails[i])){
            return false;
        }
    }
    return true;
}

function removeItem(listType,data,item){
    
    var list = (listType == 'string'? data.split(','):data);
    var newData =[];
    
    for (var i=0;i<list.length;i++){
        
        if(list[i] != item){
            newData.push(list[i]);
        }
        
    }
    
    if(listType == 'array'){
        return newData;
    }
    else{
        var str = '';
        
        for (var i=0;i<newData.length;i++){
            if(str.length){
                str = newData[i];
            }
            else{
                str += ',' + newData[i];
            }
        }
        
        return str;
        
    }
    
}

// generate the whole page with it's content
function generateHtml(basic,content,data){
    
    var Html = '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><title>'+(data.name.split(' ')[0]+ ' '+data.name.split(' ')[1])+'</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta charset="UTF-8"/><link id="colorCSS" href="/css/myaccount'+(data.generalSettings.color=='blue'?'':'2')+'.css" type="text/css" rel="stylesheet"/><link href="/css/default.css" type="text/css" rel="stylesheet"/><script src="/js/module1.js"></script><script>var color= "'+data.generalSettings.color+'"; var chatSelect ="chatPtxt";</script><script src="/js/camera.js"></script><script src="/js/handle3.js"></script><script src="/js/request.js"></script><script src="/js/gameHandle.js"></script><script>if(\''+content+'\' == \'events\'){ boxes_actions(\'events\',\'click\'); }else if(\''+content+'\' == \'friends\'){ boxes_actions(\'friends\',\'click\'); }</script></head><body>';
    
    if (basic){
        
        var transform = data.pic.replace('w_145,h_145,c_fill','w_115,h_115,c_fill');
        var img = 'background: url(' + (transform!='none'? transform:'/images/default_pro.png') + ');';
        var background_img = (data.generalSettings.background_img != 'none' ? 'style="background:url('+data.generalSettings.background_img+');"':'');
        
        Html += '<section id="main" class="main" '+background_img+' >'+getContent(content,data)+'</section><section class="leftBox"></section><section class="header"><div class="welcomeTxt">Welcome, <label id="headerW" style="font-family:arial;font-size:18px;">'+data.name.split(' ')[0]+' '+data.name.split(' ')[1]+'</label></div><div class="logo"></div> <div class="logout_box"></div><div class="colorMain" onclick="changeColor();"><div class="colorHeader"></div></div><div class="logout" onmouseover="headerAction(\'logout\',\'over\');" onmouseout="headerAction(\'logout\',\'out\');" onclick="window.location = \'https://192.168.1.7:3000/logout\';" ></div></section><div id="profileOPTION" onclick="saveProfileEdit(true);" class="circle_1"> <div class="inner_circle" style="'+img+'"></div></div><section onclick="sideBox(\'HOME\',\'Box_1\');" id="HOME" class="Box_1"><p class="boxTxt" style="margin: 0px; padding: 0px; margin-top: 9px; margin-left: 27px;">HOME</p></section><section onclick="sideBox(\'SETTINGS\',\'Box_3\');" id="SETTINGS" class="Box_3"><p class="unboxTxt" style="margin: 0px; padding: 0px; margin-top: 9px; margin-left: 23px;">SETTINGS</p></section><p id="firstname" class="firstname">' +data.name.split(' ')[0]+ '<label class="secondname">'+data.name.split(' ')[1]+'</label></p><section id="side_box" class="side_box"><div class="friends_box"></div><div class="friends_ico" onclick="boxes_actions(\'friends\',\'click\');" onmouseover="boxes_actions(\'friends\',\'in\',\'42px\');" onmouseout="boxes_actions(\'friends\',\'out\');"></div><div class="posts_box"></div><div class="posts_ico" onmouseover="boxes_actions(\'posts\',\'in\',\'29px\');" onmouseout="boxes_actions(\'posts\',\'out\');" onclick="boxes_actions(\'posts\',\'click\');"></div><div class="events_box"></div><div class="events_ico" onclick="boxes_actions(\'events\',\'click\');" onmouseover="boxes_actions(\'events\',\'in\',\'33px\');" onmouseout="boxes_actions(\'events\',\'out\');"></div><div class="games_box"></div><div class="games_ico" onmouseover="boxes_actions(\'games\',\'in\',\'39px\');" onmouseout="boxes_actions(\'games\',\'out\');" onclick="boxes_actions(\'games\',\'click\');"></div></section><section class="chatBox"><div id="chatP" class="chat_TopBox" onclick="changeChat(\'Public\');" style="left:0px;background-color:white;"><label id="chatPtxt" style="font-family:arial;font-size:16px;font-weight:bold;width:175px;text-align:center;margin-top:9px;position:absolute;color:#'+(data.generalSettings.color == 'blue' ? '0f6f92':'7e516f')+';">Public</label></div><div id="chatF" class="chat_TopBox" style="right:0px;" onclick="changeChat(\'Friends\');"><label id="chatFtxt" style="font-family:arial;font-size:16px;width:175px;text-align:center;margin-top:9px;position:absolute;color:#717171;">Friends</label></div><div id="chatContent2" class="chatContent" style="display:none;"></div><div id="chatContent1" class="chatContent"><textarea id="chatMsg" class="chatMsgBox" placeholder="Type your message ..."></textarea><div class="chatSendBtn"><p style="text-align:center;cursor:default;">Send Message</p></div></div></section><section id = "camera" style="display:none;"><div class="cameraBG" onclick="stop();"></div><div id="CameraCanvas"><canvas id="cameraCanvas" class="cameraScreen"><video id="hiddenCamera" style="display: none;"></video></canvas></div><h2>Loading ...</h2><div class="cameraCircle" onclick="if(document.querySelector(\'h2\').style.display == \'none\'){capture(true);}" onmouseover="cameraBtn(\'on\');" onmouseout="cameraBtn(\'off\');"><div class="cameraIcon"></div></div><div class="cameraBtn_1" onclick="startAgain();"><label style="position: absolute; left: 27px; top: 3px;">Take another</label></div><div onclick="cameraSave();" class="cameraBtn_2"><label style="position: absolute; left: 27px; top: 3px;">Save</label></div><p class ="E_question">Would you like to try an effect ?</p><img id="e1" onclick="applyEffect(\'e1\');" class="effects" style="left: 1115px;top: 120px;" /><img id="e2" onclick="applyEffect(\'e2\');" class="effects" style="left: 1115px;top: 280px;" /><img id="e3" onclick="applyEffect(\'e3\');" class="effects" style="left: 1115px;top: 440px;" /><label class="loadingEffects" style="background-color: white;width: 135px;top: 125px;height: 135px;right: 111px;"></label><label class="loadingEffects" style="top: 180px;">Loading</label><label class="loadingEffects" style="background-color: white;width: 135px;top: 285px;height: 135px;right: 111px;"></label><label class="loadingEffects" style="top: 342px;">Loading</label><label class="loadingEffects" style="background-color: white;width: 135px;top: 445px;height: 135px;right: 111px;"></label><label class="loadingEffects" style="top: 504px;">Loading</label></section><div class="profileClick"> <p style="margin-left: 28px;margin-top: 25px;font-family: arialBold;cursor:default;color:#404040;">Change Profile Image</p><div style="width:186px;overflow:hidden;"><input onchange="changeProfileImg(event);" style="margin-left:10px;" id="newImg" type="file" accept="image/*"><label class="removePro" onclick="removeProfileImg();">Remove profile image</label></div><p style="margin-left: 8px;margin-top: 35px;font-family: arialbold;cursor:default;color:#404040;">Full name :</p><p style="margin-left: 12px;"><input id="newName" placeholder="type a new name ?" /> </p><p style="margin-left: 8px;margin-top:20px;font-family: arialbold;cursor:default;color:#404040;">Password :</p><p style="margin-left: 12px;"><input id="newPassword" placeholder="type a new password ?" type="password" /> </p><p style="margin-left: 8px;margin-top:20px;font-family: arialbold;cursor:default;color:#404040;">Type your old password :</p><p style="margin-left: 12px;"><input placeholder="type your password ..." type="password" id="oldPassword" /> </p> <div onclick="saveProfileEdit(false);" class="saveProfileBtn"><label style="margin-top: 3px;position:  absolute;font-family: arialNarrow;color: white;font-size: 16px;margin-left: 32px;">Save</label></div> <div onclick="cancelClick();" class="cancelProfileBtn"> <label style="margin-top: 3px;position: absolute;font-family: arialNarrow;color: white;font-size: 16px;margin-left: 32px;">Cancel</label> </div> <div id="editLoading" style="width:205px;height:402px;display:none;top:0px;left:0px;position:absolute;background:white;"><label style="font-family:arialBold; font-size:18px; top:100px;left:60px;position:absolute;">Loading ...</label><label style="font-family:arialNarrow; font-size:16px; top:120px;left:60px;position:absolute;">Please wait</label></div> </div>';
    }
    else {
        return getContent(content,data);
    }
    
    // for testing basic and content
    Html += '<script>console.log("'+basic+' '+content+'");</script>';
    
    Html += '</body></html>';
    
    return Html;
}

// pages content builder
function getContent(content,data){
    
    if(content == "posts"){
        
        var postNote = data.privacySettings.who_see_posts.who == "Everybody"? "This post is set to public": (data.privacySettings.who_see_posts.who == "Friends"? "Choosen friends in privacy settings":"Only you can see this post");
        
        return '<section style="position: absolute;left: 43px; top: 234px;"><section id="filter_show" class="option1" style="cursor: default;"><div style="text-decoration: underline;margin-top: 5px;margin-left: 18px;float: left;">My Posts</div></section><section id="filter_date" class="option1" style="left: 295px;cursor: default;"><div style="text-decoration: underline;margin-top: 5px;margin-left: 27px;float: left;">Sports</div></section><section id="filter_time" class="option1" style="left: 427px;cursor: default;"><div style="text-decoration: underline;margin-top: 5px;margin-left: 30px;float: left;">Food</div></section><section id="filter_time" class="option1" style="left: 558px;cursor: default;"><div style="text-decoration: underline;margin-top: 5px;margin-left: 30px;float: left;">Other</div></section><section id="filter_arrow1" class="arrow1"></section><section id="filter_arrow2" class="arrow2"></section><div class="postw">Posts :</div><section class="Line"></section></section><div class="post_boxContainer"><section class="post_box"><textarea id="txt" class="txtArea" placeholder="Write something..."></textarea><div class="vLine"></div><div class="post_btn"><div style="margin-top: 4px; color: white;">Post</div></div><div class="post_setting_btn"><div onclick="$(\'.postSettings_box\').css(\'display\',\'block\');" style="background:url(/images/postSetting.png); width: 20px; height: 14px; margin-left: 8px; margin-top: 9px;"></div></div><input id="tag" class="tagPerson" oninput="tag_request();" placeholder="Tag someone?"/><div id="taggedNames" class="taggedNames"></div><div class="post_uploads"><div id="photoUploader" class="photoBtn"><input style="opacity:0;position:absolute; top:-1px;" title="Photo" type="file" onchange="addImage(event);" accept="image/*"/><input style="opacity:0;position:absolute; bottom:0px;" title="Photo" type="file" onchange="addImage(event);" accept="image/*"/></div><div id="fileUploader" class="fileBtn"><input style="opacity:0;position:absolute; top:-1px;" title="File" type="file" onchange="addFile(event);" accept="*/*"/><input style="opacity:0;position:absolute; bottom:0px;" title="File" type="file" onchange="addFile(event);" accept="*/*"/></div><div class="cameraBtn" onclick="play(\'Loading ...\');" title="Camera"></div><div id="videoUploader" class="videoBtn"><input style="opacity:0;position:absolute; top:-1px;" title="Video" type="file" onchange="addVideo(event);" accept="video/mp4"/><input style="opacity:0;position:absolute; bottom:0px;" title="Video" type="file" onchange="addVideo(event);" accept="video/mp4"/></div><div id="record" class="microBtn" title="Microphone" onmousedown="addMic(event);"></div><div class="youtubeBtn" onclick="addYoutube(prompt(\'Put your Youtube URL here\'));" title="Youtube"></div></div><section class="postSettings_box"><div onclick="$(\'.postSettings_box\').css(\'display\',\'none\');" style="background:url(/images/postSetting.png); width: 20px; height: 14px; top:129px; position:absolute; right:114px;"></div><label class="postSettings_title">Settings</label><div onclick="$(\'.postSettings_box\').css(\'display\',\'none\');" class = "postSettings_close"></div><label class="postSettings_titles" style="top:20px;">Who can see this post ?</label> <label class="postSettings_titles" style="top:74px;">Block someone to see this post ?</label> <div class="postSettings_option" style="top:42px;" ><label id="who" style="margin-left:14px; position:absolute; top:3px;">'+data.privacySettings.who_see_posts.who+'</label><label class="change_btn" onclick="changeWhoSee();"><label style="position:absolute; top:3px; left:9px;">Change</label></label></div><input id="pSoption" class="postSettings_option" placeholder="none" style="top:96px; padding-left:14px; height:20px; width:145px;"/> <label id="note1" class="postSettings_notes" style="top:46px;">'+postNote+'</label> <label id="note2" class="postSettings_notes" style="top:99px;">no one is blocked to see this post</label> </section><div class="recordBar"><label class="recordTXT" style="font-size:50px;left:110px;top:-27px;">.</label><label class="recordTXT" style="font-size:15px;left:130px;">RECORDING</label></div></section><div id="inputlist" class="suggested_list" ></div></div><section id="attachments_box" class="attachments_box"></section>';
    }
    else if(content == 'games') {
        return '<section class="gamesBoard"><div class="game_logo"></div><label class="gameTitle1">GAME<label class="gameTitle2">List</label></label><div class="glogo_line"></div><div style="position: absolute; left:240px; top:0px; cursor: default;"><div class="games_icons" id="g1" onmouseover="GameHover(\'g1\',\'on\');" onmouseout="GameHover(\'g1\',\'off\');" onclick="GameHover(\'g1\',\'click\');" style="left: 0px;"><img src="/images/game1.png" style="position: absolute; margin-left: -9px;margin-top: -9px;width: 80px;height: 80px;"/></div><div class="games_icons" id="g2" onmouseover="GameHover(\'g2\',\'on\');" onmouseout="GameHover(\'g2\',\'off\');" onclick="GameHover(\'g2\',\'click\');" style="left: 97px;"><img src="/images/game2.png" style="position: absolute; margin-left: -7px;margin-top: -5px;width: 77px;height: 72px;"></div><div class="games_icons" id="g3" onmouseover="GameHover(\'g3\',\'on\');" onmouseout="GameHover(\'g3\',\'off\');" onclick="GameHover(\'g3\',\'click\');" style="left: 194px;"><img src="/images/game3.png" style="position: absolute; margin-left: -21px;margin-top: -8px;width: 135.8px;height: 80px;"></div><div class="games_icons" id="g4" onmouseover="GameHover(\'g4\',\'on\');" onmouseout="GameHover(\'g4\',\'off\');" onclick="GameHover(\'g4\',\'click\');" style="left: 289px;"><img src="/images/game4.png" style="position: absolute; margin-left: -9px;margin-top: -2px;width: 80px;height: 62px;"></div><div id="g1TXT" style="position:absolute; left: -8px; margin-top:73px; font-size: 12px; font-family: arial; width:82px;">Winged Bullet</div><div id="g2TXT" style="position:absolute; left: 91px; margin-top:73px; font-size: 12px; font-family: arial; width:77px;">Stellar Squad</div><div id="g3TXT" style="position:absolute; left: 196px; margin-top:73px; font-size: 12px; font-family: arial; width:77px;">Heat Rush</div><div id="g4TXT" style="position:absolute; left: 280px; margin-top:73px; font-size: 12px; font-family: arial; width:82px;">Atomic Puzzle</div></div><div id="gameScreen" class="game_screen"><p style="font-size: 13.75px; font-family: arial; text-align: center; margin-top: 190px; color: #999999;">Which <label style="font-size: 17.39px; font-family: arialBold; color: #999999;">GAME</label> would you like to play?</p></div></section>';
    }
    else if (content == 'events'){
        return '<section id="EV_Box" class="eventSection"><div class="eventsTitleICO"></div><label id="e_title1" class="eventsTitleTXT">Upcoming <label id="e_title2" style="color: #e76c6c;font-size: 19px;"><b>Events</b></label></label><section id="eventBox" style="position: absolute;left: 0px; top: 178px; width: 658px; height: 237px;overflow-y: auto;over; overflow-x: hidden;"><p style="text-align: center;font-size: 18px; font-family: arial; font-weight: bold;cursor: default;">Loading ...</p></section></section>';
    }
    else if (content == 'friends'){
        return '<section class="friendsSection"><div class="friendsSTitle"></div><label class="friendsSText">Friends</label><input oninput="friends_request();" placeholder="Search for a friend ..." id="friendSearch" class="friendsSSearch" /><div id="friendList" class="friendsSList" ><p style="position:absolute; top:105px; left:288px; color:rgb(154, 172, 179); font-size: 18px; font-family: arial; font-weight: bold;cursor: default;">Loading ...</p></div></section>';
    }
    
}

// generate confirmation code 
function generate_Code(){
    
    var mix = ["abcdefghijklmnopqrstuvwxyz","0123456789"];
    var code_lenght = Math.round(Math.random()*(9-4))+4;
    
    var code = '';
    
    for (var i=0;i<code_lenght; i++){
        
        var select_rand = Math.round(Math.random()*(1));
        
        var rand = Math.round(Math.random()*(mix[select_rand].length-1));
        
        code += mix[select_rand].charAt(rand);
        
    }
    
    return code;
    
}

app.post('/deleteMyAccount',function(req,res,next){
    current_user = req.session;
    
    if(current_user.ID){
        if(current_user.password == req.body.pass){
            db_collection('db_1',{selector:{_id:current_user.ID}},'delete',function(result){
                req.session.destroy(function(err){
                    res.end(JSON.stringify({status:'ok'})); 
                });
            });
        }
        else{
            res.end(JSON.stringify({error:'wrong password'}));
        }
    }
    else{
        res.redirect('/');
    }
    
});

// database connection code
function db_connect(db_name){
    
    var Cloudant = require('@cloudant/cloudant');

    var username = "20b56f79-833d-4936-a237-e6cc6dc58ae6-bluemix";
    var password = "e1dbfac9860403127d2859912a77bbcb0ccb6f78d279f119e9f854f1441aff80";
    var cloudant = Cloudant({account:username, password:password});
    
    return cloudant.db.use(db_name);
    
}

//insert, update, search in database
function db_collection(db_name,data,operation,func){ // insert in database
    var db = db_connect(db_name);
        
    if(operation == "update"||operation == "insert")
        db.insert(data,func);
    else if (operation == "search")
        db.find(data,func);
    else if (operation == "delete"){
        var funct = func;
        db_collection(db_name,data,'search',function(err,result){
           if(!err){
               db.destroy(result.docs[0]._id,result.docs[0]._rev,funct);
           } 
        });
    }
}