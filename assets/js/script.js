const citySearch = $("#citySearch");
var unixFormat = moment.unix("1318781876").format("MM/DD/YYYY hh:mm:ss");

function formatDateTime(date) {
  return moment.unix(date).format("MM/DD");
}

function weatherRender(dataObject) {
  let userInput = $("#citySearchInput").val();

  let url = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput},3166&limit=1&appid=672266a91a312a90b7a1ac1d050f39ca`;

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
      $("<div>", { class: "card" })
        .append(
          $("<img>", {
            src: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
            alt: "icon",
            class: "card-img-top",
          })
        )
        .append("<div>", { class: "card-body" })
        .append($("<h5>", { class: "card-title" }).text(formatDateTime(day.dt)))
        .append("<div>", { class: "card-text" })
        .append(
          $("<ul>", { class: "list-group list-group-flush" }).append(
            $("<li>", { class: "list-group-item" }).html(
              `Temp: ${day.temp.day}°`
            )
          )
        )
        .append(
          $("<li>", { class: "list-group-item" }).html(
            `Humidity: ${day.humidity}%`
          )
        )
        .append(
          $("<li>", { class: "list-group-item" }).html(
            `Wind Speed: ${day.wind_speed}`
          )
        )
        .append($("<li>", { class: "list-group-item" }).html(`UVI: ${day.uvi}`))
    );

    //     function checkUVI(value) {
    //       let uvIndex = day.uvi;
    //       console.log(uvIndex);

    //       if (value <= 3) {
    //         return "favorable";
    //       } else if (value <= 5) {
    //         return "moderate";
    //       } else {
    //         return "severe";
    //       }
    //     }
    //     checkUVI();
  });
}

// let temp = daily[i].temp;
// let humidity = daily[i].humidity;
// let windSpeed = daily[i].wind_speed;
// let uvIndex = daily[i].uvi;

citySearch.on("click", weatherRender);
