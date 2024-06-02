/**
 * logout Form With Ajax
 */
function LogOut() { 
	$.ajax({
		url: '../assets/php/logout.php',
		type: 'POST',
		dataType: 'json',
		success: (response) => {
			if (response.status === 'success') {
				swal({
					title: "شما با موفقیت خارج شدید",
					text: "در طی چند ثانیه دیگه به صفحه ورود بر می گردید",
					icon: "success",
					button: "رویت شد",
				}).then(() => {
					setTimeout(() => {
						window.location.replace("../login.html")
					}, 5000);
				  });


				
			} else {
				swal({
					title: "با ارور مواجه شدید !",
					text: response.message,
					icon: "error",
					button: "رویت شد",
				});
			}
		},
		error: (xhr) => {
			swal({
				title: "با ارور مواجه شدید !",
				text: xhr.message,
				icon: "error",
				button: "رویت شد",
			});
		}
	});
 }



