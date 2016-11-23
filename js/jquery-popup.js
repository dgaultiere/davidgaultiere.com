$(document).ready(function() {
  $("#contact-button").click(function() {
    $("#contact").css("display", "block");
  });
  $("#contact #cancel").click(function() {
    $(this).parent().parent().hide();
  });
});
