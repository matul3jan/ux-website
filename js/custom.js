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

const form = document.getElementById('subscribe-form');
const popup = document.getElementById('popup');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent default form submission behavior

    // show the popup message
    popup.style.display = 'block';

    // reset the form
    form.reset();

    // hide the popup message after 3 seconds
    setTimeout(function () {
        popup.style.display = 'none';
    }, 3000);
});
