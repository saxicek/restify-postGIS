// convert Google Maps into an AMD module
// http://blog.millermedeiros.com/requirejs-2-0-delayed-module-evaluation-and-google-maps/
define('gmaps', ['async!http://maps.google.com/maps/api/js?v=3'],
  function(){
    // return the gmaps namespace for brevity
    return window.google.maps;
  });
