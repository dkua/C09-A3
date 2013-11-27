$(document).ready(function() {
  $("input").change(function(event) {
    var tumblog = $(this).val() + ".tumblr.com";
    var apiKey = "tq73UxKtx9sdgsCvBTmMqrSOHCkqgfppOzoTzoFQLplVxoj4nJ";
    var apiUrl = "http://api.tumblr.com/v2/blog/" + tumblog + "/posts?api_key=" + apiKey;

    $.ajax({
      url: apiUrl, 
      type: "GET",
      dataType: "jsonp",
      crossDomain: true,
      success: function(data) {
        console.log("Looking for posts from " + tumblog);
        buildPage(data);
      }
    });
  });
});

function buildPage(data) {
  console.log(data);
}
