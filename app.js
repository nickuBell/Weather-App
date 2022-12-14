const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.render("index");
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "13e77ad48ee3eda22fefbfa7ec9fa8a8";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {

    response.on("data", function(data) {

      const weatherData = JSON.parse(data);

      if (weatherData.cod === 200) {
        // const temp = weatherData.main.temp;
        // const weatherDescription = weatherData.weather[0].description;
        // const icon = weatherData.weather[0].icon;
        // const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.render("success", {
          weatherData: weatherData
        });
        // res.write("<p>The weather is currently " + weatherDescription + "<p>");
        // res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
        // res.write("<img src=" + imageURL + ">");
      } else {
        res.render("failure");
      }
    })
  })
})

app.post("/failiure", function(req, res) {
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
})
