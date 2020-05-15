const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')
const forecast = new Forecast()

// async function updateCity(city) {
//     const cityDetails = await getCity(city)
//     const weather = await getWeather(cityDetails.Key)
//     return { cityDetails, weather }
// }

async function updateUI(data) {
    console.log(data)
    const { cityDetails, weather } = data
    //update weather details
    details.innerHTML = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`
    //Display weather 
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
    //update images and icon
    let weatherImg = null
    weather.IsDayTime ? weatherImg = 'img/day.svg' : weatherImg = 'img/night.svg'
    time.setAttribute('src', weatherImg)
    let weatherIcon = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', weatherIcon)

}

cityForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let city = cityForm.city.value.trim()
    localStorage.setItem('city', city)
    cityForm.reset()
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error))
})

if (localStorage.city) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(error => console.log(error))
}