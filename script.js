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
        $(".buttonsList").append("<button>"+ response.name+ "</button>");
        console.log(response)

        var cityContainer = $(".col-sm-12");

        var cityNameUrl = response.name;
        var cityName = $("#city-name").text(cityNameUrl);
        cityContainer.append(cityName);


        let weatherPic = response.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/w/"+weatherPic+".png";
        var iconEl = $("<img>");
        iconEl.attr("src", iconURL);
        cityContainer.append(iconEl);
        //Having trouble getting icon to go away after searching for a new city, another icon will just pop up


        //How the heck do you put in the date??
        


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
                $("#UVindex").text("UV Index: " + response.value).removeClass();
                console.log({UVindex});
                    if (UVindex <=2){
                        UVElement.classList.add("low");
                    }else if ((UVindex >= 3 && UVindex <=5)){
                        UVElement.classList.add("moderate")
                    }else if ((UVindex >= 6 && UVindex <=7)){
                        UVElement.classList.add("high")
                    }else if((UVindex >= 8 && UVindex <=10)){
                        UVElement.classList.add("vhigh")
                    }else {
                        UVElement.classList.add("extreme")
                    }
                });

            // var cityid = response.id;
            // var forecastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
            //     $.ajax({
            //             url:forecastURL,
            //             method:"GET"
            //     }).then(function(response){
            //             // console.log(response);
            //             // console.log(response.list);
            
            //     let forecastC = []
            //     var forecastContainer = $(".weather-cards")
            //     for (var i = 0; i <=response.list.length; i += 8){
            //         forecastC.push(i);
            //         }

            //         console.log(forecastC);
                    
            //         for (var i = 0; i < forecastC.length; i++){
            //             console.log(i)

            //             //DAY 1
            //             var tempF1 = $("#temperature-card1"+i).text("Temperature(F): " + response.list[forecast[i]].main.temp-273.15) * 1.80 +32 + "degrees";
            //             var wind1 = $("#wind-card1"+i).text("Wind Speed: "+ response.list[forecast[i].wind.speed] + "MPH");
            //             var humidity1 = $("#humidity-card1"+i).text("Humidity: "+ response.list[forecast[i].main.humidity] + "%");
            //             var icon1 = $("#icon-card1"+i).attr(response.weather[0].icon);

            //             forecastContainer.append(wind1);
            //             forecastContainer.append(humidity1);
            //             forecastContainer.append(icon1);
            //             forecastContainer.append(tempF1)

            //             //DAY #2
            //             var tempF2 = $("#temperature-card1"+i).text("Temperature(F): " + response.list[forecast[i]].main.temp-273.15) * 1.80 +32 + "degrees";
            //             var wind2 = $("#wind-card1"+i).text("Wind Speed: "+ response.list[forecast[i].wind.speed] + "MPH");
            //             var humidity2 = $("#humidity-card1"+i).text("Humidity: "+ response.list[forecast[i].main.humidity] + "%");
            //             var icon2 = $("#icon-card1"+i).attr(response.weather[0].icon);

            //             forecastContainer.append(wind2);
            //             forecastContainer.append(humidity2);
            //             forecastContainer.append(icon2);
            //             forecastContainer.append(tempF2)

            //         }
            //         })


                })  

}  $("#search").on("click", weather);

// weather();

