 const UI = {
   TABS_CONTENT: document.querySelectorAll('.box__left__tabs__item'),
   TABS_BTN: document.querySelectorAll('.box__left__options__item'),
   TABS_PARENT: document.querySelector('.box__left__options'),
   SEARCH_TOWN: document.querySelector('.search__town'),
};

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const cityName = 'boston';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;



function hideBoxLeftContent() {
   UI.TABS_CONTENT.forEach(item => {
      item.style.display = 'none';
   });
   UI.TABS_BTN.forEach (item => {
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

