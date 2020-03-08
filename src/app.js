const path = require("path");
const hbs = require("hbs");
const express = require("express");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const { PORT = 3000 } = process.env;

const app = express();

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Устанавливаем Handlebars в качестве движка представлений
// Указываем путь до папки с представлениями
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Раздаем статику
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Погода",
    name: "Игорь"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Обо мне",
    name: "Игорь"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Помощь",
    message: "Страничка помощи",
    name: "Игорь"
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Статья не найдена",
    name: "Игорь"
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(404).send({
      error: "Укажите адрес поиска"
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.status(200).send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get("/products", (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.send({
      error: "Нужно указать что искать"
    });
  }

  res.send({
    products: []
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Страница не найдена",
    name: "Игорь"
  });
});

app.listen(PORT, () => {
  console.log(`Сервер слушает ${PORT} порт.`);
});
