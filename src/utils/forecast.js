const request = require('request')

const forecast = (latitude, longitude, units, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=de55d6739e36e39a942869cbd3ba92d8&query='+ encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)+'&units='+ encodeURIComponent(units)

    request({url, json:true},(error, {body}) => {
        if(error){
            callback('Unable to connect to weather services.', undefined)
        } else if(body.error){
            callback('Unable to find forecast for current location.', undefined)
        } else {
            callback(undefined, {
                forecast: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast