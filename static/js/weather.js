const weather = (function () {
    const $weather = document.querySelector('.weather');
    const key = "08f8750fb133c6cc93d8842fb98db3cf";

    const loadWeather = function() {
        const currentLocation = localStorage.getItem('coords');

        if (!currentLocation) {
            askLocation();
        } else {
            const sendLocation = JSON.parse(localStorage.getItem('coords'));
            
            showWeather(sendLocation.latitude, sendLocation.longitude);
            getCurrentAddress.showAddress(sendLocation.latitude, sendLocation.longitude);
        }
    }

    const askLocation = function() {
        navigator.geolocation.getCurrentPosition(successGeo, failedGeo);
    }

    const successGeo = function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const coordsObj = {
            latitude,
            longitude
        };

        localStorage.setItem('coords', JSON.stringify(coordsObj));

        const sendCoords = JSON.parse(localStorage.getItem('coords'));

        showWeather(sendCoords.latitude, sendCoords.longitude);
        getCurrentAddress.showAddress(sendCoords.latitude, sendCoords.longitude);
    }

    const failedGeo = function() {
        console.log('위치를 불러오는데 실패하였습니다.');
    }

    const showWeather = function(lat, lon) {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);

        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;

            if (xhr.status === 200) {
                const temp = document.querySelector('.weather__temp');
                const icon = document.createElement('img');
                const response = JSON.parse(xhr.response);
                
                temp.innerText = `${Math.round(response.main.temp)} °C`;

                icon.setAttribute('class', 'weather__icon');
                icon.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
                icon.alt = 'weather icon';

                $weather.appendChild(icon);
            } else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        }
    }

    loadWeather();

    return {
        askLocation,
        weather: $weather
    }
})()
