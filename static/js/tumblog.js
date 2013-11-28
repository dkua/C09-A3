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
  var respStatus = data.meta.status;
  if (respStatus === 200) {
    var response = data.response;
    var blog = response.blog;
    var posts = response.posts;

    var title = $("<h1 />").text(blog.title);
    var description = $("<h3 />").html(blog.description);
    var postNum = $("<h4 />").text("Has " + response.total_posts + " posts");
    $(".tumblog").empty().append(title, description, postNum);

    var post;
    for (var i=0; i<posts.length; i++) {
      post = posts[i];
      var tumpost = $("<div />").addClass("tumpost").addClass("center");
      var postDescription = $("<h3 />").append(post.description);
      tumpost.append(postDescription);

      if (post.type === "text") {
        tumpost.append(post.body);
      } else if (post.type === "photo") {
        var photos = post.photos;

        var photo;
        var img;
        var photoCaption;
        var photoLink;
        for (var j=0; j<photos.length; j++) {
          photo = photos[j];
          img = $("<img />").attr("src", photo.alt_sizes[3].url);
          photoLink = $("<a />").attr("href", photo.original_size.url).attr("target", "_blank").append(img);
          photoCaption =  $("<p />").html(photo.caption);
          tumpost.append(photoLink, photoCaption);
        }
      } else {
        var otherPost = $("<p />").text("This is a " + post.type + " post");
        tumpost.append(otherPost);
      }

      var postCaption = post.caption;
      var postURL = $("<a />").attr("href", post.post_url).attr("target", "_blank").text("View post here");
      var postInfo = $("<p />").text("Posted " + post.date + " by " + post.post_author);
      tumpost.append(postCaption, postURL, postInfo);
      $(".tumblog").append(tumpost);
    }
  } else {
    $(".tumblog").html("<h1>Tumblr returned a " + respStatus + " error<br>Please try another Tumblog</h1>");
  }
}
