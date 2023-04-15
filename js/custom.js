// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

/** google_map js **/

function myMap() {
    document.addEventListener('DOMContentLoaded', function () {
        var el = document.getElementById("googleMap");
        if (el) {
            new google.maps.Map(el, {
                center: new google.maps.LatLng(40.712775, -74.005973),
                zoom: 18,
            });
        }
    });
}