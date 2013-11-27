$("#blog-search").ready(function() {
    var apiKey = "tq73UxKtx9sdgsCvBTmMqrSOHCkqgfppOzoTzoFQLplVxoj4nJ";
    var tumblog;
    var apiUrl = "http://api.tumblr.com/v2/blog/" + tumblog + "/posts?api_key=" + apiKey;

    });
function getTumblr(apiUrl) = $.ajax({
      url: apiUrl, 
      type: "GET",
      dataType: "jsonp",
      crossDomain: true,
      success: function(data) {
        console.log(data);
      }
      });
