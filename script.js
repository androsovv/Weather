 const UI = {
    TABS_CONTENT: document.querySelectorAll('.box__left__tabs__item'),
    TABS_BTN: document.querySelectorAll('.box__left__options__item'),
    TABS_PARENT: document.querySelector('.box__left__options'),
    SEARCH_TOWN: document.querySelector('.search__town'),
    SEARCH_BTN: document.querySelector('.search__img'),
    TEMPERATURE_NOW: document.querySelector('.temperature__now'),
    TOWN_NAME: document.querySelectorAll('.town__name'),




 };





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
          console.log(typeof result.weather);

          UI.TEMPERATURE_NOW.textContent = convertTemperature(result.main.temp) + '°';
          UI.TOWN_NAME.forEach(item => {
             item.textContent = result.name;
          });

       })


       .catch(error => alert(error));
 });

 function convertTemperature(temp) {
    return Math.round(temp - 273.15);
 }