const request = require("request");

const { MAPBOX_KEY } = process.env;

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_KEY}&limit=1&language=ru`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Не удается подключиться к серверу!", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Не удалось определить местоположение, попробуйте еще раз",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
