const likeUrl = "http://localhost:8080/resources/likes";

$(document).ready(function () {
  $(".like").on("submit", function (event) {
    event.preventDefault();

    console.log($(event.target).find(".fa-heart"));
    const $likeValue = $("#like-button-value");

    const data = $(this).serialize();
    return $.ajax({
      url: likeUrl,
      method: "POST",
      data: data,
    })
      .then(function (data) {
        console.log("POST ajax callback called");
        console.log("ajax-data:", data);
        console.log("this---", $(this));
        $(event.target).find(".fa-heart").addClass("like-color");
        console.log($likeValue, "likevalue**********");
        return $likeValue.val();
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
