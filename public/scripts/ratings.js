$(document).ready(function () {
  $(".get-average").click(function () {
    let id = $(this).data("resource");
    let $appen = $(this).data("re");
    console.log(id);
    $.ajax({
      url: "/resources/ratings/avg",
      method: "POST",
      data: {
        id,
      },
    }).then(function (data) {
      let rating = Math.round(data.avgratings * 10) / 10;
      $(".average-rating").empty();
      $(".average-rating").append(`<p>Average rating: ${rating}</p>`);
    });
  });
});
