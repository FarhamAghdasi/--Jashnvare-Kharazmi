<!DOCTYPE html>
<html lang="fa">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>آنتی ریپ | ایجاد جدول برای داشبورد و پنل کاربری</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="assets/fonts/themify-icons.css">
    <link rel="stylesheet" href="assets/css/slicknav.css">
    <link rel="stylesheet" href="assets/css/animate.css">
    <link rel="stylesheet" href="assets/css/slider.css" />
    <link rel="stylesheet" href="assets/css/style.css" />
    <link rel="stylesheet" href="assets/css/fonts.css">
    <style>
        .input-field {
            outline: 0;
        }
    </style>
</head>

<body>
    <section class="section-padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3 col-xs-12">
                    <div class="register">
                        <h4 class="login_register_title">راه اندازی پنل کاربری آنتی ریپ</h4>
                        <p>این نصب کننده ، به سادگی برای شما اجرا و اطلاعات رو نمایش میدهد</p>
                        <br>
                        <?php

/**
 * Instalation For Panel
 * برای راحتی کار کاربر ایجاد شده که با اجرای این فایل ، به صورت اتوماتیک در دیتابیس ، جدول مربوط به داشبورد ایجاد میشه
 * و فایل sql هم به صورت خودکار ایجاد میشه
 */

require 'assets/php/config.php';

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
  die("اتصال به پایگاه داده با مشکل مواجه شد: " . $conn->connect_error);
}


$sql = "CREATE DATABASE form_php";

if ($conn->query($sql) === TRUE) {
  echo "<script>
  swal({
      title: 'موفقیت!',
      text: 'پایگاه داده form_php با موفقیت ساخته شد.',
      icon: 'success'
    });
  </script>";
} else {
  echo "<script>
  swal({
      title: 'خطا!',
      text: 'خطا در ساخت پایگاه داده: ' . $conn->error,
      icon: 'error'
    });
  </script>";
}

$conn->select_db("form_php");

$sql_file = file_get_contents("assets/php/import/tbl_registration.sql");
$sql_statements = explode(";", $sql_file);

foreach ($sql_statements as $statement) {
  if (trim($statement)) {
    if ($conn->multi_query($statement) === TRUE) {
      echo "<script>
      swal({
          title: 'موفقیت!',
          text: 'دستور SQL با موفقیت اجرا شد.',
          icon: 'success'
        });
      </script>";
    } else {
      echo "<script>
      swal({
          title: 'خطا!',
          text: 'خطا در اجرای SQL: ' . $conn->error,
          icon: 'error'
        });
      </script>";
    }
  }
}

$sql = "SELECT DATABASE()";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $databaseName = $row["DATABASE()"];
  }
}

$conn->close();

?>
                        <h4>نام دیتابیس : <?php echo $databaseName ?></h4>
                        <h3>برگشت به <a href="index.html">صفحه اصلی</a></h3>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/libs/sweetalert.min.js"></script>

    <script>
        swal({
          title: 'دیتابیس شما با موفقیت ساخته شد',
          text: 'اکنون میتوانید ثبت نام کنید و به پنل خودتون دسترسی پیدا کنید',
          icon: 'success',
          button: "رویت شد"
        });
      </script>
</body>

</html>