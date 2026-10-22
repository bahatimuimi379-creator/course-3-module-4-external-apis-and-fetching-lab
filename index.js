// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=OK"

// Your code here!
let user_input = document.querySelector(`#state-input`)
const fetch_alerts = document.querySelector(`#fetch-alerts`)


let STATE_ABBR = "" // use OK as sample abbreviation

fetch_alerts.addEventListener(`click`, () => {
    STATE_ABBR = user_input.value.trim().toUpperCase()
    fetchWeatherAlerts(STATE_ABBR)
    user_input.value = ''
})

function fetchWeatherAlerts(state){

    const error_message = document.querySelector(`#error-message`)
    
    STATE_ABBR = state
    fetch(`https://api.weather.gov/alerts/active?area=${STATE_ABBR}`)
    .then(res => {
        if (!res.ok) {
            throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }
        return res.json()
        })
    .then(data => {
        displayAlerts(data)
        error_message.textContent = ``
        error_message.classList.add("hidden")
    })
    .catch((error) => {
        error_message.classList.remove("hidden")
        error_message.innerHTML = `
             <p> ${error.message} </p>
        `
    })   
}

function displayAlerts(data){
    
    const alerts_div = document.querySelector(`#alerts-display`)

    alerts_div.innerHTML = `
        <h1> ${data.title} : ${data.features.length} </h1>
    `

    data.features.forEach(element => {
        alerts_div.innerHTML += `
        <p> ${element.properties.headline} </p>
    `
    })
    
}