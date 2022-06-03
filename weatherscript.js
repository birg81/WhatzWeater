'use strict';

const whatWeatherData = async () => {
/***
After register your account on https://openweathermap.org
write into apiKey string your personal secret app id key.
Without this code, this WebApp doesn't work!!
***/
	const apiKey = '<write here your personal AppID key';

	const urlQueryStr =
		'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=it';

	const city =
		encodeURI(
			document.querySelector('#searchBox')
				.value
				.trim()
				.toLowerCase()
		);
	if(city.length > 3)
		await fetch(`${urlQueryStr}&q=${city}&appid=${apiKey}`)
			.then(res => res.json())
			.then(d => drawWeather(d))
			.catch(e => alert(`${decodeURI(city)} non trovato`));
};

const drawWeather = (data) => {
	document
		.querySelector('#printHere')
		.innerHTML =
			`
<table class="table table-borderless">
<tr>
<td>${new Date(data.dt * 1000).toLocaleDateString("it")}</td>
</tr>
<tr><td>${data.name} (${data.sys.country})</td></tr>
<tr><td>lat: ${data.coord.lat} | long: ${data.coord.lon}</td></tr>
<tr><td>${new Date(data.dt * 1000).toLocaleTimeString("it")}</td></tr>
<tr>
<td rowspan="2">${Math.round(data.main.feels_like)} &#x2103;</td>
<td>${Math.round(data.main.temp_max)} &#x2103;</td>
</tr>
<tr>
<td>${Math.round(data.main.temp_min)} &#x2103;</td>
</tr>
<tr>
<td>
<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
</td>
</tr>
<tr>
<td  rowspan="2">${data.weather[0].description}</td>
<td>${new Date(data.sys.sunrise * 1000).toLocaleTimeString("it")}</td>
</tr>
<tr>
<td>${new Date(data.sys.sunset * 1000).toLocaleTimeString("it")}</td>
</tr>
</table>
			`;
};