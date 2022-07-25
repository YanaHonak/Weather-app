let today = new Date();
let ul = document.querySelector("#date");

let days = ["Sunday", "Monday", "Tuesday", "Wedsday", "Thurday", "Friday", "Saturday"];
let day = days[today.getDay()];
let hours = today.getHours();
let minutes = today.getMinutes();
ul.innerHTML = `${day},  ${hours}:${minutes}`;

findData('Nicosia');

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

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  
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


let locationButton = document.querySelector("#your-location");
locationButton.addEventListener("click", getCurrentPosition);


function showLocation(location) {
  console.log(location)
let apiKey = "33a44c83fe16603731dff44e3a24880a";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(`${url}`).then(showLocation);
}


