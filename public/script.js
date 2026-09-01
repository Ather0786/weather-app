const search = document.querySelector("#search");
async function getLocation(city) {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );
        const data = await response.json();
        //console.log(data);
        const place = data.results[0];
        let a = place.latitude;
        let b = place.longitude;
        let res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${a}&longitude=${b}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`)
        let da = await res.json();
        //console.log(da.current);
        document.querySelector("#location").innerHTML = place.name;

        document.querySelector("#temperature").innerHTML =
            `Temperature: ${da.current.temperature_2m} °C`;

        document.querySelector("#humidity").innerHTML =
            `Humidity: ${da.current.relative_humidity_2m}%`;

        document.querySelector("#wind").innerHTML =
            `Wind: ${da.current.wind_speed_10m} km/h`;
    }
    catch (error) {
        console.log('Something went Wrong:', error);
    }

}
search.addEventListener("click", () => {
    const city = document.querySelector("#city").value;
    getLocation(city);
});