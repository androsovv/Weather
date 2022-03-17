 const UI = {
    TABS_CONTENT: document.querySelectorAll('.box__left__tabs__item'),
    TABS_BTN: document.querySelectorAll('.box__left__options__item'),
    TABS_PARENT: document.querySelector('.box__left__options'),
    SEARCH_TOWN: document.querySelector('.search__town'),
    SEARCH_BTN: document.querySelector('.search__img'),
    TEMPERATURE_NOW: document.querySelector('.temperature__now'),
    TOWN_NAME: document.querySelectorAll('.town__name'),
    ADD_FAVORITE: document.querySelector('.box__left_bottom__favorite'),
    TOWNS_PARENT: document.querySelector('.box__right__towns'),
    TEMPERATURE_DETAILS: document.querySelector('.temperature__details'),
    FEELS_LIKE_DETAILS: document.querySelector('.feels__like__deatils'),
    WHEATHER_DETAILS: document.querySelector('.weather__deatails'),
    SUNRISE_DETAILS: document.querySelector('.sunrise'),
    SUNSET_DETAILS: document.querySelector('.sunset'),


 };

 let favoriteTowns = [];





 function hideBoxLeftContent() {
    UI.TABS_CONTENT.forEach(item => {
       item.style.display = 'none';
    });
    UI.TABS_BTN.forEach(item => {
       item.classList.remove('active');
    });
 }

 function showBoxLeftContent(i) {
    UI.TABS_CONTENT[i].style.display = 'block';
    UI.TABS_BTN[i].classList.add('active');
 }


 hideBoxLeftContent();
 showBoxLeftContent(0);


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

 UI.SEARCH_BTN.addEventListener('click', event => {
    event.preventDefault();
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather',
       cityName = UI.SEARCH_TOWN.value,
       apiKey = 'f660a2fb1e4bad108d6160b7f58c555f',
       url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;


    let weatherResponse = fetch(url);

    weatherResponse.then(getWheather => getWheather.json())
       .then(result => {
          const sunrise = new Date(result.sys.sunrise * 1000),
             sunset = new Date(result.sys.sunset * 1000);
          console.log(result, result.sys.sunrise);
          UI.SEARCH_TOWN.value = '';
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
 });

 UI.ADD_FAVORITE.addEventListener('click', event => {
    event.preventDefault();
    let townName = document.querySelector('.town__name').textContent;

    if (favoriteTowns.length === 0) {
       addFavoriteTown();
    } else {
       if (favoriteTowns.includes(townName)) {
          return;
       } else {
          addFavoriteTown();
       }
    }
 });

 function convertTemperature(temp) {
    return Math.round(temp - 273.15);
 }

 function addFavoriteTown() {
    let townName = document.querySelector('.town__name').textContent;
    const newFavoriteTown = document.createElement('div');
    newFavoriteTown.classList = 'box__right__towns__item';
    newFavoriteTown.innerHTML = `<div class="box__right__towns__item__name">${townName}</div>
   <img src="srs/icons/remove-icon.svg" alt="" class="delete">`;
    UI.TOWNS_PARENT.append(newFavoriteTown);
    favoriteTowns.push(newFavoriteTown.firstChild.textContent);
    deleteFavoriteTown();
    showFavoriteTownInfo();
 }

 function deleteFavoriteTown() {
    const deleteBtn = document.querySelectorAll('.delete');
    deleteBtn.forEach((item, index) => {
       item.addEventListener('click', event => {
          event.preventDefault();
          favoriteTowns.splice(index, 1);
          item.parentElement.remove();
       });
    });
 }

 function showFavoriteTownInfo() {
    const showInfo = document.querySelectorAll('.box__right__towns__item__name');
    showInfo.forEach(item => {
       item.addEventListener('click', event => {
          event.preventDefault();
          console.log(item.textContent);


          const serverUrl = 'http://api.openweathermap.org/data/2.5/weather',
             cityName = item.textContent,
             apiKey = 'f660a2fb1e4bad108d6160b7f58c555f',
             url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
          let weatherResponse = fetch(url);

          weatherResponse.then(getWheather => getWheather.json())
             .then(result => {
               const sunrise = new Date(result.sys.sunrise * 1000),
                     sunset = new Date(result.sys.sunset * 1000);
                UI.TEMPERATURE_NOW.textContent = convertTemperature(result.main.temp) + '°';
                UI.TOWN_NAME.forEach(item => {
                   item.textContent = result.name;
                });
                UI.TEMPERATURE_DETAILS.textContent = 'Temperature: ' + convertTemperature(result.main.temp) + '°';
                UI.FEELS_LIKE_DETAILS.textContent = 'Feels like: ' + convertTemperature(result.main.feels_like) + '°';
                UI.WHEATHER_DETAILS.textContent = 'Wheather: ' + (result.weather[0].main);
                UI.SUNRISE_DETAILS.textContent = 'Sunrise: ' + (sunrise.getHours()) + ':' + (sunrise.getMinutes());
                UI.SUNSET_DETAILS.textContent = 'Sunset: ' + (sunset.getHours()) + ':' + (sunset.getMinutes());
             });


       });
    });
 }