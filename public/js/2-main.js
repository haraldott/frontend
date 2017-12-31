$(function() {
  $('#signup_form .input--email, #login_form .input--email').on('keyup', function() {
    var md5_email = md5($(this).val().toLowerCase().replace(/ /g,''));
    // $('.profile-img').attr('src', 'https://www.gravatar.com/avatar/' + md5_email +'?s=500&d=https://cosmicjs.com/images/logo-3.jpg');
  });
  $('#signup_form').on('submit', function() {
    var data = $(this).serializeFormJSON();
    // Do some validation
    $('.form-control').removeClass('has-error');
    $('.error-message').addClass('hidden');
    $('.error-message--email').addClass('hidden');
    if (!data.username) {
      $('.input--username').addClass('has-error');
      $('.error-message').removeClass('hidden');
      return false;
    }
    if (!data.email || !isValidEmail(data.email)) {
      $('.input--email').addClass('has-error');
      $('.error-message--email').removeClass('hidden');
      return false;
    }
    if (!data.password) {
      $('.input--password').addClass('has-error');
      $('.error-message').removeClass('hidden');
      return false;
    }
    $('.error-message').addClass('hidden');
    $('.success-message').addClass('hidden');
    $('.submit-btn').addClass('disabled');
    $('.submit-btn').text('Submitting...');
    console.log("data: " + data)
    console.log("JSON.stringify(data): " + JSON.stringify(data))
    $.ajax({
      type: "POST",
      url: '/newuser',
      data: JSON.stringify(data),
      dataType: "JSON"
    }).success(function(){
      $('.submit-btn').removeClass('disabled');
      $('.submit-btn').text('Submit');
      $('.success-message').removeClass('hidden');
      $('.signup-form__inputs').remove();
    }).error(function(response){
      $('.error-message').removeClass('hidden');
      $('.error-message').text(response.responseJSON.message);
      $('.submit-btn').removeClass('disabled');
      $('.submit-btn').text('Submit');
    });
    return false;
  });
  $('#login_form').on('submit', function() {
    var data = $(this).serializeFormJSON();
    // Do some validation
    $('.form-control').removeClass('has-error');
    if (!data.email || !isValidEmail(data.email)) {
      $('.input--email').addClass('has-error');
      $('.error-message--email').removeClass('hidden');
      return false;
    }
    if (!data.password) {
      $('.input--password').addClass('has-error');
      $('.error-message').removeClass('hidden');
      return false;
    }
    $('.error-message, .error-message--email').addClass('hidden');
    $('.success-message').addClass('hidden');
    $('.submit-btn').addClass('disabled');
    $('.submit-btn').text('Submitting...');
    $.ajax({
      url: '/auth',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data)
    }).success(function(){
      console.info(data);
      window.location.href = '/users';
    }).error(function(response){
      console.info("data:" + data);
      console.info("resp.message: " + response.responseJSON.message);
      $('.error-message').removeClass('hidden');
      $('.error-message').text(response.responseJSON.message);
      $('.submit-btn').removeClass('disabled');
      $('.submit-btn').text('Submit');
    });
    return false;
  });
});
(function ($) {
  $.fn.serializeFormJSON = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };
})(jQuery);
function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}