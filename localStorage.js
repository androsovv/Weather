import {
   UI,
   favoriteTowns
} from './view.js';

import {
   deleteFavoriteTown,
   showFavoriteTownInfo
} from './script.js';

export function saveInformation(arr) {
   for (let i = 0; i < arr.length; i++) {
      localStorage.setItem(`favoriteTown ${i}`, favoriteTowns[i]);
   }
}

export function getSaveInformation() {
   if(localStorage.length != 0) {
      for (let i = 0; i < localStorage.length; i++) {
         const savedFavoriteTown = document.createElement('div');
   
         savedFavoriteTown.classList = 'box__right__towns__item';
         savedFavoriteTown.innerHTML = `<div class="box__right__towns__item__name">${localStorage.getItem(`favoriteTown ${i}`)}</div>
      <img src="srs/icons/remove-icon.svg" alt="" class="delete">`;
         UI.TOWNS_PARENT.append(savedFavoriteTown);
         deleteFavoriteTown();
         showFavoriteTownInfo();
      }
   }
}

