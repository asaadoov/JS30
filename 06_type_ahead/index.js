const search = document.querySelector('.search');
const suggestoins = document.querySelector('.suggestions');
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(data => data.json())
    .then(city => cities.push(...city))
    .catch('Error: somthing went wrong!');

function getMatch(word, cities) {
    const result = cities.filter(matched => {
        const regex = new RegExp(word, 'gi');
        return matched.city.match(regex) || matched.state.match(regex);
    });
    return result;
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function show() {

    const matchedArr = getMatch(this.value, cities);
    const html = matchedArr.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
            <span class="name"> ${cityName}, ${stateName}</span>
            <span class="population"> ${numberWithCommas(place.population)}</span> 
        </li>
        `;
    }).join('');

    if (this.value === '') {
        while (suggestoins.firstChild) {
            suggestoins.removeChild(suggestoins.firstChild)
        }
        suggestoins.innerHTML = '<li>Filter for a city</li> <li>or a state</li>';
    } else {
        suggestoins.innerHTML = html;
    }
}
search.addEventListener('keyup', show);