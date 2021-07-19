const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWl0eW1pa2UxMSIsImEiOiJja3FoZmRtbGowMW40MnZwYnN2anJ2Z2FhIn0.o6z9ISTNZz_4OJuxA3u5og&limit=1&language=en'

  //Deconstructing the response returned to only the body section and using shorthand notation for url: url

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to the location services!', undefined)
    } else if (body.message) {
      callback(body.message, undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location, try a different search', undefined)
    } else {
      const latitude = body.features[0].center[0]
      const longitude = body.features[0].center[1]
      const location = body.features[0].place_name

      //Using shorthand for the latitude, longitude, and location key-value pairs

      callback(undefined, {
        latitude,
        longitude,
        location
      })
    }
  })
}

module.exports = geocode
