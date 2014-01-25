$(document).ready(function() {
  $(".loadingDiv").hide().ajaxStart(function() {
    $(this).show();
  }).ajaxStop(function() {
    $(this).hide();
  });

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
      var postDescription = $("<h4 />").append(post.description);
      tumpost.append(postDescription);

      switch(post.type) {

        case "text":
          tumpost.append(post.body);
          break;

        case "photo":
          var photos = post.photos;

          var photo;
          var img;
          var photoCaption;
          var photoLink;
          for (var j=0; j<photos.length; j++) {
            photo = photos[j];
            img = $("<img />").attr("src", photo.alt_sizes[0].url);
            photoLink = $("<a />").attr("href", photo.original_size.url).attr("target", "_blank").append(img);
            photoCaption =  $("<p />").html(photo.caption);
            tumpost.append(photoLink, photoCaption);
          }
          break;

        case "quote":
          var quote =  $("<p />").text(post.text);
          tumpost.append(quote, post.source);
          break;

        case "link":
          var titleLink;
          if (post.title) {
            titleLink = $("<h2 />").append($("<a />").attr("href", post.url).text(post.title));
          }
          tumpost.prepend(titleLink);
          break;

        case "chat":
          var chatTitle;
          if (post.title) {
            chatTitle = $("<h2 />").text(post.title);
          }
          var chatBody = $("<p />").html(post.body.replace(/\r\n/g, "<br />"));
          tumpost.append(chatTitle, chatBody);
          break;

        case "audio":
          var audioTitle = $("<h2 />").text(post.id3_title);
          tumpost.append(audioTitle, post.player);
          break;

        case "video":
          tumpost.append(post.player[2].embed_code);
          break;

        case "answer":
          var question = $("<h2 />").html("\"" + post.question + "\" - <em><a href=" + post.asking_url + ">" + post.asking_name + "</a></em>");
          tumpost.append(question, post.answer);
          break;

        default:
          var otherPost = $("<p />").text("This is a " + post.type + " post");
          tumpost.append(otherPost);
          break;
      }

      var postTags = $("<p />").text("Tags " + post.tags);
      var postCaption = post.caption;
      var postURL = $("<a />").attr("href", post.post_url).attr("target", "_blank").text("View post here");
      var postInfo = $("<p />").text("Posted " + post.date);
      tumpost.append(postCaption, "<br />",  postURL, postInfo, postTags);
      $(".tumblog").append(tumpost);
    }
  } else {
    $(".tumblog").html("<h1>Tumblr returned a " + respStatus + " error<br>Please try another Tumblog</h1>");
  }
}
