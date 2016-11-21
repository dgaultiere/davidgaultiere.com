/************Regular expressions****************/

	
	
/************Regular expressions****************/

$(window).load(function() {
	
	$('.field').
	    focus(function() {
	        if(this.title==this.value) {
	            this.value = '';
	        }
			if(!$(this).parent().find('label.error').length){
					$(this).parent().animate({
						boxShadow: '0px 0px 10px 2px #84cede'
					});
					$(this).parent().find('.info').fadeIn();
			}else{
				$(this).parent().animate({
					boxShadow: '0px 0px 10px 2px #f27669'
				});
			}
			
			
	    }).
	    blur(function(){
	        if(this.value=='') {
	            this.value = this.title;
	        }
			
			
			
			if(!$(this).parent().find('label.error').length){
					$(this).parent().animate({
						boxShadow: '0px 0px 0px 0px #f27669'
					});
					$(this).parent().find('.info').fadeOut();
			}else{
				$(this).parent().animate({
					boxShadow: '0px 0px 10px 2px #f27669'
				});
				$(this).parent().find('.info').fadeOut();
			}
			
	    });
		
		function errorAnimate(){
			
		}
		
		/*$('.field').keyup(function() {
		    if($(this).parent().find('label.error').length){
				$(this).parent().find('.info').fadeOut();
				$(this).parent().animate({
					boxShadow: '0px 0px 10px 2px #f27669'
				});
			}else{
				$(this).parent().animate({
					boxShadow: '0px 0px 10px 2px #84cede'
				});
			}
		});*/
		
		
		$.validator.setDefaults({
		    showErrors: function(errorMap, errorList) {
		        if (errorList.length < 1) {
		            $('label.error').remove();
		            return;
		        }
		        $.each(errorList, function(index, error) {
		            $(error.element).next('label.error').remove();
		            $(error.element).after(
		                $('<label/>')
		                    .addClass('error')
		                    .append($('<em/>').text(''))
		                    .append(error.message)
		            );
		        });
		    }
		});
	
	jQuery.validator.setDefaults({
		debug: true,
		success: "valid"
	});
	
	
	
	$( ".contact-form" ).validate({
		rules: {
			name: {
			required: true,
			minlength: 3
			}
		},
		/*showErrors: function(errorMap, errorList) {
		        
		        $("input:focus").parent().animate({
					boxShadow: '0px 0px 10px 2px #f27669'
				});
				$("input:focus").parent().find('.info').fadeOut();
				$("input:focus").parent().find('.tip').fadeIn();
		    },*/
			showErrors: function(errorMap, errorList) {
					for ( key in errorMap )	{
							$("input:focus").parent().animate({
								boxShadow: '0px 0px 10px 2px #f27669'
							});
							$("input:focus").parent().find('.info').fadeOut();
							$("input:focus").parent().find('.tip').fadeIn();
					}
				},
		messages: {
		    name: {
		        required: "Please enter your name",
		        minlength: jQuery.format("Enter at least 3 characters")
			}
		}	
	});
	 

});

/**************** Functions *******************/

