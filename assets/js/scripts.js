
(function($) {
	'use strict';
	
	jQuery(document).on('ready', () => {
	
		jQuery(window).on('load',() =>  {
		  setTimeout(() =>  {
				$('body').addClass('loaded');
			}, 500);
		});
			
		$('#main-menu').slicknav({
			label: '',
			duration: 1000,
			easingOpen: "easeOutBounce",
			prependTo:'#mobile_menu',
			closeOnClick: true,
			easingClose:"swing", 
			easingOpen:"swing", 
			openedSymbol: "&#9660;",
			closedSymbol: "&#9658;" 	
		});
		
		if ($(window).scrollTop() > 200) {
              $('.fixed-top').addClass('menu-bg');
          } else {
              $('.fixed-top').removeClass('menu-bg');
          }
			$(window).on('scroll', () => {
				if ( $(window).scrollTop() > 70 ) {
					$('.site-navigation, .header-white, .header').addClass('navbar-fixed');
				} else {
					$('.site-navigation, .header-white, .header').removeClass('navbar-fixed');
				}
			});		  	
			
	}); 	
		
	// برای  آیکون چشم در قسمت ثبت نام و لاگین است که میتوان محتوای آن را دید
$('#togglePassword').click(() => {
    let passwordField = $('#login-password , #register-password , #confirm-password');
    let passwordFieldType = passwordField.attr('type');
    if(passwordFieldType === 'password') {
        passwordField.attr('type', 'text');
    } else {
        passwordField.attr('type', 'password');
    }
});


/**
 * AJAX FORMS
 */


/**
 * RegEx
*/

'use strict';

function validateEmailId(input) {
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailFormat.test(input)) {
        return true;
    } else {
        return false;
    }
}

function pregMatch(input) {
    let regExp = /^[a-zA-Z-ا-ی ]*$/;


    if (regExp.test(input)) {
        return true;
    } else {
        return false
    }
}

/**
 * Form Registration
 */

let RegistrationButton = $('.registrationbutton');

RegistrationButton.on('click', () => {
    $(".error").text("");
    $('.form-group > span').removeClass("error");

    // تبدیل فیلد ها به متغیر برای ارسال با ajax
    let firstName = $('#first-name').val();
    let lastName = $('#last-name').val();
    let emailId = $('#register-email-id').val();
    let contactNumber = $('#contact-number').val();
    let password = $('#register-password').val();
    let confirmPassword = $('#confirm-password').val();
    let actionString = 'registration';
	let captchadata = $('#captcha').val();

    // جهت محدود کردن خالی گذاشتن محتوای فیلد ها
    if (firstName == "") {
        $('#first-name-info').addClass("error");
        $(".error").text("ضروری");
    } else if (!pregMatch(firstName)) {
        $('#first-name-info').addClass("error");
        $(".error").text('لطفا به صورت درست بنوسید');
    } else if (lastName == "") {
        $('#last-name-info').addClass("error");
        $(".error").text("ضروری");

    } else if (!pregMatch(lastName)) {
        $('#last-name-info').addClass("error");
        $(".error").text('لطفا به صورت درست بنوسید');
    } else if (emailId == "") {
        $('#register-email-info').addClass("error");
        $(".error").text("ضروری");
    } else if (!validateEmailId(emailId)) {
        $('#register-email-info').addClass("error");
        $(".error").text("بی اعتبار");
    } else if (contactNumber == "") {
        $('#contact-no-info').addClass("error");
        $(".error").text("ضروری");
    } else if (isNaN(contactNumber) || (contactNumber.indexOf(" ") != -1) || contactNumber.length > 10) {
        $('#contact-no-info').addClass("error");
        $(".error").text("بی اعتبار");
    } else if (password == "") {
        $('#register-passwd-info').addClass("error");
        $(".error").text("ضروری");
    } else if (confirmPassword == "") {
        $('#confirm-passwd-info').addClass("error");
        $(".error").text("ضروری");
    } else if (password != confirmPassword) {
        $('#confirm-passwd-info').addClass("error");
        $(".error").text("رمز عبور تأیید شما مطابقت ندارد.");
    } else if (captchadata === '') {
        $('#captcha-info').addClass("error");
        $(".error").text("ضروری");
	} else {
        $('#loaderId').show();
        $.ajax({
            url: 'assets/php/register.php',
            type: 'POST',
            data: {
                firstName: firstName,
                lastName: lastName,
                emailId: emailId,
                contactNumber: contactNumber,
                password: password,
                confirmPassword: confirmPassword,
				captcha: captchadata,
                action: actionString
            },
            dataType: 'json',
            success: (response) => {
                if (response.status === 'success') {
                    swal({
                        title: "شما با موفقیت ثبت نام کردید",
                        text: "چند ثانیه دیگر به صفحه ورود میروید",
                        icon: "success",
                        button: "رویت شد",
                    });
                    setTimeout(() => {
                        window.location.replace("login.php")
                    }, 5000)
                } else {
                    swal({
                        title: response.message,
                        icon: "error",
                        button: "رویت شد",
                    });
                }
            },
            error: (xhr) => {
                swal({
                    title: xhr.responseText,
                    icon: "error",
                    button: "رویت شد",
                });
            }
        });

    }
})


/**
 * Captcha Refresh
 */

$('.fa-refresh').on('click', z => {
    $('#captcha-image').attr('src', 'assets/php/captcha.php');
});



/**
 * Form Login
 */

let LoginButton = $('.loginbutton');

LoginButton.on('click', () => {
    $(".error").text("");
    $('.form-group > span').removeClass("error");

    let emailId = $('#login-email-id').val();
    let password = $('#login-password').val();
    let captchadata = $('#captcha').val();
    
    if (emailId == "") {
        $('#email-info').addClass("error");
        $(".error").text("ضروری");
    } else if (!validateEmailId(emailId)) {
        $('#email-info').addClass("error");
        $('.error').text("بی اعتبار");
    } else if (password == "") {
        $('#password-info').addClass("error");
        $(".error").text("ضروری");
    } else if (captchadata === '') {
        $('#captcha-info').addClass("error");
        $(".error").text("ضروری");
    } else {
        $.ajax({
            url: 'assets/php/login.php',
            type: 'POST',
            data: {
                emailId: emailId,
                password: password,
                captcha: captchadata
            },
            dataType: 'json',
            success: (response) => {
                if (response.status === 'success') {
                    swal({
                        title: "شما با موفقیت وارد شدید",
                        text: "به صفحه داشبورد منتقل میشوید",
                        icon: "success",
                        button: "رویت شد",
                    });
                    setTimeout(() => {
                        window.location.replace("panel/dashboard.php")
                    }, 5000)
                } else {
                    swal({
                        title: response.message,
                        icon: "error",
                        button: "رویت شد",
                    });
                }
            },
            error: (xhr) => {
                swal({
                    title: xhr.responseText,
                    icon: "error",
                    button: "رویت شد",
                });
            }
        });
    }
})



/**
 * Form Forgot Password
 */

let forgotpassword = $('.forgotpassword');

forgotpassword.on('click', () => {
    $(".error").text("");
    $('#email-info').removeClass("error");

    let emailId = $('#forgot-email-id').val();
	let captchadata = $('#captcha').val();

    if (emailId == "") {
        $('#email-info').addClass("error");
        $(".error").text("ضروری");
    } else if (!validateEmailId(emailId)) {
        $('#email-info').addClass("error");
        $('.error').text("بی اعتبار");
    } else if (captchadata === "") {
        $('#captcha-info').addClass("error");
        $(".error").text("ضروری");
	} else {
        $('#loaderId').show();
        $.ajax({
            url: 'assets/php/forgot_password.php',
            type: 'POST',
            data: {
				emailId: emailId,
				captcha: captchadata
			 },
            dataType: 'json',
            success: (response) => {
                if (response.status === 'success') {
                    swal({
                        title: "لینک بازیابی ایمیل ارسال شد",
                        text: "لطفا پوشه اسپم هم چک کنید",
                        icon: "success",
                        button: "رویت شد",
                    });
                } else {
                    swal({
                        title: response.message,
                        icon: "error",
                        button: "رویت شد",
                    });
                }
            },
            error: (xhr) => {
                swal({
                    title: xhr.responseText,
                    icon: "error",
                    button: "رویت شد",
                });
            }
        });
    }
})

			
})(jQuery);


  

