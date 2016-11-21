/************Regular expressions****************/

	
/************Regular expressions****************/

$(window).load(function() {
	/*$("body").on('click', '.radio', function() {
	    $(this).next("input").prop('checked',true);
	});
	$("body").on('click', '.checkbox', function() {
	    $(this).next("input").prop('checked',true);
	});*/
$('.demo-nav > li').make_dropdown();
/*$('.demo-nav li').hover(
	function(){$(this).find('.sub-modal').stop(false, false).slideDown()},
	function(){$(this).find('.sub-modal').stop(false, false).slideUp()}
);*/

$('.custom-form').bind('ajax:aborted:required', function() {
  return false;
});
	

	$('.demo-nav li a').click (function() {
		$('.optional').load($(this).attr('href'),function() { call_func(); all_events(); validate_all_forms(); });
		$(this).parent().parent().find('.active').removeClass('active');
		$(this).parent().addClass('active');
		return false;
	});
	all_events();
	validate_all_forms();
});

/**************** Functions *******************/

function call_func(){
	$("input[type='checkbox']").custCheckBox();
	$("input[type='radio']").custCheckBox();
	$(".select_field").selectbox();
	$('.sbToggle').append('<i class="icon-chevron-down"></i>');
	$('.checkbox').append('<i class="icon-ok"></i>');
	$('.radio').append('<i class="icon-circle"></i>');
	$('.radio-btn, .check-box, .select_field').css('display','inline')
}

function all_events(){
		$('.checkbox').click(function(){
			if($(this).next('input').prop('checked') && $(this).parent().find('label').hasClass('error')){
				$(this).parent().find('label.error').addClass('hidden');
				$(this).find('.icon-ok').css('border','solid 1px #ccc');
			}else{
				$(this).parent().find('.hidden').removeClass('hidden');
			}
		});
		
		$('.radio').click(function(){
			if($(this).next('input').prop('checked') && $(this).parent().find('label').hasClass('error')){
				$(this).parent().find('label.error').addClass('hidden');
				$(this).parent().find('.icon-circle').css('border','solid 1px #ccc');
			}else{
				$(this).parent().find('.hidden').removeClass('hidden');
			}
		});
		
		$('.field').
		    focus(function() {
		        /*if(this.title==this.value) {
		            this.value = '';
		        }*/
				if(!$(this).hasClass('error')){
						$(this).parent().animate({
							boxShadow: '0px 0px 10px 2px #84cede'
						},90);
						//$(this).parent().find('.info').fadeIn();
						$(this).parent().css('border','solid 1px #84cede')
				}
			//	if($(this).parent().find('label.error').length)
				else{
					$(this).parent().animate({
						boxShadow: '0px 0px 10px 2px #f27669'
					},90);
					$(this).parent().css('border','solid 1px #f27669')
				}
				if($(this).parent().find('span').hasClass('ok')){
					$(this).parent().find('span').removeClass();
					$(this).parent().find('i').removeClass('icon-ok').addClass('icon-remove');
				}
				
		    }).
		    blur(function(){
		        /*if(this.value=='') {
		            this.value = this.title;
		        }*/
				if($(this).hasClass('valid') && this.value != '' ){
						$(this).parent().animate({
							boxShadow: '0px 0px 0px 0px #f27669'},90);
						//$(this).parent().find('.info').fadeOut();
						$(this).parent().css('border','solid 1px #ccc');
						$(this).parent().find('i').removeClass('icon-remove').addClass('icon-ok');
						$(this).parent().find('span').removeClass('error').addClass('ok');
				}
				if($(this).hasClass('error')){
						$(this).parent().animate({
							boxShadow: '0px 0px 0px 0px #f27669'		
						},90);
						$(this).parent().css('border','solid 1px #f27669');
						$(this).parent().find('i').removeClass('icon-ok').addClass('icon-remove');
						$(this).parent().find('span').removeClass('ok').addClass('error');
						//$(this).parent().find('.info').fadeOut();
				}
				if(!$(this).hasClass('error') && this.value == '' ){
					
					$(this).parent().animate({
						boxShadow: '0px 0px 0px 0px #f27669'
					},90);
					$(this).parent().css('border','solid 1px #ccc');
					//$(this).parent().find('.info').fadeOut();
				}
		    });
		$('#password').focus(function() {
		       $(this).prop('type', 'password').val('');
		   });
		$('.sbOptions').click(function(){
			
			if($(this).parent().parent().find('select').val() != 0){
				$(this).parent().parent().find('label.error').hide();
				$(this).parent().find('.sbToggle').removeClass('error');
				$(this).parent().css('border','solid 1px #ccc')
			}
		});
		$('.modal-nav li a').click(function(){
			var formType = $(this).parent().attr('name');
			$('#black-screen').fadeIn('slow');
			$('#' + formType).fadeIn();
			return false;
		});
		
		
		$('#popup .close').click(function(){
			$('#popup .custom-form').fadeOut();
			$('#black-screen').fadeOut('slow');
			return false;
		});
	}	

function validate_all_forms(){
	
	jQuery.validator.setDefaults({
		debug: true,
		success: "valid"
	});
	
	
	
	jQuery.validator.addMethod("notEqual", function(value, element, param) {
	  return this.optional(element) || value != param;
	}, "Please specify a different (non-default) value");
	
	
	
	$( "#registration-form" ).validate({
		rules: {
			myname: {
				required: true,
				minlength: 3
			},
			password:{
				required: true,
				minlength: 5
			},
			password2: {
			    required: true,
			    minlength: 5,
			    equalTo: "#password"
			},
			email: {
			    required: true,
			    minlength: 6,
				email: true
			}, 
			country: {
				required: true
			},
			gender: {
				required: true
			},
			terms:{
				required:true
			}
		},
		focusInvalid: false,
		onkeyup: false, 
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				target: '.optional'
			}); 
		},	
		highlight: function(element, errorClass) {
			if(!$(element).is(':radio') && !$(element).is(':checkbox') && !$(element).is('select')){
	   			$(element).parent().find('span').removeClass().addClass('error');
				$(element).addClass(errorClass);
	    		$(element).parent().css('border','solid 1px #f27669');
			}
			if($(element).is('select')){
				$(element).parent().find('.sbToggle').addClass('error');
				$(element).parent().find('.sbHolder').css('border','solid 1px #f27669');
			}
			if($(element).is(':checkbox')){
				
				$(element).parent().find('.icon-ok').css('border','solid 1px #f27669');
			}
			if($(element).is(':radio')){
				$(element).parent().find('.icon-circle').css('border','solid 1px #f27669');
			}
		},
		messages: {
		    myname: {
		        required: "Please enter your name",
		        minlength: jQuery.format("Enter at least 3 characters"),
				notEqual: "Please specify a different (non-default) value"
			},
			password: {
		        required: "Please enter password",
		        minlength: jQuery.format("Password must be at least 5 characters long"),
				notEqual: "Please specify a different (non-default) value"
			},
			password2: {
		        required: "Please re-enter password",
		        equalTo: "Password fields have to match",
				notEqual: "Please specify a different (non-default) value" 
			},
			email:{
				required: "Please enter an e-mail",
				minlength: jQuery.format("E-mail must be at least 6 characters long"),
				email: "Please enter valid e-mail" 
			}, 
			country:{
				required:"Please select your country"
			},
			gender: {
				required: "Please select your gender"
			},
			terms: {
				required: "Please select the checkbox"
			}
		}	
	});
	 
	$( "#contact-form" ).validate({
		rules: {
			your_name: {
			required: true,
			minlength: 3
			
			},
			 email2: {
			     required: true,
			     minlength: 6,
				 email: true
			 }, 
			 message:{
				required:true
			}
			
		},
		onkeyup: false, 
		focusInvalid: false,
		submitHandler: function(form) {
			$(form).ajaxSubmit();
			
		},	
		 highlight: function(element, errorClass) {
			if(!$(element).is(':radio') && !$(element).is(':checkbox') && !$(element).is('select')){
	   	 		$(element).parent().find('span').removeClass().addClass('error');
				$(element).addClass(errorClass);
	   	 		$(element).parent().css('border','solid 1px #f27669');
			}
			if($(element).is('select')){
				$(element).parent().find('.sbToggle').addClass('error');
				$(element).parent().find('.sbHolder').css('border','solid 1px #f27669');
			}
			if($(element).is(':checkbox')){
				$(element).parent().find('.icon-ok').css('border','solid 1px #f27669');
			}
			if($(element).is(':radio')){
				$(element).parent().find('.icon-circle').css('border','solid 1px #f27669');
			}
		},
		messages: {
		    your_name: {
		        required: "Please enter your name",
		        minlength: jQuery.format("Enter at least 3 characters"),
				notEqual: "Please specify a different (non-default) value"
			},
			email:{
				required: "Please enter an e-mail",
				minlength: jQuery.format("E-mail must be at least 6 characters long"),
				email: "Please enter valid e-mail" 
			}, 
			message:{
				required:"Please leave a message"
			}
		}	
	});

	$( "#login-form" ).validate({
		rules: {
			user: {
			required: true,
			minlength: 3
			},
			login_password: {
		        required: true,
		        minlength: 5
			}
			
		},
		onkeyup: false, 
		focusInvalid: false,
		submitHandler: function(form) {
			$(form).ajaxSubmit();
			
		},	
		 highlight: function(element, errorClass) {
			if(!$(element).is(':radio') && !$(element).is(':checkbox') && !$(element).is('select')){
	   	 		$(element).parent().find('span').removeClass().addClass('error');
				$(element).addClass(errorClass);
   	 			$(element).parent().css('border','solid 1px #f27669');
			}
			if($(element).is('select')){
				$(element).parent().find('.sbToggle').addClass('error');
				$(element).parent().find('.sbHolder').css('border','solid 1px #f27669');
			}
			if($(element).is(':checkbox')){
				$(element).parent().find('.icon-ok').css('border','solid 1px #f27669');
			}
			if($(element).is(':radio')){
				$(element).parent().find('.icon-circle').css('border','solid 1px #f27669');
			}
		},
		messages: {
		    user: {
		        required: "Please enter your name",
		        minlength: jQuery.format("Enter at least 3 characters")
				
			},
			 login_password: {
			     required: "Please enter password",
			     minlength: jQuery.format("Password must be at least 5 characters long"),
			 	notEqual: "Please specify a different (non-default) value"
			 }
		}	
	});
}	

/* function that centers elements $('the element that has to be centered').center();*/
jQuery.fn.center = function(loaded) {
    var objs = this;
    body_width = parseInt($(window).width());
    objs.each(function() {
        var obj = $(this)
        var block_width = parseInt(obj.width());
        var left_position = parseInt((body_width/2) - (block_width/2)  + $(window).scrollLeft());
        if (body_width < block_width) { left_position = 0 };
        if(!loaded) {
            obj.css({'position': 'absolute'});
            obj.css({'left': left_position});
            obj.center(!loaded);
            $(window).bind('resize', function() { 
                obj.center(!loaded);
            });
            $(window).bind('scroll', function() { 
                obj.center(!loaded);
            });
        } else {
            obj.stop();
            obj.css({'position': 'absolute'});
            obj.animate({'left': left_position}, 200, 'linear');
        }
    });
}