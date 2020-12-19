var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
script.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(script);

// function loadHistory () {
//     var lastSearched = localStorage.getItem("lastSearched")
//     if (lastSearched !== null){
//         $("#cityInput").val(lastSearched);
//         renderBtn();
//     }
// }
// loadHistory();

$("#currentDay").text(
  luxon.DateTime.local().toLocaleString({
    weekday: "long",
    month: "long",
    day: "2-digit",
  })
);

const APIKey = "3a2a60646691f5ab1ab00fabbd730383";

function remove() {
  $("#iconPic").empty();
}



// function renderBtn() {
  function weather() {
    let cityInput = $("#city-input").val();
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${APIKey}`;
    console.log(cityInput);
    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      

      console.log(response);

      var cityContainer = $(".col-sm-12");

      var cityNameUrl = response.name;
      var cityName = $("#city-name").text(cityNameUrl);
      cityContainer.append(cityName);

      let weatherPic = response.weather[0].icon;
      let iconEl = [];
      var iconURL = "https://openweathermap.org/img/w/" + weatherPic + ".png";
      iconEl = $("#iconPic");
      iconEl.attr("src", iconURL);
      cityContainer.append(iconEl);

      //How the heck do you put in the date??

      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      var temperatureF = $("#temp").text(
        "Temperature (F): " + tempF.toFixed(1) + " degrees"
      );
      cityContainer.append(temperatureF);

      var humidityUrl = response.main.humidity;
      var humidity = $("#humidity").text("Humidity: " + humidityUrl + "%");
      cityContainer.append(humidity);

      var windUrl = response.wind.speed;
      var wind = $("#wind").text("Wind Speed: " + windUrl + " MPH");
      cityContainer.append(wind);

      let lat = response.coord.lat;
      let lon = response.coord.lon;
      let UVElement = document.getElementById("UVindex");
      let UVUrl =
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        APIKey;
      $.ajax({
        url: UVUrl,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        var UVindex = response.value;
        $("#UVindex")
          .text("UV Index: " + response.value)
          .removeClass();
        console.log({ UVindex });
        if (UVindex <= 2) {
          UVElement.classList.add("low");
        } else if (UVindex >= 3 && UVindex <= 5) {
          UVElement.classList.add("moderate");
        } else if (UVindex >= 6 && UVindex <= 7) {
          UVElement.classList.add("high");
        } else if (UVindex >= 8 && UVindex <= 10) {
          UVElement.classList.add("vhigh");
        } else {
          UVElement.classList.add("extreme");
        }
      });

      var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=3a2a60646691f5ab1ab00fabbd730383`;

      $.ajax({
        url: forecastURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        let forecastC = [];
        console.log(response.list)

        for (var i = 0; i <= response.list.length; i += 8) {
          console.log(forecastC);
          forecastC.push(i);
        }
        console.log(forecastC)
        console.log(forecastC.length)
        for (var i = 0; i < forecastC.length; i+=1) {
          console.log(i);
        

          $("#temperature-card" + (i)).text("Temperature: " + ((response.list[forecastC[i]].main.temp - 273.15) * 1.8 +32).toFixed(1) + " F");
          $("#wind-card" + (i)).text("Wind Speed: " + response.list[forecastC[i]].wind.speed + " MPH");
          $("#humidity-card" + (i)).text("Humidity: " + response.list[forecastC[i]].main.humidity + " %");
          var icon = response.list[forecastC[i]].weather[i].icon;
          var iconURL = "https://openweathermap.org/img/w/" + icon + ".png";
          $("#icon-card" + (i)).attr("src", iconURL);

        }
        remove();
      });
    });
  }$("#search").on("click", weather);


//   var initialBtn = $("#search")
//   initialBtn.on("click", function (event){
//       localStorage.setItem("")
//   })
//   $(".buttonsList").append("<button>" + response.name + "</button>");
//   renderBtn;

//   var searchBtn = $("button");
//   searchBtn.on("click", function (e){
//       e.preventDefault();
//       $("#cityInput").val($(this).text());
//       renderBtn();
//   })
// }

