<?php
require 'php/config.php'
?>
    <!DOCTYPE html>
    <html lang="fa">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>پنل کاربری آنتی ریپ | خوش آمدید !</title>

        <link rel="shortcut icon" type="image/png" href="images/favicon.png" />
        <link href="css/style.css" rel="stylesheet">

    </head>

    <body>

        <div id="main-wrapper">

            <div class="nav-header">
                <div class="nav-control">
                    <div class="hamburger">
                        <span class="line"></span><span class="line"></span><span class="line"></span>
                    </div>
                </div>
            </div>


            <div class="header">
                <div class="header-content">
                    <nav class="navbar navbar-expand">
                        <div class="collapse navbar-collapse justify-content-between">
                            <div class="header-left">
                                <div class="headaer-title">
                                    <h1 class="font-w600 mb-0">خوش آمدید به پنل آنتی ریپ !</h1>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>


            <div class="deznav">
                <div class="deznav-scroll">
                    <div class=" dropdown header-bx">
                        <a class="nav-link header-profile2 position-relative" href=";" role="button" data-bs-toggle="dropdown">
                            <div class="header-img position-relative">
                                <img src="images/header-img/pic-1.jpg" alt="header-img">
                                <svg class="header-circle" width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M130 65C130 100.899 100.899 130 65 130C29.1015 130 0 100.899 0 65C0 29.1015 29.1015 0 65 0C100.899 0 130 29.1015 130 65ZM4.99306 65C4.99306 98.1409 31.8591 125.007 65 125.007C98.1409 125.007 125.007 98.1409 125.007 65C125.007 31.8591 98.1409 4.99306 65 4.99306C31.8591 4.99306 4.99306 31.8591 4.99306 65Z" fill="#FFD482"/>
							<path d="M65 2.49653C65 1.11774 66.1182 -0.00500592 67.496 0.0479365C76.3746 0.389105 85.0984 2.54751 93.1247 6.39966C101.902 10.6123 109.621 16.7428 115.711 24.3385C121.802 31.9341 126.108 40.8009 128.312 50.284C130.516 59.7671 130.562 69.6242 128.446 79.1274C126.33 88.6305 122.106 97.5369 116.087 105.189C110.067 112.841 102.406 119.043 93.6677 123.337C84.9299 127.631 75.3391 129.907 65.6037 129.997C56.7012 130.08 47.8858 128.333 39.7012 124.875C38.4312 124.338 37.895 122.847 38.48 121.598C39.065 120.35 40.5495 119.817 41.8213 120.35C49.3273 123.493 57.4027 125.08 65.5573 125.004C74.5449 124.921 83.399 122.819 91.4656 118.855C99.5322 114.891 106.605 109.166 112.162 102.102C117.72 95.0375 121.619 86.8153 123.572 78.0421C125.526 69.269 125.484 60.1691 123.449 51.4145C121.414 42.6598 117.438 34.4741 111.816 27.4619C106.193 20.4497 99.0674 14.7901 90.9643 10.9011C83.6123 7.3726 75.6263 5.38343 67.4958 5.04499C66.1182 4.98764 65 3.87533 65 2.49653Z" fill="var(--primary)"/>
							</svg>
                            </div>

                            <div class="header-content">
                                <p>نام کاربری:
                                    <!-- اینجا هم برای اینکه من نام و نام خانوادگی رو جداگانه دریافت میکردم ، اون هارو با فاصه متصل و به نام کاربری تبدیل کردم -->
                                    <?php echo $first_name . " " . $last_name; ?>
                                </p>
                                <p>ایمیل:
                                    <!-- ایمیل هم که از طریق سکشن دریافت میشه و مشکلی نداره -->
                                    <?php echo $email; ?>
                                </p>
                            </div>
                        </a>
                    </div>
                    <ul class="metismenu" id="menu">
                        <li>
                            <a class="has-arrow" href="dashboard.php" aria-expanded="false">
                                <i class="flaticon-025-dashboard"></i>
                                <span class="nav-text">داشبورد</span>
                            </a>
                        </li>
                        <li>
                            <a class="has-arrow " href="https://github.com/FarhamAghdasi/jashnavre_kharazmi" target="_blank" aria-expanded="false">
                                <i class="flaticon-028-download"></i>
                                <span class="nav-text">دانلود آنتی ریپ</span>
                            </a>
                        </li>
                        <li>
                            <a class="has-arrow " href="profile.php" aria-expanded="false">
                                <i class="flaticon-051-info"></i>
                                <span class="nav-text">ویرایش پنل کاربری</span>
                            </a>
                        </li>
                        <li>
                            <a class="has-arrow " href="setting.php" aria-expanded="false">
                                <i class="flaticon-066-plus"></i>
                                <span class="nav-text">ایجاد فایل تنظیمات</span>
                            </a>
                        </li>
                        <li>
                            <a onclick="LogOut()" class="has-arrow" aria-expanded="false">
                                <i class="flaticon-005-back-arrow"></i>
                                    <span class="nav-text submit-btn">خروج از حساب کاربری</span>
                            </a>
                        </li>


                    </ul>
                </div>
            </div>

			<div class="content-body">
            <div class="container-fluid">
				<div class="row page-titles">
					<ol class="breadcrumb">
						<li class="breadcrumb-item active"><a href="../index.html">صفحه پیشفرض</a></li>
						<li class="breadcrumb-item"><a href="#">سامانه</a></li>
					</ol>
                </div>
                <!-- row -->
				<!--  -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">لینک های کاربردی در اینجا وجود داره :</h4>
                            </div>
                            <div class="card-body">
                                <p>برای اینکه شما به این صفحه برسید ، تلاش های زیادی کردم و شاید ممکنه خیلی ساده به نظر برسه ، اما کد های زیادی برای اینجا ساخته شده است !</p> <br>
								<li>
                                    <!-- اینجا هم به صورت ajax انجام میشه -->

                        </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


            <div class="footer">
                <div class="copyright">
                    <p>طراحی و توسعه یافته توسط فرهام اقدسی</p>
                </div>
            </div>





        </div>

        <script src="vendor/global/global.min.js"></script>
        <script src="js/custom.min.js"></script>
        <script src="js/deznav-init.js"></script>
        <script src="vendor/sweetalert.min.js"></script>
    </body>

    </html>