const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const https = require('https');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));




app.get('/', function(req, res){
    
    res.sendFile(__dirname + '/index.html');
});


app.post('/', function(req, res) {

    const apiKey = "991bfed43704062ad41ec93b56669a71";
    const city = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city+"&appid="+apiKey+"&units="+unit;

    https.get(url, function(response) {
        console.log(response.statusCode)

        //JSON format 

        response.on("data", function(data) {
            //converts to JSON format

            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const windSpeed = weatherData.wind.speed;

            const toFah = (temp * 9/5) + 32;

            res.write("<p></p>");
            res.write("<h1>Weather for " + city + "</h1>");
            res.write("<h2>Temperature: " + toFah.toFixed(0) + " F</h2>");
            res.write("<h2>Condition: " + weatherDescription + "</h2>");
            res.write("<h2>Wind Speed: " + windSpeed + "</h2>");

            res.send();
            
        })
    })
  

});


app.listen(3000, function() {
    console.log("Listening to port 3000...");
})