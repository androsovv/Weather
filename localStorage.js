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
   // for (let i = 0; i < arr.length; i++) {
   //    localStorage.setItem(`favoriteTown ${i}`, favoriteTowns[i]);
   // }
   localStorage.setItem("favoriteTowns", JSON.stringify(arr));
}

export function removeStorageTown(index) {
 let arr = JSON.parse(localStorage.getItem("favoriteTowns"));
 arr.splice(index, 1);
 localStorage.setItem("favoriteTowns", JSON.stringify(arr));
}

export function getSaveInformation() {
   if(localStorage.length != 0) {
      for (let i = 0; i < localStorage.length - 1; i++) {

         favoriteTowns.push(localStorage.getItem(`favoriteTown ${i}`));

         const savedFavoriteTown = document.createElement('div');
   
         savedFavoriteTown.classList = 'box__right__towns__item';
         savedFavoriteTown.innerHTML = `<div class="box__right__towns__item__name">${localStorage.getItem(`favoriteTown ${i}`)}</div>
      <img src="srs/icons/remove-icon.svg" alt="" class="delete">`;
         UI.TOWNS_PARENT.append(savedFavoriteTown);
         deleteFavoriteTown();
         showFavoriteTownInfo();
      }
   }
   console.log(favoriteTowns);
   console.log(localStorage.getItem('favoriteTown'));
}

export function getCurrentCity(currentCity) {
   localStorage.setItem('Current city', currentCity);
}

export function showLastWeather() {
   let lastCurentCity = localStorage.getItem('Current city');

   forecast(lastCurentCity);

   const serverUrl = WEATHER_API_URL,
         cityName = lastCurentCity,
         apiKey = 'f660a2fb1e4bad108d6160b7f58c555f',
         url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

   let weatherResponse = fetch(url);

    getWheather(weatherResponse);

}