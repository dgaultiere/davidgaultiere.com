// Function to parse query string params
function getParameterByName(name){
    var regexS = "[\\?&]"+name+"=([^&#]*)",
  regex = new RegExp(regexS),
  results = regex.exec(window.location.search);
  if(results == null) {
    return null;
  } else {
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}

// Get query string param by name
var contactResult = getParameterByName('result');
var contactSuccess = 'success';
var contactError = 'error';

// Launch contact form on button click
$(document).ready(function() {
  $("#contact-button").click(function() {
    $("#contact").css("display", "block");
  });
  $("#contact #cancel").click(function() {
    $(this).parent().parent().hide();
  });
  if(contactResult != null) {
    $("#contact").css("display", "block");
  }
});
