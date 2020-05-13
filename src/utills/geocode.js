const request = require('postman-request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW5pc2hhbnRoMDIiLCJhIjoiY2thM2ZzMjZ6MDJ3aDNtb2F3eTBtMGQ0ZSJ9.XoAAkYjwhkEpegGTW3l_CQ&limit=1';

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            console.log('Unable ot connect to the API');
            callback(error, undefined);
        } else if (body.features.length === 0) {
            console.log('In valid Location')
            callback("Invalid Location", undefined);
        }
        else {
            const long = body.features[0].center[0];
            const latt = body.features[0].center[1];
            //console.log(long, latt);
            const data = {
                long,
                latt
            }
            callback(null, data);
        }
    });
}

module.exports = geocode;