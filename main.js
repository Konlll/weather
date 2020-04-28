const api = {
    key: "40bcb5e1db769ff0c1c2cc9b1ee256c1",
    base: "https://api.openweathermap.org/data/2.5/"
}  

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        searchbox.value = "";
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&lang=hu&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
}

function displayResults(weather){

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].description
    
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)} °C`;
}

function dateBuilder(d){
    let months = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"];
    let days = ["hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat", "vasárnap"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${year}. ${month} ${date}. ${day}`
}