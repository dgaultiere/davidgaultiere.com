$(document).ready(function() {
  $("#onclick").click(function() {
    $("#contact").css("display", "block");
  });
  $("#contact #cancel").click(function() {
    $(this).parent().parent().hide();
  });
});
