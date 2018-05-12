$(document).ready(function(){
	$('.short').hide();
	
	if(navigator.geolocation){
		var CurrentPosition='';
		navigator.geolocation.getCurrentPosition(function(position){
			CurrentPosition=position;
			//console.log(CurrentPosition);

			//getting the latitude and longitude from the object

			var latitude=CurrentPosition.coords.latitude;
			var longitude=CurrentPosition.coords.longitude;
			//console.log(latitude);
			//console.log(longitude);

			//integrating the API

			var url='http://api.apixu.com/v1/current.json?key=c53e56f2c83f4cdab20205959180705&q=';
			$.getJSON(url + latitude + ',' +longitude, function(data){ 
				console.log(data);

				var data=JSON.stringify(data); //it turns JS Objectrs into JSON text and stores into String
				var json=JSON.parse(data);// it turns JSON text into JS 
				// getting DATA
				var country=json.location.country;
				var city=json.location.name;
				var state=json.location.region;

				var temp=json.current.temp_c;
				var temp_f=json.current.temp_f;
				var last_updated=json.current.last_updated.replace('-',' ');

				var wind=json.current.wind_kph;
				var humidity=json.current.humidity;
				var time=json.location.localtime.split(' ')[1];
				var cloud=json.current.cloud;

				$('#weather').html(city +','+ state+ ','+country);

				
				$('#info1').html(time);
				$('#info2').html('Wind ' + wind + ' kmph');
				$('#info3').html(temp + '&#8451'); //Symbol for degree Celcius is &#8451
				$('.short').show();
				//toggle Temperature
				var toggle=true;
				$('#switch').on('click',function(){
					if(toggle){
						$('#info3').html(temp_f + '&#8457');
						$('#switch').html('Temp in Celcius');
						toggle=false;
					}
					else{
						$('#info3').html(temp + '&#8451');
						$('#switch').html('Temp in Farhenhiet');
						toggle=true; 
					}
				});


				//cloud status
				if(cloud<30){
					$('#info5').html('Clear Sky');
				}
				else{
					$('#info5').html('Cloudy Sky');
				}

				$('#info6').html('humidity: '+ humidity + '%');


				if(temp>18 && temp < 28){

					$('.grey-jumbo').css({
						"background-image":"url(https://pixabay.com/get/ea36b40e2ef1023ed1584d05fb0938c9bd22ffd41cb3174094f6c17da3/mountain-3351653_1280.jpg)"
					});
					$('.text1').html('It is a sunny day');
				}
				else if(temp<15){
					$('.grey-jumbo').css({
						"background-image":"url(https://pixabay.com/get/ea36b70c21f7033ed1584d05fb0938c9bd22ffd41cb3174094f8c97ea1/agriculture-3363932_1280.jpg)"
					});
					$('.text1').html('It is a Cloudy day');
				}
				else if(temp > 30){
					$('.grey-jumbo').css({
						"background-image":"url(https://pixabay.com/get/ea36b60b28f1063ed1584d05fb0938c9bd22ffd41cb3174094f8c870a6/turkey-3374057_1280.jpg)"
					});
					$('.text1').html('It is a bright day');
				}

			});

		});
	}

});


//http://api.apixu.com/v1/current.json?key=c53e56f2c83f4cdab20205959180705