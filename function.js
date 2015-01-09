
(function () {

	var app = angular.module("weatherForecast", []);

	app.controller("PlaceWeatherFinder", ["$http", function($http) {
	
		//initialization
		var WeatherFinder = this;
		this.tab = 1;
		this.unit = "imperial";
		this.NumberDay = "1";
		this.language = "en";
		this.forecast = [];

		//function which sets the mode
		this.isSet = function(val){
			return this.tab === val;
		};

		//function that switches from name and country mode to geographic coordinates mode
		this.setTab = function(switchMode){
			this.tab = switchMode;
		};
		
		// Weather forecast search
		this.submitForecast = function(query) {
			// Weather forecast by city and country
			if (WeatherFinder.tab === 1 &&  typeof query.name !== "undefined" && query.name !== "") {
					var querynameSearch = query.name;
					if (typeof query.country !== "undefined" && query.country !== "") {
						querynameSearch += ',' + WeatherFinder.country;
					}
					// Returns current weather
					$http.get("http://api.openweathermap.org/data/2.5/weather", {
						params: {
							q: querynameSearch,
							units: WeatherFinder.unit,
							lang: WeatherFinder.language
						}})
						.success(function(data) {
							WeatherFinder.nameResults = data.name;
							WeatherFinder.unitResults = WeatherFinder.unit;
							WeatherFinder.currentWeather = data;
						});
					// Returns weather forecast according to the number of days filled in the form
					$http.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
						params: {
							q: querynameSearch,
							units: WeatherFinder.unit,
							cnt: WeatherFinder.NumberDay,
							lang: WeatherFinder.language
						}})
						.success(function(data) {
							WeatherFinder.forecast = data.list;
						});
			// Weather forecast by geographic coordinates
			} else if (WeatherFinder.tab === 2 && typeof query.lat !== "undefined" && typeof query.lon !== "undefined") {
				// Returns current weather
				$http.get("http://api.openweathermap.org/data/2.5/weather", {
					params: {
						lat: query.lat,
						lon: query.lon,
						units: WeatherFinder.unit,
						lang: WeatherFinder.language
					}})
					.success(function(data) {
						WeatherFinder.nameResults = data.name;
						WeatherFinder.unitResults = WeatherFinder.unit;
						WeatherFinder.currentWeather = data;
					});
				// Returns forecast
				$http.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
					params: {
						lat: query.lat,
						lon: query.lon,
						units: WeatherFinder.unit,
						cnt: WeatherFinder.NumberDay
					}})
					.success(function(data) {
						WeatherFinder.forecast = data.list;
					});
			}
		};
	}]);
})();
