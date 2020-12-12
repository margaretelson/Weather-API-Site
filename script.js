var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


$(document).ready(function(){
    var cityInput = $("#cityInput")
    var city = cityInput.val()
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=3a2a60646691f5ab1ab00fabbd730383";
    
    function weather(){
        console.log("am i")
        $.ajax({
            url: url,
            method: "GET"
        })
        .then(function(response){
            var cityName = response.name;
            $('#cityName').html(cityName)
            console.log(response)
        });
    }
    $("#search").on("click", weather);
});