$(document).ready(function () {

  function searchVideo(q, maxResults) {
    var data = {
      maxResults : 100,
      key : "AIzaSyDbBlVYr2wRj3G60peCgHpBS6ZFiQn3Ddk",
      part : "snippet",
      q : q,
      type : "video"
    }

    $.getJSON("https://www.googleapis.com/youtube/v3/search", data, function (res) {
      $("#video-list .video").remove();
      $(res.items).each(function () {
        console.log(this);
        var thumbnail = this.snippet.thumbnails.high.url;
        var title = this.snippet.title;
        var description = this.snippet.description;
        var id = this.id.videoId;
        var video = $('<div class="video row" data-video-id="' + id + '" style = " padding: 10px;   border-bottom: 1px solid #ccc;cursor: pointer; " > <div class="thumbnail col-lg-5 col-md-5 col-sm-5 col-12"> <img src="' + thumbnail + '" alt="Thumbail" style=" display: inline-block;   width: 100%;        "> </div><div class="video-info col-lg-7 col-md-7 col-sm-7 col-7" style=" padding-left: 7px !important;"> <h3 style=" font-size: 15px;font-weight: bold;">' + title + '</h3> <div class="description" style=" font-size: 12px; color: #5d5d5d"> <p>' + description + '</p></div></div></div>');
        $("#video-list").append(video);
      });
    });
  }

  $("#desplegar").on("click", function () {
    $("#description").toggle();
  });

  $("#Buscador").on("submit", function (e) {
    e.preventDefault();
    var q = $("#q").val();
    if (q == "") {
      alert("¡Escribe algo para buscar!");
    }
    else {
      searchVideo(q, 5);
      $("#q").val("");
    }
  });

  $(document).on("click", ".video", function () {
    var urlBase = "https://www.youtube.com/embed/";
    var videoId = $(this).attr("data-video-id");
    var video = urlBase + videoId;
    $("iframe").attr("src", video);
  });

});
