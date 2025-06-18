/*const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://us1.locationiq.com/v1/search?key=pk.f4dc90b662b9e06ada47ad2af6affcfd&q=${encodeURIComponent('Antalya')}&format=json&limit=1`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Bağlantı hatası!', undefined);
    } else if (body.error) {
      callback('Konum bulunamadı!', undefined);
    } else {
      callback(undefined, {
        latitude: body[0].lat,
        longitude: body[0].lon,
        location: body[0].display_name,
      });
    }
  });
};

module.exports = forecast;
*/

const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://us1.locationiq.com/v1/search?key=pk.f4dc90b662b9e06ada47ad2af6affcfd&q=' + encodeURIComponent(address) + '&format=json&limit=1'
    request({ url, json:true }, (error, response, body) => {
        if(error){
            callback('İnternet bağlantısını kontrol ediniz.', undefined)
        } else if(body.error){
            callback('URL bilgilerini kontrol ediniz.', undefined)
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].display_name
            })
        }
    })
}

module.exports = geocode