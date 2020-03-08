const weatherForm = document.querySelector(".wrapper__form");
const address = document.querySelector(".wrapper__type");
const message = document.querySelector(".wrapper__message");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();

  address.textContent = "Поиск...";
  message.textContent = "";

  const location = event.currentTarget.elements.location.value;

  fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        address.textContent = "Ошибка";
        message.textContent = res.error;
      } else {
        address.textContent = res.location;
        message.textContent = res.forecast;
      }
    })
    .catch(err => console.log(err));
});
