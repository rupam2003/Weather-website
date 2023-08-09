const apiKey="e5e476057ad2cf18bad933efce1d5ed4";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?q=bangalore&appid=e5e476057ad2cf18bad933efce1d5ed4";
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const cityName = document.getElementById('city');
const wind = document.getElementById('wind');
const humid = document.getElementById('humidity');
const weatherImg = document.getElementById('weather-img');
const input = document.getElementById('city-name')
const fade= document.querySelectorAll('.found');
const notFound= document.querySelectorAll('.not-found');
const datetime=document.getElementById('date');
const feelsLike = document.getElementById('feel');
const pressure = document.getElementById('pressure');
const min = document.getElementById('min');
const max = document.getElementById('max');
const form = document.getElementById('form');


function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}



function convertTimeStamp(timestamp, timezone){
    const convertTimezone = timezone / 3600; // convert seconds to hours 

   const date = new Date(timestamp * 1000);
   
   const options = {
       weekday: "long",
       day: "numeric",
       month: "long",
       year: "numeric",  
       timeZone: `Etc/GMT-6`,
       hour12: true,
   }
   return date.toLocaleString("en-US", options);
  
}

async function getweather()
{

    fade.forEach((e) => {
            
        e.style.scale = 0;
    });
    notFound.forEach((e) => {
    
        e.style.scale = 0;
   });   
    



    let city = input.value;
    if(city==''){
        city = 'kolkata';
    }
    input.value='';
    
    console.log(city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e5e476057ad2cf18bad933efce1d5ed4`);
    var data = await response.json();

    if(response.status == 404)
    {
        temp.innerHTML='City not found';
        weatherImg.src = 'images/error.png';
        notFound.forEach((e) => {
            
            
            
            e.style.scale = 1;
       });  

        console.log('not');
    }
    else{
        switch (data.weather[0].main) {
            case 'Haze':
                weatherImg.src = 'images/haze.png';
                break;
            case 'Clouds':
                weatherImg.src = 'images/cloud.png';
                break;
            case 'Clear':
                weatherImg.src = 'images/clear.png';
                break;
            case 'Rain':
                weatherImg.src = 'images/rain.png';
                break;
            case 'Snow':
                weatherImg.src = 'images/snow.png';
                break;            
            default:
                weatherImg.src = 'images/cloud.png';
                break;
        }
       
    
        console.log(data);
        datetime.innerHTML = convertTimeStamp(data.dt,data.timezone); 
        let tempValue = parseInt(data.main.temp-273);
        temp.innerHTML = `${tempValue}°`;
        weather.innerHTML= `${data.weather[0].main}`;
        cityName.innerHTML = `${data.name},${convertCountryCode(data.sys.country)}`;
        humid.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${data.wind.speed} m/s`;
        let feel = parseInt(data.main.feels_like-273);
        feelsLike.innerHTML = `${feel}°`;
        pressure.innerHTML = `${data.main.pressure} hPa`;
        min.innerHTML = `Min : ${parseInt(data.main.temp_min-273)}°`;
        max.innerHTML = `Max : ${parseInt(data.main.temp_max-273)}°`;

    
        fade.forEach((e) => {

            e.style.scale = 1;
        
       });
    }
   
}

function submitForm(event){

    //Preventing page refresh
    event.preventDefault();
 }
 
 //Calling a function during form submission.
 form.addEventListener('submit', submitForm);
 form.addEventListener('submit', getweather);



getweather();