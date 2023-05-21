import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import * as debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const inputValue = event.target.value.trim();
  console.log(inputValue);
  if (inputValue !== '') {
    fetchCountries(inputValue)
      .then(data => {
        console.log(data);
        if (data.length > 10) {
          listEl.innerHTML = '';
          infoEl.innerHTML = '';
          Notiflix.Notify.warning(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2 && data.length <= 10) {
          listEl.innerHTML = '';
          infoEl.innerHTML = '';
          data.forEach(country => renderCountryRow(country));
        } else {
          listEl.innerHTML = '';
          infoEl.innerHTML = '';
          renderOneCountryInfo(data[0]);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        listEl.innerHTML = '';
        infoEl.innerHTML = '';
      });
  } else {
    listEl.innerHTML = '';
    infoEl.innerHTML = '';
  }
}

function renderCountryRow(country) {
  let official = country.name.official;
  let svg = country.flags.svg;
  let png = country.flags.png;
  const markupForCountryRow = `<li><img width = "50px" src = "${svg}"/><h2>${official}</h2></li>`;

  listEl.innerHTML += markupForCountryRow;
  console.log(listEl);
}

function renderOneCountryInfo(country) {
  let official = country.name.official;
  let svg = country.flags.svg;
  let capital = country.capital;
  let population = country.population;
  let languages = Object.values(country.languages);

  const markupForSingleCountry = `
  <img width = "50px" src = "${svg}"/>
  <h2>${official}</h2>
  <p><b>Capital</b> ${capital}</p>
  <p><b>Population</b> ${population}</p>
  <p><b>Languages</b> ${languages}</p>`;
  infoEl.innerHTML += markupForSingleCountry;
}
