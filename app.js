const express = require('express');
const reqest = require('request');
const https = require('https');
const bodyParser = require('body-parser');
const { request } = require('http');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/',function(req,res){
    res.sendFile(__dirname+"/sginup.html")
});

app.post('/',function(req,res){
    var fn= req.body.fn;
    var ln = req.body.ln;
    var em = req.body.em;

    const url = "https://us21.api.mailchimp.com/3.0/lists/9ec105cebf";
    const option = {
        method: "POST",
        auth: "Samser:25fa5016351f53a724ed239aec53a211-us21"//us21
    }

    console.log("First Name = "+fn);
    console.log(`Lastname = `+ln);
    console.log("Email = "+em);

    const data = {
        members: [
            {
                email_address:em,
                status: "subscribed",
                merge_fields: {
                    FNAME: fn,
                    LNAME: ln
                }
            }
        ]
    }
    const jsonData = JSON.stringify (data);

    const request = https.request(url,option,function(respo){
        if(respo.statusCode == 200) res.sendFile(__dirname+"/success.html");
        else res.sendFile(__dirname+"/failer.html");
        respo.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    //request.write(jsonData);
    request.end();


});

app.post('/failer',function(req,res){
    res.redirect('/')
})

app.listen(3000,function(req,res){
    console.log("Server oppen at port 3000")
});




//apikey = 25fa5016351f53a724ed239aec53a211-us21
//Unique id = 9ec105cebf
