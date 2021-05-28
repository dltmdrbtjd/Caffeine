const getCurrentAddress = function(lat, lon) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `/address?lat_give=${lat}&lon_give=${lon}`);

    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) {
            const address = JSON.parse(xhr.response).documents[0].address.address_name;
            const curAdd = document.querySelector('.current-address');

            curAdd.innerText = address;
        } else {
            console.error('Error', xhr.status, xhr.statusText);
        }
    }
}
