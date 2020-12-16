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
var currentClass 

function weather(){
    let cityInput = $("#city-input").val();
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" +cityInput+ "&appid=" +APIKey;
    console.log(cityInput)
    $.ajax({
        url: url,
        method: "GET"
    })
    .then(function(response){
        $(".buttonsList").append("<button>"+ response.name+ "</button>");

        console.log(response)

        var cityContainer = $(".col-sm-12");

     

        let weatherPic = response.weather[0].icon;
        // var iconURL = `https://openweathermap.org/img/w/${weatherPic}.png`;
        var iconURL = "https://openweathermap.org/img/w/"+weatherPic+".png";
        var iconEl = $("<img>");
        iconEl.attr("src", iconURL);
        // cityContainer.append(iconEl);

        var dateEl = $("#currentDay2")
        $("#currentDay2").text(
            luxon.DateTime.local().toLocaleString({
            weekday: '2-digit /', 
            month: '2-digit /', 
            day: '2-digit', 
        }))

        var cityNameUrl = response.name;
        var cityName = $("#city-name").text(cityNameUrl);
        cityContainer.append(cityName, iconEl);

       

        // const currentDate = new Date(response.dt);
        // console.log(currentDate);
        // var day = currentDate.getDate();
        // var month = currentDate.getMonth() + 1;
        // var year = currentDate.getFullYear();
        // cityName.innerHTML = response.name + " (" + month + "/" + day + "/" + year + ") ";

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var temperatureF = ($("#temp").text("Temperature (F): " + tempF.toFixed() + " degrees"));
        cityContainer.append(temperatureF);

        var humidityUrl = response.main.humidity;
        var humidity = $("#humidity").text("Humidity: " + humidityUrl +"%")
        cityContainer.append(humidity);

        var windUrl = response.wind.speed;
        var wind = $("#wind").text("Wind Speed: " + windUrl +" MPH")
        cityContainer.append(wind);

        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let UVElement = document.getElementById("UVindex");
        let UVUrl = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+APIKey;
            $.ajax({
                url: UVUrl,
                method: "GET"
            })
            .then(function(response){
                console.log(response)
                var UVindex = response.value;
                $("#UVindex").text("UV Index: " + response.value);

                console.log({UVindex});
                    if (UVindex <=2){
                        if(currentClass)UVindex.removeClass(currentClass)
                        UVElement.classList.add("low");
                        // currentClass = "low"
                    }else if ((UVindex === 3 || UVindex <=5)){
                        if(currentClass)UVindex.removeClass(currentClass)
                        UVElement.classList.add("moderate")
                        // currentClass = "moderate"
                    }else if ((UVindex === 6 || UVindex <=7)){
                        if(currentClass)UVindex.removeClass(currentClass)
                        UVElement.classList.add("high")
                        // currentClass = "high"
                    }else if((UVindex === 8 || UVindex <=10)){
                        if(currentClass)UVindex.removeClass(currentClass)
                        UVElement.classList.add("vhigh")
                        // currentClass = "vhigh"
                    }else if ((UVindex === 11)){
                        if(currentClass)UVindex.removeClass(currentClass)
                        UVElement.classList.add("extreme")
                        // currentClass = "extreme"
                    }
                });


    });

}    $("#search").on("click", weather);



//Forecast
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

