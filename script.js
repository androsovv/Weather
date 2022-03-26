 import {
    favoriteTowns,
    UI,
    month,
 } from './view.js';
 import {
    saveInformation,
    getSaveInformation,
    getCurrentCity,
    showLastWeather,
    removeStorageTown
 } from './localStorage.js';


 export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';



 getSaveInformation();
 showLastWeather();

 //  console.log(favoriteTowns);

 // скрытие контента табов now, details, forecast
 function hideBoxLeftContent() {
    UI.TABS_CONTENT.forEach(item => {
       item.style.display = 'none';
    });
    UI.TABS_BTN.forEach(item => {
       item.classList.remove('active');
    });
 }

 //ф-ция показа контента табов
 function showBoxLeftContent(i) {
    UI.TABS_CONTENT[i].style.display = 'block';
    UI.TABS_BTN[i].classList.add('active');
 }


 hideBoxLeftContent();
 showBoxLeftContent(0);

 // переключение табов через делегирование
 UI.TABS_PARENT.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('box__left__options__item')) {
       UI.TABS_BTN.forEach((item, i) => {
          if (target == item) {
             hideBoxLeftContent();
             showBoxLeftContent(i);
          }
       });
    }

 });

 // показ погоды по кнопке поиска
 UI.SEARCH_BTN.addEventListener('click', event => {
    event.preventDefault();

    getCurrentCity(UI.SEARCH_TOWN.value);



    UI.FORECAST_PARENT.innerHTML = '';
    forecast(UI.SEARCH_TOWN.value);

    const serverUrl = WEATHER_API_URL,
       cityName = UI.SEARCH_TOWN.value,
       apiKey = 'e6ca4f582a85a52b47aa34c1cb1f9804',
       url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

    let weatherResponse = fetch(url);

    getWheather(weatherResponse);

 });

 //добавляем любимый город
 UI.ADD_FAVORITE.addEventListener('click', event => {
    event.preventDefault();
    let townName = document.querySelector('.town__name').textContent;

    if(!favoriteTowns.has(townName)) {
      addFavoriteTown();
    }
 });

 function convertTemperature(temp) {
    return Math.round(temp - 273.15);
 }

 export function addFavoriteTown() {
    let townName = document.querySelector('.town__name').textContent;

    const newFavoriteTown = document.createElement('div');

    newFavoriteTown.classList = 'box__right__towns__item';
    newFavoriteTown.innerHTML = `<div class="box__right__towns__item__name">${townName}</div>
   <img src="srs/icons/remove-icon.svg" alt="" class="delete">`;
    UI.TOWNS_PARENT.append(newFavoriteTown);
    favoriteTowns.add(newFavoriteTown.firstChild.textContent);
    deleteFavoriteTown();
    showFavoriteTownInfo();
    saveInformation(favoriteTowns);

 }

 export function deleteFavoriteTown() {
    const deleteBtn = document.querySelectorAll('.delete');
    deleteBtn.forEach((item, index) => {
       item.onclick = function () {
          favoriteTowns.delete(index);
          item.parentElement.remove();
          console.log(favoriteTowns);
          removeStorageTown(index);
       };
    });
 }

 //функция показа погоды по уже добавленному любимому городу
 export function showFavoriteTownInfo() {
    const showInfo = document.querySelectorAll('.box__right__towns__item__name');
    showInfo.forEach(item => {
       item.onclick = function () {

          getCurrentCity(item.textContent);

          const serverUrl = WEATHER_API_URL,
             cityName = item.textContent,
             apiKey = 'e6ca4f582a85a52b47aa34c1cb1f9804',
             url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

          let weatherResponse = fetch(url);

          forecast(item.textContent);
          getWheather(weatherResponse);

       };
    });
 }

 export async function forecast(nameValue) {
    try {
       UI.FORECAST_PARENT.innerHTML = '';
       const serverUrl = 'https://api.openweathermap.org/data/2.5/forecast',
          cityName = nameValue,
          apiKey = 'e6ca4f582a85a52b47aa34c1cb1f9804',
          url = `${serverUrl}?q=${cityName}&appid=${apiKey}&cnt=12`;

       let forecastResponse = await fetch(url);

       let json = await forecastResponse.json();

       for (let i = 0; i < json.list.length; i++) {
          let div = document.createElement('div'),
             date = new Date(json.list[i].dt * 1000);
          div.classList = 'wheather__block';
          div.innerHTML = ` <div class="wheather__block__left">
                             <div class="wheather__block__left__date">
                             ${date.getUTCDate() + " " + month[date.getMonth()]}</div>
                             <div class="wheather__block__left__temperature temperature">Temperature: 
                             ${convertTemperature(json.list[i].main.temp)}°</div>
                             <div class="wheather__block__left__feels feels">Feels like: 
                             ${convertTemperature(json.list[i].main.feels_like)}°</div>
                          </div>
                          <div class="wheather__block__right">
                             <div class="wheather__block__right__time">
                             ${json.list[i].dt_txt.slice(11, 16)}
                             </div>
                             <div class="wheather__block__right__weather">
                             ${json.list[i].weather[0].main}
                             </div>
                             <img src="https://openweathermap.org/img/wn/${json.list[i].weather[0].icon}.png" class="wheather__block__right__img">
                          </div>`;
          UI.FORECAST_PARENT.append(div);
       }
    } catch (err) {
       alert(err);
    }
 }

 export function getWheather(response) {
    response.then(getWheather => getWheather.json())
       .then(result => {
          const sunrise = new Date(result.sys.sunrise * 1000),
             sunset = new Date(result.sys.sunset * 1000);
          UI.SEARCH_TOWN.value = '';
          UI.MAIN_ICON.style.background = `url(https://openweathermap.org/img/wn/${result.weather[0].icon}.png) center center/cover no-repeat`;
          UI.MAIN_ICON.style.backgroundSize = '80%';
          UI.TEMPERATURE_NOW.textContent = convertTemperature(result.main.temp) + '°';
          UI.TOWN_NAME.forEach(item => {
             item.textContent = result.name;
          });
          UI.TEMPERATURE_DETAILS.textContent = 'Temperature: ' + convertTemperature(result.main.temp) + '°';
          UI.FEELS_LIKE_DETAILS.textContent = 'Feels like: ' + convertTemperature(result.main.feels_like) + '°';
          UI.WHEATHER_DETAILS.textContent = 'Wheather: ' + (result.weather[0].main);
          UI.SUNRISE_DETAILS.textContent = 'Sunrise: ' + (sunrise.getHours()) + ':' + (sunrise.getMinutes());
          UI.SUNSET_DETAILS.textContent = 'Sunset: ' + (sunset.getHours()) + ':' + (sunset.getMinutes());
       })


       .catch(error => alert(error));
 }