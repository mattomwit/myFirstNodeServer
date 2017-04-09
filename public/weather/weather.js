    var $body = $('body');
    var $city = $('#city');
    var $country = $('#country');
    var $weatherType = $('#weatherType');
    var $humidity = $('#humidity');
    var $pressure = $('#pressure');
    var $cloudCoverage = $('#cloudCoverage');
    var $temp = $('#temp');  //temperature
    var $dataHolder = $('#dataHolder');
    var $weatherIcon = $('#weatherIcon');
    var currentTempType ="kelvin";
    var $searchInput = $('#searchInput');
    var $searchHistory = $('#searchHistory');  //search history will be stacked here
    var weatherUrl =""; 
    var backgroundLinksReference ={
        'def' : "http://weknowyourdreams.com/images/cloud/cloud-06.jpg",
        '01n' : "https://hughsblog.files.wordpress.com/2010/08/img_3298.jpg",
        '01d' : "http://cdn.innovativelanguage.com/wordlists/media/thumb/9192_fit512.jpg",
        '02d' : "https://s-media-cache-ak0.pinimg.com/736x/ae/d3/72/aed3729821b519a1e4d0907c81fc1e1a.jpg",
        '02n' : "https://s-media-cache-ak0.pinimg.com/originals/64/51/dd/6451ddd138554e83483a505798b2e457.jpg",
        '03d' : "https://c1.staticflickr.com/3/2106/1909487867_de140c7eb8_b.jpg",
        '03n' : "http://il6.picdn.net/shutterstock/videos/6685871/thumb/1.jpg",
        '04n' : "http://www.troyjohnstone.com/astrophotography/images/sky_clouds_night_moon_2006_09_09_04.jpg",
        '04d' : "http://danwrayphoto.com/wp-content/uploads/2014/06/WRA4814.jpg",
        '09d' : "https://cdn.empowernetwork.com/user_images/post/2014/03/29/9/73/5b12/540x293_20140329_9735b12e909f88d550031c5218024768_png.png",
        '09n' : "https://rayli.net/blog/wp-content/uploads/2012/03/rain_floor-1.jpg",
        '10d' : "http://bestanimations.com/Nature/Water/rain/rain-nature-animated-gif-17.gif",
        '10n' : "http://bestanimations.com/Nature/Water/rain/rain-nature-animated-gif-17.gif",
        '11d' : "http://www.peacepond.com/Lightning.jpg",
        '11n' : "http://www.peacepond.com/Lightning.jpg",
        '13d' : "https://images.apester.com/user-images%2Fe4%2Fe4f6a167014b67db349df2a8ee0ed50b.jpg/",
        '13n' : "https://s-media-cache-ak0.pinimg.com/originals/a3/7c/f4/a37cf443355aea6768b34ecc28d2a762.jpg",
        '50n' : "https://s-media-cache-ak0.pinimg.com/736x/cc/38/f2/cc38f2027f1c481c8c4832c6c0354858.jpg",
        '50d' : "http://vignette1.wikia.nocookie.net/demigodshaven/images/f/f5/Mist.jpg/revision/latest?cb=20110102163040"
    };

    function getKelvin(stringNumber){
        if (currentTempType == "kelvin"){
            stringNumber = Math.round(parseInt(stringNumber));
        }else if(currentTempType == "celsius"){
            stringNumber = Math.round(parseInt(stringNumber)+273.15);
        }else if(currentTempType == "fahrenheit"){
            stringNumber = Math.round((parseInt(stringNumber)+459.67)*5/9);       
        }
        currentTempType ="kelvin";
        return stringNumber+" &#8490";
    }

    function getCelsius(stringNumber){
        if (currentTempType == "kelvin"){
            stringNumber = Math.round(parseInt(stringNumber)-273.15);
        }else if(currentTempType == "celsius"){
            stringNumber = Math.round(parseInt(stringNumber));
        }else if(currentTempType == "fahrenheit"){
            stringNumber = Math.round((parseInt(stringNumber)-32)*5/9);
        }
        currentTempType ="celsius";
        return stringNumber+" &#8451";
    }

    function getFahrenheit(stringNumber){
        if (currentTempType == "kelvin"){
            stringNumber = Math.round((parseInt(stringNumber)*9/5)-459.67);
        }else if(currentTempType == "celsius"){
            stringNumber = Math.round((parseInt(stringNumber)*9/5)+32);
        }else if(currentTempType == "fahrenheit"){
            stringNumber = Math.round(parseInt(stringNumber));
        }
        currentTempType ="fahrenheit";
        return stringNumber+" &#8457";
    }

    function setBacgroundAndIcon(iconString){ 
        var imgUrl=backgroundLinksReference[iconString];
        $weatherIcon.attr('src',"http://openweathermap.org/img/w/"+iconString+".png");
        $body.fadeOut("slow", function(){
            $body.css("backgroundImage",'url('+imgUrl+')');//if icon string == give link to background
            $body.fadeIn("slow");
        });
    }

    var addSearchHistory = function (){
        $searchHistory.prepend('<div class="btn list-group-item text-center">'+$city.html()+' '+$temp.html()+'</div>');
    }

    function getWeatherByCoords(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude + "&lon=" + position.coords.longitude+"&appid=bd3e7e4dfbdbeec95be9caae99588042"; 
                getWeather();         
            }); 
        }else{ //TO DO
            $dataHolder.fadeOut("slow", function(){
                $city.html("Could not get geolocation. Try searching with city name.");
                $dataHolder.css("visibility", "visible");
                $dataHolder.fadeIn("slow");
            });
        }
    }

    function getWeather(){
        $.ajax({type: 'GET', dataType: 'json', url: weatherUrl, success: function(data){
            $dataHolder.fadeOut("slow", function(){
                $dataHolder.css("visibility", "hidden");
                $city.html(data["name"]);
                $country.html(data["sys"]["country"]);
                $weatherType.html(data["weather"][0]["description"]);
                $humidity.html(data["main"]["humidity"]+"%");
                $pressure.html(data["main"]["pressure"]+"hPa");
                $temp.html(getKelvin(data["main"]["temp"]));
                $cloudCoverage.html(data["clouds"]["all"]+"%");
                setBacgroundAndIcon(data["weather"][0]["icon"]);
                addSearchHistory();
                $dataHolder.css("visibility", "visible");
                $dataHolder.fadeIn("slow");   
            });
        }
        });
    }


//called after page finishes loading
$(document).ready(function() {

    getWeatherByCoords();

    $('#celsius').click(function(){
        $temp.html(getCelsius($temp.html()));
    });
    $('#kelvin').click(function(){
        $temp.html(getKelvin($temp.html()));
    });  
    $('#fahrenheit').click(function(){
        $temp.html(getFahrenheit($temp.html()));
    });
    $('#searchBtn').click(function(){
        currentTempType ="kelvin";
        weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="+$searchInput.val()+"&appid=bd3e7e4dfbdbeec95be9caae99588042"; 
        getWeather();
        $searchInput.val("");
    });
});

/*
api.openweathermap.org/data/2.5/weather?q=     {CityName}
{}
*/