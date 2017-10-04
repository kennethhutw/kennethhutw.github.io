
jQuery(document).ready(function() {
	$('.alert-danger').hide();
	$('.alert-success').hide();
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/1.jpg");
    
    /*
        Login form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
	$('#Signin').on('click', function(e) {
    	var _countinue = true;
		$('.login-form').find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
				$(this).addClass('input-error');
				$('.alert-danger').show();
				$('.alert-success').hide();
				_countinue = false;
				return;
    		}
    		else {
				if (_countinue)
				{
					$(this).removeClass('input-error');
					$('.alert-danger').hide();
				}
    		}
		});
		
		if (!_countinue)
			return;
		var _account = $("#username").val().toLowerCase();
		var _password = $("#password").val().toLowerCase();
		var _dashboard = $("#dashboard").is(':checked');
		var validation =  accounts.filter(function (account) {
			return (account.account == _account && account.password == _password);
		});
		if (validation.length >0){
			$('.alert-success').show();
			$('.alert-danger').hide();
			if (_dashboard)
				window.location.href = "dashboard.html?username=" + _account;
		}
		else
		{
				$('.alert-success').hide();
				$('.alert-danger').show();
		}
		
    });
    
    /*
        Registration form validation
    */
    $('.registration-form input[type="text"], .registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
	$('#signup').on('click', function(e) {
		var _countinue = true;
		$(".registration-form").find('input[type="text"], input[type="radio"]').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
				$(this).addClass('input-error');
				$('.alert-danger').show();
				$('.alert-success').hide();
				_countinue = false;
				return;
    		}
    		else {
				$(this).removeClass('input-error');
				$('.alert alert-danger').hide();
    		}
		});
		
		if (!_countinue)
			return;
		var _account = $("#username").val().toLowerCase();
		var _password = $("#password").val().toLowerCase();
		var _dashboard = $("#dashboard").is(':checked');
		
		if (_account.length > 0 && _password.length  > 0) {
			$('.alert-success').show();
			$('.alert-danger').hide();
			var _gender = $("input[name='gender']:checked").val();
			var _country = $("#country option:selected").val();
			console.log(_gender + "  " + _country);
			if (_dashboard)
				window.location.href = "dashboard.html?username=" + _account + "&gender=" + _gender+ "&country=";
		}
		else {
			$('.alert-success').hide();
			$('.alert-danger').show();
		}
    	
    });
    
    
});
