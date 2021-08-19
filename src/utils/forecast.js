const request = require('request')

const forecast = (lat, long, location, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=65fa14458f9f02fef0d4e381633b42d6&query=' + long + ',' + lat + '&units=f'

  //Deconstruct the response returned to only the body section and use shorthand notation for url: url

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback(body.error.info, undefined)
    } else {
      if (body.current.temperature === body.current.feelslike) {
        callback(undefined, 'It is currently ' + body.current.temperature + ' degrees')
      } else {
        callback(undefined, 'It is currently ' + body.current.temperature + ' degrees but feels like ' + body.current.feelslike + ' degrees')
      }

    }
  })
}

module.exports = forecast
