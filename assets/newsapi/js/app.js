$(document).ready(function () {

  let url = "https://newsapi.org/v2/everything?q=(anime OR VLSI OR iot)&language=en&apiKey=f61d41c7fc80416582e9ae12f4db92b8";
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        
        // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  $.ajax({
    url: url,
    method: "GET",
    dataType: "JSON",

    beforeSend: function () {
      $(".progress").show();
    },

    complete: function () {
      $(".progress").hide();
    },

    success: function (newsdata) {
      let output = "";
      let latestNews = newsdata.articles;
      latestNews = shuffle(latestNews);
      for (var i in latestNews) {
        output += `
          <div class="col l3 m6 s12">
          <div class="card medium hoverable">
            <div class="card-image">
              <img src="${latestNews[i].urlToImage}" class="img-fluid" alt="${latestNews[i].title}">
            </div>
            <div class="card-content">
              <span class="card-title activator"><i class="material-icons right">more_vert</i></span>
              <h6 class="truncate">Title: <a href="${latestNews[i].url}" title="${latestNews[i].title}">${latestNews[i].title}</a></h6>
              <p><b>Author</b>: ${latestNews[i].author} </p>
              <p><b>News source</b>: ${latestNews[i].source.name} </p>
              <p><b>Published</b>: ${latestNews[i].publishedAt} </p>
            </div>

            <div class="card-reveal">
              <span class="card-title"><i class="material-icons right">close</i></span>
              <p><b>Description</b>: ${latestNews[i].description}</p>
            </div>

            <div class="card-action">
              <a href="${latestNews[i].url}" target="_blank" class="btn">Read More</a>
            </div>
           </div>
          </div>
        `;
      }

      if (output !== "") {
        $("#newsResults").html(output);
      }

    },
    
    error: function () {
      let errorMsg = `<div class="errorMsg center">Some error occured</div>`;
      $("#newsResults").html(errorMsg);
    }
  })

});

function checkInput() {
  var query = document.getElementById('search').value;
  window.find(query);
}