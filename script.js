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
          console.log(result);
          UI.SEARCH_TOWN.value = '';
          UI.TEMPERATURE_NOW.textContent = convertTemperature(result.main.temp) + '°';
          UI.TOWN_NAME.forEach(item => {
             item.textContent = result.name;
          });
       })

       
       .catch(error => alert(error));
 });

UI.ADD_FAVORITE.addEventListener('click', event => {
   event.preventDefault();
   let townName = document.querySelector('.town__name').textContent;
   console.log(favoriteTowns);

   if (favoriteTowns.length === 0) {
      const newFavoriteTown = document.createElement('div');
         newFavoriteTown.classList = 'box__right__towns__item';
         newFavoriteTown.innerHTML = `<div class="box__right__towns__item__name">${townName}</div>
         <img src="srs/icons/remove-icon.svg" alt="" class="delete">`;
         UI.TOWNS_PARENT.append(newFavoriteTown);
         favoriteTowns.push(newFavoriteTown.firstChild.textContent);
   } else {
         if (favoriteTowns.includes(townName)) {
          return;
         } else {
            const newFavoriteTown = document.createElement('div');
            newFavoriteTown.classList = 'box__right__towns__item';
            newFavoriteTown.innerHTML = `<div class="box__right__towns__item__name">${townName}</div>
            <img src="srs/icons/remove-icon.svg" alt="" class="delete">`;
            UI.TOWNS_PARENT.append(newFavoriteTown);
            favoriteTowns.push(newFavoriteTown.firstChild.textContent);
         }

   }
});

 function convertTemperature(temp) {
    return Math.round(temp - 273.15);
 }