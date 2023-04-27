$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
    setTimeout(type, 0);
});

var p = document.querySelector('.typed-text');
p.innerHTML = '';
var n = 0;
var str = 'Embedded System Enthusiast';
function type(){
var typeTimer = setInterval(function() {
  n = n + 1;
  p.innerHTML = str.slice(0, n);
  if (n === str.length) {
    clearInterval(typeTimer);
    p.innerHTML = str;
    n = 0;
    setInterval(function() {

      if (n === 0) {
        p.innerHTML =str + "_"
        n = 1;
      } else {
        p.innerHTML = str
        n = 0;
      };
    }, 500);
  };
}, 150)
}

$('.navbar-nav li a').on('click', function(){
  if(!$( this ).hasClass('dropdown-toggle')){
      $('.navbar-collapse').collapse('hide');
  }
});

const count = document.getElementById("count");

incrementVisitsCount();

function incrementVisitsCount() {
    let visits;

    if (!localStorage.getItem("visits")) localStorage.setItem("visits", 1);
    else {
        visits = +localStorage.getItem("visits");
        const incrementedCount = visits + 1;

        localStorage.setItem("visits", incrementedCount);
    }

    count.innerText = localStorage.getItem("visits");
}

particlesJS.load('particles-js', 'particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});