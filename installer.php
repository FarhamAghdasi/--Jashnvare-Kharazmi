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

$log_content = "";

$sql = "CREATE DATABASE IF NOT EXISTS form_php";

if ($conn->query($sql) === TRUE) {
  $log_content .= "پایگاه داده form_php با موفقیت ساخته شد.\n";
} else {
  $log_content .= "خطا در ساخت پایگاه داده: " . $conn->error . "\n";
}

$conn->select_db("form_php");

$sql_file = file_get_contents("assets/php/import/tbl_registration.sql");
$sql_statements = explode(";", $sql_file);

foreach ($sql_statements as $statement) {
  if (trim($statement)) {
    if ($conn->query($statement) === TRUE) {
      $log_content .= "دستور SQL با موفقیت اجرا شد.\n";
    } else {
      $log_content .= "خطا در اجرای SQL: " . $conn->error . "\n";
    }
  }
}

$email = 'admin@example.com';
$password = 'farham aghdasi';
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$sql_check = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql_check);

if ($result->num_rows == 0) {
  $sql_insert = "INSERT INTO users (email, password) VALUES ('$email', '$hashed_password')";
  
  if ($conn->query($sql_insert) === TRUE) {
    $log_content .= "ایمیل و رمز عبور با موفقیت اضافه شد.\n";
  } else {
    $log_content .= "خطا در افزودن ایمیل و رمز عبور: " . $conn->error . "\n";
  }
} else {
  $log_content .= "ایمیل ادمین قبلاً اضافه شده است.\n";
}

$sql = "SELECT DATABASE()";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $databaseName = $row["DATABASE()"];
  }
}

$conn->close();

if (!file_exists('logs')) {
    mkdir('logs', 0777, true);
}

$log_file = fopen("logs/installer.log", "a");
fwrite($log_file, "===== نصب جدید =====\n");
fwrite($log_file, "نام دیتابیس: $databaseName\n");
fwrite($log_file, $log_content);
fclose($log_file);

?>
                        <h4>نام دیتابیس : <?php echo $databaseName ?></h4>
                        <h4>ایمیل ادمین: <?php echo $email ?></h4>
                        <h4>رمز عبور ادمین: <?php echo $password ?></h4>
                        <h3>برگشت به <a href="index.html" target="_blank">صفحه اصلی</a></h3>
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
