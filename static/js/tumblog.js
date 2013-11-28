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
	//console.log("helloworld1");
  $(".content").empty();
  $(".content").append(data.response.blog.name);
  var total_posts = data.response.total_posts;
  if (total_posts >20)
  {
	  total_posts = 20;
  }
  for (i=0; i<total_posts; i++)
  {
	$(".content").append("<p>Title: " + data.response.posts[i].title + "</p>");
	$(".content").append("<p>Date: " + data.response.posts[i].date + "</p>");
	$(".content").append(data.response.posts[i].body + "<hr>");
	}
}
