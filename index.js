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
        
    })
}