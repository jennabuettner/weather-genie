const citySearch = $("#citySearch");
let cardsContainer = $(".five-day-forecast-container");
let dayCard = $(".card");

function weatherRender(dataObject) {
  let userInput = $("#citySearchInput").val();

  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput},3166&limit=1&appid=672266a91a312a90b7a1ac1d050f39ca`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // dataGrabber(data.response)});
      console.log(data);

      let latitude = data[0].lat;
      let longitude = data[0].lon;

      getWeatherData(latitude, longitude);
    });
}

function getWeatherData(latitude, longitude) {
  let weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly&appid=672266a91a312a90b7a1ac1d050f39ca`;
  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderForecastCards(data.daily);
    });
}

function renderForecastCards(days) {
  days.forEach((day) => {
    $(".five-day-forecast-container").append(
      $("<div>", { class: "card" }).append("<img>", {
        src: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
        alt: "icon",
      })
    );
  });
}

citySearch.on("click", weatherRender);

function displayResults() {
  $(dayCard).append(data.daily[0].dt);
}
