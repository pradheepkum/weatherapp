var oSearch = document.getElementById("location");
var oTemprature = document.getElementById("temprature");
var oLocation = document.getElementById("city");
var oHumidity = document.getElementById("humidity");
var oWeatherType = document.getElementById("weatherType");
var containerImg = document.querySelector(".container");
var Hicon = document.getElementById("Hicon");
var weather = document.getElementById("weather");
var Control = document.getElementById("Control");
var OpenWeather = document.getElementById("OpenWeather");
var Unsplash = document.getElementById("Unsplash");
var OpenWeatherAPIKey;
var UnsplashAPIKey;

const SubmitCred = () => {
    if(OpenWeather.value && Unsplash.value){
        OpenWeatherAPIKey = OpenWeather.value;
        UnsplashAPIKey = Unsplash.value;
        Control.style.display = "none";
        weather.style.display = "flex";

    }else{
        alert("Invalid API Key!!")
    }
};

async function getBGPicmatchingCity(city){

    try{
       
        const apiURL = `https://api.unsplash.com/search/photos?page=1&query=${city}&per_page=1&client_id=${UnsplashAPIKey}`;

        const response = await fetch(apiURL);
        const responseJSON = await response.json();
        const BGImg = responseJSON.results.length ? responseJSON.results[0].urls.full : "https://images.unsplash.com/photo-1630784032313-f780ae5532c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" ;

        containerImg.style.backgroundImage = `url(${BGImg})`;
    }catch(error){
        console.error(error);
    }


}

async function getCurrentWeather(){
    if(oSearch.value){
  
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
/////Promise - 2nd type of call
// appid=4550327f99562eaeee7eb80ffa064e89&q=London
// Access Key  /* hhQo3Je3WIMiUk7S2Co0tzHKToJeV6Knt54hPBp-DQs */
// Secure Key /* ZB_BZwsH8Dv3Za3ZLvj39doixYebgdDWIaMTVJhC4gc */
try {
 await  getBGPicmatchingCity(oSearch.value);
 const response = await fetch(apiURL + "&appid=" + OpenWeatherAPIKey + "&q=" + oSearch.value);
 const responseJSON = await response.json();   
//  const responseJSON = {
//     "coord": {
//       "lon": -0.1257,
//       "lat": 51.5085
//     },
//     "weather": [
//       {
//         "id": 804,
//         "main": "Clouds",
//         "description": "overcast clouds",
//         "icon": "04d"
//       }
//     ],
//     "base": "stations",
//     "main": {
//       "temp": 294.92,
//       "feels_like": 294.56,
//       "temp_min": 293.03,
//       "temp_max": 296.49,
//       "pressure": 1019,
//       "humidity": 54
//     },
//     "visibility": 10000,
//     "wind": {
//       "speed": 4.63,
//       "deg": 270
//     },
//     "clouds": {
//       "all": 100
//     },
//     "dt": 1695646513,
//     "sys": {
//       "type": 2,
//       "id": 268730,
//       "country": "GB",
//       "sunrise": 1695621040,
//       "sunset": 1695664439
//     },
//     "timezone": 3600,
//     "id": 2643743,
//     "name": "London",
//     "cod": 200
//   };
//  let whether = responseJSON["record"];
//  console.log(responseJSON);
//  oTemprature.innerHTML = whether["tempearture"];
let temprature = responseJSON["main"]["temp"];
let weatherType = responseJSON["weather"][0]["main"];
Hicon.style.display = "block";
let humidity = responseJSON["main"]["humidity"];
let location = responseJSON["name"];
console.log(location);
oLocation.innerHTML = location;
oHumidity.innerHTML = "Humidity :" + humidity + "%";
oTemprature.innerHTML = Math.round(temprature) + "°c";
if(weatherType == "Clouds"){
    oWeatherType.src = "images/cloudy.png";
}else if(weatherType == "Drizzle"){
    oWeatherType.src = "images/drizzle.png";
}else if(weatherType == "Mist"){
    oWeatherType.src = "images/mist.png";    
}else if(weatherType == "Rain"){
    oWeatherType.src = "images/rain.png";
}else if(weatherType == "Clear"){
    oWeatherType.src = "images/sunny.png";
}else{
    oWeatherType.src = "images/sunny.png";
}

} catch (error) {
    console.error(error);
}

/////Promise 
        // fetch(apiURL)
        // .then( (res) => res.json())
        // .then((response) => {
        //     let whether = response["record"];
        //     console.log(whether);
        //     oTemprature.innerText = whether["tempearture"];

        // })
        // .catch((error) => console.log(error))
        // .finally(() => console.log("process completed!!!"));
    }else{
        alert("Please enter a valid loctation/City");
    };
}