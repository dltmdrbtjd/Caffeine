const getCurrentAddress = (function() {
    const $gpsBtn = document.querySelector('.btn--gps');
    const $curAdd = document.querySelector('.current-address');

    const reloadGeo = function() {
        const $temp = document.querySelector('.weather__temp');
        const $icon = document.querySelector('.weather__icon');

        $temp.innerText = '';
        $icon && weather.weather.removeChild($icon);
        $curAdd.innerText = '';

        localStorage.removeItem('coords');
        weather.askLocation();
    }

    const showAddress = function(lat, lon) {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `/address?lat_give=${lat}&lon_give=${lon}`);

        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;

            if (xhr.status === 200) {
                const address = JSON.parse(xhr.response).documents[0];

                $curAdd.innerText = `${address.region_1depth_name} ${address.region_2depth_name}`;
            } else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        }
    }

    $gpsBtn.addEventListener('click', reloadGeo);

    return {
        showAddress
    }
}) ()
