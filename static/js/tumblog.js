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
  $(".content").empty();
  $(".content").append(data.response.blog.name+"<hr>");
  
  var total_posts = data.response.total_posts;
  for (i=0; (i<total_posts && i <20); i++)
  {
	
	
	if(data.response.posts[i].type == "text")
	{
		$(".content").append("<p>" + data.response.posts[i].title + "</p>");
		$(".content").append("<p>URL: " + data.response.posts[i].post_url + "</p>");
		$(".content").append(data.response.posts[i].body);
	}
	if(data.response.posts[i].type == "photo")
	{
		$(".content").append(data.response.posts[i].caption);
		$(".content").append("<p>URL: " + data.response.posts[i].post_url + "</p>");
		for (j=0; j<data.response.posts[i].photos.length;j++)
		{
			$(".content").append("<img width=\"400\" height=\"225\" src=\"" 
			+ data.response.posts[i].photos[j].alt_sizes[2].url + "\"</img>");
			$(".content").append("<p>Caption: " + data.response.posts[i].photos[j].caption + "</p>");
		}
		
	}
	if(data.response.posts[i].type == "audio")
	{
		$(".content").append(data.response.posts[i].player);
		$(".content").append("<p>Caption: " + data.response.posts[i].caption + "</p>");
	}
	if(data.response.posts[i].type == "audio")
	{
		
	}
	$(".content").append("<p>Date: " + data.response.posts[i].date + "</p>");
	
	$(".content").append("<hr>");
	}
}
