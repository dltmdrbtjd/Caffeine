(function () {
    const key = "08f8750fb133c6cc93d8842fb98db3cf";

    function loadWeather() {
        const currentLocation = localStorage.getItem('coords');

        if (!currentLocation) {
            askLocation();
        } else {
            const sendLocation = JSON.parse(localStorage.getItem('coords'));
            showWeather(sendLocation.latitude, sendLocation.longitude);
        }
    }

    function askLocation() {
        navigator.geolocation.getCurrentPosition(successGeo, failedGeo);
    }

    function successGeo(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const coordsObj = {
            latitude,
            longitude
        }

        localStorage.setItem('coords', JSON.stringify(coordsObj));
        const sendCoords = JSON.parse(localStorage.getItem('coords'));
        showWeather(sendCoords.latitude, sendCoords.longitude);
    }

    function failedGeo() {
        console.log('위치를 불러오는데 실패하였습니다.');
    }

    function showWeather(lat, lon) {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);

        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;

            if (xhr.status === 200) {
                const temp = document.querySelector('.weather__temp');
                const icon = document.querySelector('.weather__icon');
                const response = JSON.parse(xhr.response);
                
                temp.innerText = `${Math.round(response.main.temp)} °C`;

                icon.setAttribute('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
            } else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        }
    }

    loadWeather();
})()
