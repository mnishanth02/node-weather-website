const request = require('postman-request');

const getforecast = ({ latt, long }={}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6ae48c43b1ffcf98632f26eabcf5f56d&query=' + latt + ',' + long;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            console.log('Unable ot connect to the API')
            callback(error, undefined);
        } else if (body.error) {
            console.log('Location not found');
            callback(body.error, undefined)
        }
        else {
            //console.log(body);
            const summary = ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.';
            const data = {
                summary,
                location: body.location.name + ', ' + body.location.region + ', ' + body.location.country,
            }
            callback(undefined, data);
        }
    });
}

module.exports = getforecast;