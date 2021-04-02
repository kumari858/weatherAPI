const express = require("express");
const https = require("https");
const  bodyParser= require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/" , function(req, res){
    res.sendFile(__dirname + "/index.html");

});
app.post("/" , function(req, res){
  // console.log( req.body.cityName);
    //console.log("Post request recieved.");
    

const query = req.body.cityName;
const apikey = "58f71fbc3d6b002a9b83c1a3ae8a09bb";
const unit = "metric"
const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+unit;
https.get(url, function(response){
    console.log(response.statusCode);
response.on("data", function(data){
    const weatherdata = JSON.parse(data);
   // console.log(weatherdata);
//    const object ={
//        name : "pinki",
//        food : "rice"
//    }
//    console.log(JSON.stringify(object));
const icon =weatherdata.weather[0].icon
const imageurl="https://openweathermap.org/img/wn/"+ icon +"@2x.png";  
 const temp = weatherdata.main.temp;
 const weatherDescription = weatherdata.weather[0].description;
 res.write("<p> The weather is currently "+ weatherDescription + " </p>");
//console.log(temp);
res.write("<h1>the temperature in "+ query +" is "+ temp + " degrees celcius. </h1>");
res.write("<img src=" + imageurl +">")
res.send();
})
})
// res.send("server is up and running."); can have only one send..
});


/*
*/
app.listen(3002,function(){
    console.log("server working..");
});