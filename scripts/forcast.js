// const apiKey = 'wmYzR5VxAIeq0Abtoz6neBsJWUv9uznV'

// async function getCity(city) {
//     let baseurl = 'http://dataservice.accuweather.com/locations/v1/cities/search'
//     let query = `?apikey=${apiKey}&q=${city}`
//     let rawResponse = await fetch(baseurl + query)
//     let response = await rawResponse.json()
//     return response[0]
// }

// async function getWeather(cityKey) {
//     let baseurl = 'http://dataservice.accuweather.com/currentconditions/v1/'
//     let query = `${cityKey}?apikey=${apiKey}`
//     let rawResponse = await fetch(baseurl + query)
//     let response = await rawResponse.json()
//     return response[0]
// }

class Forecast {
    constructor() {
        this.key = 'wmYzR5VxAIeq0Abtoz6neBsJWUv9uznV'
        this.cityUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search'
        this.weatherUrl = 'http://dataservice.accuweather.com/currentconditions/v1/'
    }
    async getCity(city) {
        let query = `?apikey=${this.key}&q=${city}`
        let rawResponse = await fetch(this.cityUrl + query)
        let response = await rawResponse.json()
        return response[0]
    }
    async getWeather(cityKey) {
        let query = `${cityKey}?apikey=${this.key}`
        let rawResponse = await fetch(this.weatherUrl + query)
        let response = await rawResponse.json()
        return response[0]
    }
    async updateCity(city) {
        const cityDetails = await this.getCity(city)
        const weather = await this.getWeather(cityDetails.Key)
        return { cityDetails, weather }
    }
}