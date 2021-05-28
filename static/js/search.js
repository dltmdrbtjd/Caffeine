(function() {
    // DOM
    const searchForm = document.getElementById('search--form');
    const searchInput = document.getElementById('input--search');

    // FUNCTION
    const showSearchResult = function(result) {
        
    }

    const search = function(keyword) {
        if (!search) return;

        const xhr = new XMLHttpRequest();

        xhr.open('GET',  `/search?keyword_give=${keyword}`);

        xhr.setRequestHeader('content-type', 'application/json');

        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;

            if (xhr.status === 200) {
                console.log(JSON.parse(xhr.response).documents);
            } else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        }
    }

    // EVENT HANDLER
    searchForm.addEventListener('submit', () => {
        event.preventDefault();
        search(searchInput.value);
    });
})()
