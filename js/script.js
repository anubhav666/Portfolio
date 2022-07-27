$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});

function checkInput() {
    var query = document.getElementById('search').value;
    window.find(query);
}