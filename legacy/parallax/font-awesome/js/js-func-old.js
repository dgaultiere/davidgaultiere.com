/************Regular expressions****************/

	var passwordStrengthRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/gm;
	var passwordRegex = /^[a-z0-9_-]{6,18}$/; 
	var nameRegex = /^[a-zA-Z ]+$/;
	var cityRegex = /^[a-zA-Z ]+$/;
	
/************Regular expressions****************/

$(window).load(function() {
	
	$('.field').
	    focus(function() {
	        if(this.title==this.value) {
	            this.value = '';
	        }
			if(!$(this).parent().hasClass('err')){
					$(this).parent().animate({
						boxShadow: '0px 0px 10px 2px #84cede'
					});
					$(this).parent().find('.info').fadeIn();
			}
	    }).
	    blur(function(){
	        if(this.value=='') {
	            this.value = this.title;
	        }
			$(this).parent().animate({
				boxShadow: '0px 0px 0px 0px #84cede'
			});
			$(this).parent().find('.info').fadeOut();
			
	    });
		$('#name').blur(function(){validate($(this) , nameRegex );});
		$('#city').blur(function(){validate($(this) , cityRegex );});
		$('#password').blur(function(){validate( $(this), passwordRegex );});
		$('#re-password').blur(function(){passMatch( $('#password'), $('#re-password') );});
		$('.validation').click(function(){
			alert('dadad');
		   validate($('#name'), nameRegex);
		   validate($('#city'), cityRegex);
		   validate($('#password'), passwordRegex);
		   passMatch($('#password'), $('#re-password'));
			return false;
		});
	
	/*
	$('#name').blur(function() {
	    //$('span.error-keyup-1').hide();
	    var inputVal = $(this).val();
		var nameRegex = /^[a-zA-Z ]+$/;
	
	    if(!nameRegex.test(inputVal)) {
	        $(this).parent().find('span').addClass('error');
	        $(this).parent().addClass('err');
	        $(this).parent().animate({
				boxShadow: '0px 0px 10px 2px #f27669'
			});
			$(this).parent().find('.tip').fadeIn();
	    }else{
			$(this).parent().find('span').removeClass('error');
	        $(this).parent().removeClass('err');
			$(this).parent().animate({
				boxShadow: '0px 0px 00px 0px #84cede'
			});
			$(this).parent().find('.tip').fadeOut();
		}
	});
	
	
	$('#password').blur(function() {
	    //$('span.error-keyup-1').hide();
	    var inputVal = $(this).val();
		var passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/gm;
	
	    if(!passwordRegex.test(inputVal)) {
	        $(this).parent().find('span').addClass('error');
	        $(this).parent().addClass('err');
	        $(this).parent().animate({
				boxShadow: '0px 0px 10px 2px #f27669'
			});
			$(this).parent().find('.tip').fadeIn();
	    }else{
			$(this).parent().find('span').removeClass('error');
	        $(this).parent().removeClass('err');
			$(this).parent().animate({
				boxShadow: '0px 0px 10px 2px #84cede'
			});
			$(this).parent().find('.tip').fadeOut();
		}
	});*/
	
	
	
	 

});

/**************** Functions *******************/

	function validate(id,regex){
		
		var inputVal = id.val();
		if(!regex.test(inputVal)) {
	        id.parent().find('span').addClass('error');
	        id.parent().addClass('err');
	        id.parent().animate({
				boxShadow: '0px 0px 10px 2px #f27669'
			});
			id.parent().find('.tip').fadeIn();
	    }else{
			id.parent().find('span').removeClass('error');
	        id.parent().removeClass('err');
			id.parent().animate({
				boxShadow: '0px 0px 0px 0px #84cede'
			});
			id.parent().find('.tip').fadeOut();
		}
	}
	
	function passMatch(passwordVal, checkVal){
		var password = passwordVal.val();
		var check = checkVal.val();
		if( password != check){
			checkVal.parent().find('span').addClass('error');
	        checkVal.parent().addClass('err');
	        checkVal.parent().animate({
				boxShadow: '0px 0px 10px 2px #f27669'
			});
			checkVal.parent().find('.tip').fadeIn();
		}
		else{
			$(this).parent().animate({
				boxShadow: '0px 0px 0px 0px #84cede'
			});
		}
	}

/**************** Functions *******************/