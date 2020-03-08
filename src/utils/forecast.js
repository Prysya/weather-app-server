const request = require("request");

const { DARKSKY_KEY } = process.env;

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${DARKSKY_KEY}/${latitude},${longitude}?lang=ru&units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Не удается подключиться к серверу!", undefined);
    } else if (body.error) {
      callback(
        "Не удалось определить местоположение, попробуйте еще раз",
        undefined
      );
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} Сейчас ${body.currently.temperature} градусов. Шанс что пойдет дождь ${body.currently.precipProbability}%.`
      );
    }
  });
};

module.exports = forecast;
