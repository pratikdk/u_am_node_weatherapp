const request = require("request");

// const geocode = (address, callback) => {
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2ZvcmN6eiIsImEiOiJja3V6am1lczcycjVqMnZsbmNkdXl5Zmt3In0.qx0fmTgxI9zsP7bNOXAPBg&limit=1`;

//     request(url, {json: true}, (error, response) => {
//         if (error) {
//             callback("Unable to connect to mapping service", undefined);
//         } else if (response.statusCode != 200) {
//             callback("Incorrect request to mapping service", undefined);
//         } else {
//             const data = response.body;
//             callback(undefined, {
//                 longitude: data.features[0].center[0],
//                 latitude: data.features[0].center[1],
//                 location: data.features[0].place_name
//             });
//         }
//     });
// }

// module.exports = geocode;


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`;

    request(url, {json: true}, (error, { body }) => {
        console.log("DUMP 1 ----- ", error);
        console.log("DUMP 2 ----- ", body);
        if (error) {
            callback("Unable to connect to mapping service", undefined);
        } else if (body.features.length == 0) {
            callback("Incorrect request to mapping service", undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;