var offset = 0;
let weather = {
  apiKey: "0776477a4d15f54d82e4c105f937e4d4",
  weatherRequest: function(city){
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((res) => {
        if (!res.ok) {
          alert("No results that match the query");
          throw new Error("No results that match the query.");
        }
        return res.json();
      })
      .then((data) => this.showWeather(data));
  },
  search: function () { this.weatherRequest(document.querySelector(".search-bar").value); },
  showWeather: (res) => {
    const { name } = res;
    const { icon, description } = res.weather[0];
    const { temp, humidity } = res.main;
    const { speed } = res.wind;
    offset = res.timezone;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + name + "')";
    document.querySelector(".map").src = "https://maps.google.com/?ll=" + res.coord.lat + "," + res.coord.lon + "&z=8&t=k&output=embed";
    showTime();

  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        weather.search();
      }
    });

weather.weatherRequest("Seoul");

function showTime(){
  var date = new Date();
  var h = date.getUTCHours() + offset / 3600; // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";;
  
  if(h == 12){
    session = "PM";
  }

  if(h == 24){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("ClockDisplay").innerText = time;
  document.getElementById("ClockDisplay").textContent = time;
  
  setTimeout(showTime, 1000);
  
}


