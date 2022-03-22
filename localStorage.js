import {
   UI,
   favoriteTowns
} from './view.js';

export function saveInformation(arr) {
   for (let i = 0; i < arr.length; i++) {
      localStorage.setItem(`favoriteTown ${i}`, favoriteTowns[i]);
   }
}

export function getInformation(arr) {
   for (let i = 0; i < arr.length; i++) {
    arr.push(localStorage.getItem(`favoriteTown ${i}`));     
   }
}