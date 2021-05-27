const addHtml = document.querySelector('#result .insertHtml');
const background = document.getElementById('background');
const query = document.getElementById('city');
const form = document.querySelector('#form');
const button = document.querySelector('button');
const advice = document.getElementById('advice');

const token = config.MY_API_TOKEN;

let date1 = new Date();
let dateLocale = date1.toLocaleString('fr-FR',{
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const todayDate = dateLocale;

let timeNow = date1.toLocaleString('fr-FR', {
  hour: 'numeric',
  minute: 'numeric'
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchMethod(query.value);
  query.value = '';
})

const fetchMethod = (city) => {
  addHtml.innerHTML = '';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${token}`;
  fetch(url)
  .then(response => response.json())
  .then((data) => {
    const upperCaseCity = city.toUpperCase()
    const getTemper = Math.round(data.main.temp);
    const getDescription = data.weather[0].description;
    addHtml.insertAdjacentHTML("beforeend",
      `<div class='weather-data'>
        <div class='data'>
          <h2 id="city-title">${upperCaseCity}</h2>
          <h2 id="temper">${getTemper}<span id="cel">°</span></h2>
        </div>
        <div class='data'>
          <p>${getDescription}</p>
        </div>
      </div>
      <div id="date">
        <h3>${todayDate}</h3>
        <h3>${timeNow}<h3>
      </div>`
    );
    if (addHtml.innerText !== '') {
      document.querySelector('.large-screen-home-content').style.display = 'none'
    }
    if (getTemper < 21 && timeNow >= '20:00'  && timeNow < '23:00') {
      background.removeAttribute('class')
      background.classList.add('background-mountains')
    } else if (getTemper < 21 && timeNow < '20:00') {
      background.removeAttribute('class')
      background.classList.add('background-cold-day')
    } else if (getDescription.includes('rain')) {
      background.removeAttribute('class')
      background.classList.add('background-rain')
    } else if (getTemper >= 21 && timeNow < '20:00') {
      background.removeAttribute('class')
      background.classList.add('background')
    } else if (timeNow >= '23:00' && timeNow <= '6:00') {
      background.removeAttribute('class');
      background.classList.add('background-night')
    }
  });
}