//HTML Elements
let currentCityEl = document.getElementById('current-city');
let currentTempEl = document.getElementById('current-temp');
let currentWindEl = document.getElementById('current-wind');
let currentHumidityEl = document.getElementById('current-humidity');
let currentUvEl = document.getElementById('current-uv');
let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');

let fiveDay;
let searchHistory;

let latitude;
let longitude;

/** api key  */
const apiKey = "b29c26eab0c4012b688fe393b9471a12";
// user:rtarasevich

searchInput.addEventListener("keypress", (event) => {
   if (event.key === "Enter") {
     searchButton.click()
   }
 })
 searchButton.addEventListener("click", startWeatherSearch)
 
 /** search history buttons give new results */
//  cityButtons.addEventListener("click", (event) => {
//    let city = event.target.id
//    let geoCodeURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`
//    startWeatherSearch(geoCodeURL, city)
//  })

 function startWeatherSearch() {
   let city = searchInput.value.toLowerCase()
   let geoCodeURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
console.log("starting weather search");
   fetchCityCoordinates(geoCodeURL, city);
}
console.log("HERE")

async function fetchCityCoordinates(geoCodeURL, city) {
   fetch(geoCodeURL).then( response => {
      console.log("here 1")
       if(!response.ok) {
      console.log("HERE ERROR")
         console.log(response.statusText);
      }
      console.log("NExT");
      return response.json();
   }).then(data => {
      if (data.length > 0) {
         latitude = data[0].lat
         longitude = data[0].lon
console.log("HERE 2");
         geoCodeURL = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
         console.log("geo code url", geoCodeURL)
         console.log("Latitude: " + latitude)
         console.log("Longitude: " + longitude)
      }
   })
   .then(() => {
      console.log("weather searching");
      weatherSearch(geoCodeURL);
   })
}

async function weatherSearch(geoCodeURL) {
   console.log("HERE AGAIN");
   const weatherCodeURL = await fetch(geoCodeURL).then(response => {
      console.log(response);
      if(!response.ok) {
   console.log("now I am here with no response");
   fetchCityCoordinates();
         console.log(response.statusText);
      }
      let uv = "4.5";
      let humidity = "40%";
      let wind = "25 MPH";
      let temp = "81&deg; F";
      setCurrentWeather(uv, humidity, wind, temp);
      return response.json();
   }).then(data => {
      if (data.length > 0) {
         console.log("Data", data);
         //Do HTML things
         //current weather = data.current;
         let uv = "4.5";
         let humidity = "40%";
         let wind = "25 MPH";
         let temp = "81 degrees F";
         setCurrentWeather(uv, humidity, wind, temp);

      }
   })
 }

 function setCurrentWeather(uv, humidity, wind, temp) {
   currentHumidityEl.innerHTML = humidity;
   currentUvEl.innerHTML = uv;
   currentWindEl.innerHTML = wind;
   currentTempEl.innerHTML = temp;
 }