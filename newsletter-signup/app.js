//initial packages
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')

//use the packages
const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

//link html to the firstpage
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

//result
app.post("/",function(req,res){
    const fName = req.body.firstName
    const lName = req.body.lastName
    const email = req.body.email

    var data = {
            "Name": fName+" "+lName,
            "Email": email,
          }
    var jsonData = JSON.stringify(data)
    
    const url = "https://api.moosend.com/v3/subscribers/333591b3-d643-4c6f-bda3-b7826f9989a8/subscribe.json?apikey=d86b2439-7b7b-43fd-8466-abddafffce82"    
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
    }

    const request = https.request(url, options, function(response) {
        response.on("data", function(data){
            var infoData = JSON.parse(data)
            var code = infoData.Code
            var error = infoData.Error
            if(code!=0)
            res.sendFile(__dirname+"/failure.html")
            else
                res.sendFile(__dirname+"/success.html")
        })
    })


    request.write(jsonData);
    request.end();
})

app.post("/success", function(req,res){
    res.redirect("/")
})

app.post("/failure", function(req,res){
    res.redirect("/")
})
    

//initial port
app.listen(process.env.PORT || 3000, function(){
    console.log('server started and running!');
});

// d86b2439-7b7b-43fd-8466-abddafffce82
// Email list ID: 
// 333591b3-d643-4c6f-bda3-b7826f9989a8