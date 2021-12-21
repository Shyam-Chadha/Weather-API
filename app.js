const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function (req,res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function (req,res) {
    
    const key = "2a306cfc64144df9960175855212309";
    const location = req.body.cityname;
    const url ="https://api.weatherapi.com/v1/current.json?key="+ key + "&q="+ location + "&aqi=no";
    https.get(url,function (response) {
        console.log(response.statusCode);

    response.on("data", function (data) {
        const weatherdata = JSON.parse(data);
        const temp = weatherdata.current.temp_c;
        const location = weatherdata.location.name;
        console.log(temp);
        console.log(location);
        res.write("<p>The location is: "+ location +"<p>");
        res.write("<h1>The temperature in " + location + " is " + temp +" degree celcius</h1>");
        res.send();
    })
})
})


app.listen("3000", function () {
    console.log("Server is running");
})