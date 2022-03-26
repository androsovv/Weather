import {
   UI,
   favoriteTowns
} from './view.js';

import {
   deleteFavoriteTown,
   showFavoriteTownInfo,
   forecast,
   WEATHER_API_URL,
   getWheather
} from './script.js';

export function saveInformation(arr) {
   localStorage.setItem("favoriteTowns", JSON.stringify([...arr]));
}

export function removeStorageTown(index) {
 let arr = JSON.parse(localStorage.getItem("favoriteTowns"));
 arr.splice(index, 1);
 localStorage.setItem("favoriteTowns", JSON.stringify(arr));
}

export function getSaveInformation() {
   if(localStorage.length != 0) {
      let townsCount = localStorage.getItem("favoriteTowns").split(',').length;
      for (let i = 0; i < townsCount; i++) {

         let arr = JSON.parse(localStorage.getItem("favoriteTowns"));

         favoriteTowns.add(arr[i]);

         const savedFavoriteTown = document.createElement('div');
   
         savedFavoriteTown.classList = 'box__right__towns__item';
         savedFavoriteTown.innerHTML = `<div class="box__right__towns__item__name">${arr[i]}</div>
      <img src="srs/icons/remove-icon.svg" alt="" class="delete">`;
         UI.TOWNS_PARENT.append(savedFavoriteTown);
         deleteFavoriteTown();
         showFavoriteTownInfo();
         console.log(favoriteTowns);
      }
   }
}

export function getCurrentCity(currentCity) {
   localStorage.setItem('Current city', currentCity);
}

export function showLastWeather() {
   let lastCurentCity = localStorage.getItem('Current city');

   forecast(lastCurentCity);

   const serverUrl = WEATHER_API_URL,
         cityName = lastCurentCity,
         apiKey = 'e6ca4f582a85a52b47aa34c1cb1f9804',
         url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

   let weatherResponse = fetch(url);

    getWheather(weatherResponse);

}