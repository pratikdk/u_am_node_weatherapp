const request = require("request");
require("dotenv").config();

// const forecast = (longitude, latitude, callback) => {
//     const url = `http://api.weatherstack.com/current?access_key=af4f1d734ff886978eb3a3d29f17f839&query=${longitude},${latitude}`;

//     request(url, {json: true}, (error, response) => {
//         if (error) {
//             console.log("Unable to connect to forcasting service.");
//         } else if (response.statusCode !== 200) {
//             console.log("Incorrect request to forcasting service.");
//         } else {
//             const data = response.body;
//             const message = `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out.`;
//             callback(undefined, message);
//         }
//     })
// }


const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${latitude},${longitude}`;

    request(url, {json: true}, (error, { body, statusCode }) => {
        if (error) {
            console.log("Unable to connect to forcasting service.");
        } else if (body.error) {
            console.log("Incorrect request to forcasting service.");
        } else {
            const message = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`;
            callback(undefined, message);
        }
    })
}


module.exports = forecast;