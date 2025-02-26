const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const localTime = document.getElementById('local-time');
const localDate = document.getElementById('local-date');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "a7b427f8177903a5e1288ba7ce01b182";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return;
        }

        console.log("Weather data fetched successfully");

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        // Update Weather Details
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        // Set Weather Image
switch (weather_data.weather[0].main) {
    case 'Clouds':
        weather_img.src = "/assets/cloud.png";
        break;
    case 'Clear':
        weather_img.src = "/assets/clear.png";
        break;
    case 'Rain':
        weather_img.src = "/assets/rain.png";
        break;
    case 'Mist':
        weather_img.src = "/assets/mist.png";
        break;
    case 'Thunderstorm':
        weather_img.src = "/assets/thunderstorm.png";
        break;
    case 'Snow': 
        weather_img.src = "/assets/snow.png";  // Added Snow
        break;
    case 'Smoke': 
        weather_img.src = "/assets/smoke.png"; // Added Smoke
        break;
    case 'Fog':
         weather_img.src = "/assets/fog.png"; // Use the downloaded fog icon
         break;
    default:
        weather_img.src = "/assets/default.png"; // Fallback image
}


        // Update Local Time & Date
        updateLocalTimeAndDate(weather_data.timezone);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to update local time & date
function updateLocalTimeAndDate(timezoneOffset) {
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTimeDate = new Date(utcTime + timezoneOffset * 1000);
    
    localTime.innerHTML = localTimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    localDate.innerHTML = localTimeDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
}

// Search Button Click Event
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check if dark mode is already enabled (stored in localStorage)
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`; // Set icon to Sun ☀️
    }

    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Update icon
        if (body.classList.contains("dark-mode")) {
            darkModeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`; // Change to Sun ☀️
            localStorage.setItem("dark-mode", "enabled"); // Store in localStorage
        } else {
            darkModeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`; // Change to Moon 🌙
            localStorage.setItem("dark-mode", "disabled"); // Store in localStorage
        }
    });
});
