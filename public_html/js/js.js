var almacen=""; //Save the result while next is not null
function request (url,format) {
  $.ajax({
    url: url
  }).success(function(response){
      if (format === "format_artists"){
          format_artists(response);
      }else if (format === "format_albums"){
          format_albums(response);
      }else{
          format_tracklist(response);
      }   
  });
};
/*
function format_artists (response){
     //var artists = response.artists; //Save all artists object in var artists
      var result="";
      var next = response["artists"]["next"];
      for (var i=0; i< response["artists"]["items"].length; i++){
          var artist = response["artists"]["items"][i]; //save a artists object in a var artist
          var name = artist.name; //save the name
          var id = artist.id;
          var images = ""; //save images
          if (artist.images.length === 0){
              images = "./images/default.jpg";
          }else{
              images = artist.images[0]["url"];
          }
         
         // result = result +'<li>' + artist.name +'<img src="'+images+'" alt ="" class="img-responsive" ></li>';
         result = result +'<li ><img id="'+id+'" src="'+images+'" alt ="" class=" img-circle"></li>';
      }
      almacen += result;
      //Si next es distinto a null es que sigue habiendomas resultados
      var next = response["artists"]["next"];
      if (next !== null){
          request(next,"format_artists");  
      }else{
          $("#artists_list").empty(); //erase all artist
          $("#artists_list").append(almacen); //append new artist
          $("#artists_list").on("click","img", function (){
          var id = $(this).attr('id');
          var url = "https://api.spotify.com/v1/artists/"+id+"/albums?market=ES&limit=50";
          request(url,"format_albums");
          //Animate to go album section
            $('html, body').animate({
                scrollTop: $("#albums_list").offset().top
            }, 1000);
          });
          almacen ="";
      }
      
      
}
*/
function format_artists (response){
     //var artists = response.artists; //Save all artists object in var artists
     var items_to_show = 10;
      var result="";
      var next = response["artists"]["next"];
      var html ='<div id="myCarousel" class="carousel slide container-fluid" data-ride="carousel">'+
                    ' <ol class="carousel-indicators list-inline">';
      for (var i = 0; i < (response["artists"]["items"].length/items_to_show); i++){
          
          if (i === 0){
              html += '<li data-target="#myCarousel" data-slide-to="'+i+'" class="active"></li>';
          }else {
              html += '<li data-target="#myCarousel" data-slide-to="'+i+'" class="active"></li>';
          }
          
      }
      html += '</ol>'+
              '<div class="carousel-inner" role="listbox">';
      for (var i=0; i< response["artists"]["items"].length/items_to_show; i++){
          html += '<div class="item active">';
          for (var j = 0; j < items_to_show/2; j++){
              var artist = response["artists"]["items"][i]; //save a artists object in a var artist
              var name = artist.name; //save the name
              var id = artist.id;
              var images = ""; //save images
              html += '<li><img src="'+images+'>';
              
          }
          
         // result = result +'<li>' + artist.name +'<img src="'+images+'" alt ="" class="img-responsive" ></li>';
         result = result +'<li ><img id="'+id+'" src="'+images+'" alt ="" class=" img-circle"></li>';
      }
      almacen += result;
      //Si next es distinto a null es que sigue habiendomas resultados
      var next = response["artists"]["next"];
      if (next !== null){
          request(next,"format_artists");  
      }else{
          $("#artists_list").empty(); //erase all artist
          $("#artists_list").append(almacen); //append new artist
          $("#artists_list").on("click","img", function (){
          var id = $(this).attr('id');
          var url = "https://api.spotify.com/v1/artists/"+id+"/albums?market=ES&limit=50";
          request(url,"format_albums");
          //Animate to go album section
            $('html, body').animate({
                scrollTop: $("#albums_list").offset().top
            }, 1000);
          });
          almacen ="";
      }
      
      
}

function format_albums (response){
     //var artists = response.artists; //Save all albums object in var artists
      var result="";
      for (var i=0; i< response["items"].length; i++){
          var album = response["items"][i]; //save a album object in a var artist
          var name = album.name; //save the name
          var id = album.id;
          var images = ""; //save images
          if (album.images.length === 0){
              images = "./images/default.jpg";
          }else{
              images = album.images[0]["url"];
          }
         
         // result = result +'<li>' + artist.name +'<img src="'+images+'" alt ="" class="img-responsive" ></li>';
         result = result +'<li><img id="'+id+'" src="'+images+'" alt =""></li>';
      }
      $("#albums_list").empty();
      $("#albums_list").append(result);
      $("#albums_list").on("click","img", function (){
          var id = $(this).attr('id');
          var url="https://api.spotify.com/v1/albums/"+id;
          request(url,"format_tracklist");
          
       
       });
      
}
function format_tracklist(response){
      var result='<table class="table">'+
                        '<thead>'+
                            '<tr>'+
                                '<th colspan="5" class="text-center"><h2>'+response.name+'</h2></th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            '<tr>'+
                                '<th class="text-center">Disc Number</th><th class="text-center">Track Number</th><th class="text-center">Track Name</th><th class="text-center">Duration</th><th class="text-center">Preview</th>'+
                            '</tr>';
                            
                      
      for (var i=0; i< response["tracks"]["items"].length; i++){
          var track = response["tracks"]["items"][i]; //save a album object in a var artist
          var name = track.name; //save the name
          var disc_number = track.disc_number;
          var duration_ms = track.duration_ms;
          var external_urls = track.external_urls;
          var href = track.href;
          var id = track.id;
          var name = track.name;
          var preview_url = track.preview_url;
          var track_number = track.track_number;
         
        
         result = result +'<tr>'+
                                '<td class="text-center">'+disc_number+'</td>'+
                                '<td class="text-center">'+track_number+'</td>'+
                                '<td class="text-center">'+name+'</td>'+
                                '<td class="text-center">'+millisToMinutesAndSeconds(duration_ms)+'</td>'+
                                '<td class="text-center"><a target="_blank" href="'+preview_url+'"><span class="glyphicon glyphicon-music"></span></a></td>'+
                          '</tr>';  
      }
      result = result + '</tbody>'+
                    '</table>';
     // $("#tracklist_list").empty();
      //$("#tracklist_list").append(result);
      $(".modal-body").empty();
      $(".modal-body").append(result);
      $('#modal').modal('show');
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
