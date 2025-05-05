let recomendation;
fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        recomendation = data;
    })
    .catch(error => {
        console.error('Error fetching weather:', error);
    });
const searchBar = document.getElementById("searchbar");
const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");
const resultsContainer = document.getElementById("resultsContainer");
function clearResults() {
    resultsContainer.classList.add('invisible');
    resultsContainer.innerHTML = "";
    searchBar.value = "";
}
function provideResults() {
    const search = searchBar.value.toLowerCase();
    if (!search.length) {
        return;
    }
    let results = [];
    if (search.includes("beach")) {
        results = recomendation.beaches;
    } else if (search.includes("templ")) {
        results = recomendation.temples;
    } else if (search.includes("countr")) {
        recomendation.countries.forEach((country, i) => {
            results.push(country.cities[0]);
        });
    } else {
        recomendation.countries.forEach((country, i) => {
            country.cities.forEach((city, y) => {
                if (city.name.toLowerCase().includes(search)) {
                    results.push(city);
                }
            });
        });
    }

    let resiltItems = "";
    if (results.length) {
        results.forEach((item, index) => {
            resiltItems += `<div class="resultItem">
            <span class="resultImage"><img src="${item.imageUrl}"></span>
            <span class="resultTitle">${item.name}</span>
            <span class="resultDescr">${item.description}</span>
            <a>More...</a>
            </div>`;
        });
    
    } else {
        resiltItems += `<div class="resultItem">
            <span class="nothingFound">Nothing found for your request <b>${search}</b></span>
            </div>`;
    }
    resultsContainer.innerHTML = resiltItems;  
    resultsContainer.classList.remove('invisible');
}
btnSearch.addEventListener("click", provideResults);
btnReset.addEventListener("click", clearResults);