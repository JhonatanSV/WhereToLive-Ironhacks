var map;
function onGoogleMapResponse(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 11
    });

      marker = new google.maps.Marker({
          map: map,
          draggable: true,
          animation: google.maps.Animation.BOUNCE,
        icon:"https://img.icons8.com/bubbles/45/000000/graduation-cap.png",
          position: {lat: 40.7291, lng: -73.9965}
        });

}



  
