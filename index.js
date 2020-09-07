var city =$('.search-field').val().trim();

var APIKey = '3d5be989dd5c8c4b60927cdbe04246ad'

$('.searchBtn').on('click', (event) => {
    var currentDate = moment().format(M-DD-YYYY);
    city = $('.search-field').val();

    var newCities = JSON.parse(localStorage.getItem('savedCities'));
    if (newCities != null) {
        for (var i = 0; i < newCities.length; i++) {
            if (newCities.indexOf(city) === -1){
                newCities.push(city);
            }
        }
    }
    else {
        newCities = [city];
    }
    localStorage.setItem('savedCities', JSON.stringify(newCities));

    showWeather(city);
    rendersavedCitites(newCities);
})

showWeather = (city) => {
    var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
    + city + '&units=imperial' + '&appid=' + APIKey;

    $ajax({
        method: 'GET'
    })
    .then(function(response){
        var icon ='https://api.openweathermap.org/img/w/' + response.weather[0].icon + '.png';
        $('.city-name').html('<h1>' + response.name + '<img src=' + icon + '>' + '</h1>');
        $('.currentDate').text(moment().format('M-DD-YYYY'));
        $('#temp').text('Tempature:' + response.main.temp + '°F');
        $('#humidity').text('Humidity:' + response.main.humidity + '%');
        $('#wind').text('wind Speed:' + response.wind.speed + 'MPH');

        var uvUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + response.coord.lat + '&lon=' + response.coord.lat;
        $.ajax({
            url: uvUrl,
            method: 'GET'    
        })
        .then(function (uvResponse) {
            var uvIndex = uvResponse.value;
            var uvColor = '';
            if (uvIndex < 3) {
                uvColor = 'green';
            } else if (uvIndex < 6){
              uvColor = 'yellow';
            } else if (uvIndex < 8){
                uvColor = 'orange';
            } else if (uvIndex < 11){
                uvColor = 'red';
            } else {
                uvColor = 'violet'
            }
            $('#uv-index').text('Uv-Index': + uvIndex);
            $('#uv-index').attr('style', 'background-color:' + uvColor); 
            
        
    });
})
    .then(function(response) {
        var icon1 = 'http://openweathermap.org/img/w/' + response.list[1].weather[0].icon + '.png';
        var icon2 = 'http://openweathermap.org/img/w/' + response.list[9].weather[0].icon + '.png';
        var icon3 = 'http://openweathermap.org/img/w/' + response.list[17].weather[0].icon + '.png';
        var icon4 = 'http://openweathermap.org/img/w/' + response.list[25].weather[0].icon + '.png';
        var icon5 = 'http://openweathermap.org/img/w/' + response.list[33].weather[0].icon + '.png';

        var date1 = response.list[1].dt_txt;
        var date2 = response.list[9].dt_txt;
        var date3 = response.list[17].dt_txt;
        var date4 = response.list[25].dt_txt;
        var date5 = response.list[33].dt_txt;

        $('#first #date1').html('<h5>' + moment(date1).format('M-DD-YYYY') + '<h5>');
        $('#first #icon1').html('<img src=' + icon1 + '>');
        $('#first #temp1').text('Temp: ' + ((response.list[1].main.temp - 273.15) * 1.8 + 32).toFixed(2) + '°F');
        $('#first #humidity1').text('Humidity: ' + response.list[1].main.humidity);

    }
