let today = new Date();
let ul = document.querySelector("#date");

let days = ["Sunday", "Monday", "Tuesday", "Wedsday", "Thurday", "Friday", "Saturday"];
let day = days[today.getDay()];
let hours = today.getHours();
let minutes = today.getMinutes();
ul.innerHTML = `${day},  ${hours}:${minutes}`;


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday","Wensday","Thursday","Friday","Saturday"]
  return days[day];
  
}
  
  
getCurrentPosition();

/*findData('Nicosia');*/

function search(event) {
event.preventDefault();
  
  
let searchInput = document.querySelector("#search-form-input");
let h1 = document.querySelector("#city");
h1.innerHTML = `${searchInput.value} <img src="img/Location2.png" style="width: 5%" id="location">`;
 
  findData(searchInput.value);


}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search)
  


function findData(myCity) { 
let city = myCity;
let apiKey = "33a44c83fe16603731dff44e3a24880a";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(`${url}`).then(displayWeather);
}


//added loop forecast
function displayForecast(response) {
 let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row row-cols-1 row-cols-md-6 g-3">`;
  let days = ["Thu", "Fri", "Wed", "Sun", "Sat", "Mon"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML +
        ` 
    <div class="card h-55">
        <div class="card-img-overlay">

        </div>
        <div class="card-body">
          <div class="clearfix weather-temperature">
            <p class="card-day">${formatDay(forecastDay.dt)}</p>
            <img 
            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" " class="float-left" alt=" ">
            <span class="card-title" id="today-temperature">${Math.round(forecastDay.temp.day)}°C</span>

          </div>

          <p id="description">${forecastDay.weather[0].description}</p>
          <p class="card-text">Wind: ${Math.round(forecastDay.wind_speed)} km/h</p>
          <p class="card-text">Humadity: ${forecastDay.humidity}%</p>
          
        </div>
    </div>
    `;
    }  
  })
  
 
  forecastHTML= forecastHTML+ `</div>`
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "33a44c83fe16603731dff44e3a24880a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  
 
  console.log(response.data);
  

  let currentCity = document.querySelector("#city");
  let todayTemp = document.querySelector("#today-temperature");
  let todayDescription = document.querySelector("#today-description");
  let todayWind = document.querySelector("#wind");
  let todayPressure = document.querySelector("#presipation");
  let todayHumidity = document.querySelector("#today-humidity");
  let iconElement = document.querySelector("#icon");
        let temperature = Math.round(response.data.main.temp);
        let description = response.data.weather[0].description;
        let wind = Math.round(response.data.wind.speed);
        let pressure = Math.round(response.data.main.pressure);
        let humidity = Math.round(response.data.main.humidity);
        let city = response.data.name;
  
  // take the name of the city from API
  console.log(city);

  currentCity.innerHTML =`${city}`
  todayTemp.innerHTML = `${temperature}°C`;
  todayDescription.innerHTML = `${description}`;
  todayWind.innerHTML = `Wind ${wind} km/h`;
  todayPressure.innerHTML = `Pressure ${pressure} mB`;
  todayHumidity.innerHTML = `Humidity ${humidity}%`;
  iconElement.setAttribute(
    "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );     
  

  getForecast(response.data.coord);
  
      }


//define the coords
function getCurrentPosition() {
    let geoPosition = navigator.geolocation.getCurrentPosition(success);
//console.log(geoPosition)
}


// with coords all Ok, reload the page
function success(pos)
{

//get coords
const crd = pos.coords;

 // console.log('Your current position is:');
  //console.log(`Latitude : ${crd.latitude}`);
  
//get latitude
  let lat = crd.latitude

  console.log(`Longitude: ${crd.longitude}`);

//get longitude
  let lon = crd.longitude

let apiKey = "33a44c83fe16603731dff44e3a24880a";

//push the coords in API
let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

//get result and call function "displayWeather"

axios.get(`${url}`).then(displayWeather);

}


/*let locationButton = document.querySelector("#your-location");
locationButton.addEventListener("click", getCurrentPosition);*/


function showLocation(location) {
  console.log(location)
let apiKey = "33a44c83fe16603731dff44e3a24880a";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(`${url}`).then(showLocation);
}


