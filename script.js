var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

$("#currentDay").text(
    luxon.DateTime.local().toLocaleString({
    weekday: 'long', 
    month: 'long', 
    day: '2-digit', 
}))

const APIKey = "3a2a60646691f5ab1ab00fabbd730383";

function weather(){
    let cityInput = $("#city-input").val();
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" +cityInput+ "&appid=" +APIKey;
    console.log(cityInput)
    $.ajax({
        url: url,
        method: "GET"
    })
    .then(function(response){
        console.log(response)

        var cityContainer = $(".col-sm-12");

        var cityNameUrl = response.name;
        var cityName = $("#city-name").text(cityNameUrl);
        cityContainer.append(cityName);

        var temperatureUrl = response.main.temp;
        var temperature = ($("#temp").text(temperatureUrl));
        cityContainer.append(temperature);

        var humidityUrl = response.main.humidity;
        var humidity = $("#humidity").text(humidityUrl)
        cityContainer.append(humidity);

        // var UVindexUrl = 
        // var UVindex = $("UVindex").text(UVindexUrl)
        // cityContainer.append(UVindex);

    });

    

  


}    $("#search").on("click", weather);

function forecast(){
    let cityInput = $("#city-input").val();
    var url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" +cityInput+ "&appid=" +APIKey;
    $.ajax({
        url: url2,
        method: "GET"
    })
    .then(function(response){
        console.log(response)
    
    });
}

    // var fiveDayArr = []
    // var nextDay = 0;
    // $.each(fiveDayArr, function(i, fiveDays){

    // }

