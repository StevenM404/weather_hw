var APIKey = "da0e664c32e860b800b65c5a89f191d3";

$("#searchButton").on("click", function() {
    var city = $("#searchCity").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + city + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        var currentDate = new Date(response.dt*1000)
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        var weatherPic = response.weather[0].icon;
        $("#icon").attr("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png")
        $("#temp").text("Temperature: " + response.main.temp);
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind: " + response.wind.speed + "mph");
        $("#name").text(response.name + " (" + month + "/" + day + "/" + year + ") ");

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: UVqueryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $("#uv").text("UV Index: " + response.value);
        })
    })
    
})