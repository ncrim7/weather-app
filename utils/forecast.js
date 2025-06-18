const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c5265b9db09272dc667b39f678ef24fa&query=${latitude},${longitude}`;
  
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Bağlantı hatası!', undefined);
    } else if (body.error) {
      callback('Konum bulunamadı!', undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        yagis: body.current.precip,
        description: body.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = forecast;