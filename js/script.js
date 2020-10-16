API_KEY = "fd0c95606456d10d28effd8cb2c856dd";
let weatherData;
currentCityId = 571476;
currentCityName = "Брянск"
function getCache(key) {
    return localStorage.getItem(key);
}
window.onload = function()
{    
     townId = document.getElementById("Moscow").getAttribute("data-cityId");
    LoadData(townId);
     townId = document.getElementById("Kiev").getAttribute("data-cityId");
    LoadData(townId);
     townId = document.getElementById("Minsk").getAttribute("data-cityId");
    LoadData(townId);
     townId = document.getElementById("Starodub").getAttribute("data-cityId");
    LoadData(townId);    
    townId = document.getElementById("Bryansk").getAttribute("data-cityId");
    GetWeatherData(townId);
}
function LoadData(cityId)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=" + API_KEY + "&units=metric");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
        if (this.status != 200) {
            alert('Ошибка: ' + (this.status ? this.statusText : 'Запрос не удался.'))
        }
        else {
            weatherData = this.responseText;        
        }
    }
}
function fillData() {    
    weatherDataObject = JSON.parse(weatherData);        
    document.getElementById("pressure").innerText = "Давление: " + parseInt(weatherDataObject["main"]["pressure"])*0.75 + " мм.рт.ст.";
    document.getElementById("degrees").innerHTML = parseInt(weatherDataObject["main"]["temp"]) + " &deg;C";
    document.getElementById("windSpeed").innerHTML = "Скорость ветра: " + parseInt(weatherDataObject["wind"]["speed"]) + " м/с";
    document.getElementById("humidity").innerHTML = "Влажность: " + weatherDataObject["main"]["humidity"] + "%";    
    document.getElementById("weatherImage").setAttribute("src", "http://openweathermap.org/img/wn/" + weatherDataObject.weather[0].icon + "@2x.png")
    document.getElementById("cityName").innerHTML = currentCityName;
}
function getData(object) {    
    cityId = parseInt(object.getAttribute("data-cityId"));
    currentCityName = object.innerText;
    currentCityId = cityId;
    weatherData = getCache(cityId);
    if (weatherData == "null" || weatherData == null) {
        GetWeatherData(cityId);        
    }
    else {
        fillData();
    }
}

function GetWeatherData(cityId) {
    var xhr = new XMLHttpRequest();    
    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=" + API_KEY + "&units=metric");
    xhr.send();
    xhr.onreadystatechange = function () {
    if (this.readyState != 4) return;
        if (this.status != 200) {
            alert('Ошибка: ' + (this.status ? this.statusText : 'Запрос не удался.'))
        }
        else {
            weatherData = this.responseText;
            fillData();
        }
    }
}
function update() {
    GetWeatherData(currentCityId);
}
