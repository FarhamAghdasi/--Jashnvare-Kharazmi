<?php
require 'config.php';

try {
    session_start();
    if (isset($_POST['emailId']) && isset($_POST['password']) && isset($_POST['captcha'])) {
        $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // دریافت و اعتبارسنجی داده های فرم
        $email = filter_var($_POST['emailId'], FILTER_VALIDATE_EMAIL);
        $password = $_POST['password'];
        $captcha = $_POST['captcha'];

        // بررسی کپچا
        if ($captcha === $_SESSION['captcha']) {
            // بررسی کنید که آیا ایمیل در پایگاه داده وجود دارد یا خیر
            $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
            $stmt->execute(['email' => $email]);
            $user = $stmt->fetch();

            if ($user) {
                // تایید رمز عبور
                if (password_verify($password, $user['password'])) {
                    $_SESSION['email'] = $email;
                    $_SESSION['first_name'] = $user['first_name'];
                    $_SESSION['last_name'] = $user['last_name'];

                    $response = ['status' => 'success', 'message' => 'با موفقیت وارد شدید'];
                } else {
                    $response = ['status' => 'error', 'message' => 'رمز عبور اشتباه است.'];
                }
            } else {
                $response = ['status' => 'error', 'message' => 'کاربری با این ایمیل وجود ندارد.'];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'کد کپچا اشتباه است.'];
        }

        $conn = null;
    } else {
        $response = ['status' => 'error', 'message' => 'فیلدهای لازم برای ورود اطلاعات ارسال نشده‌اند.'];
    }

    echo json_encode($response);
} catch (PDOException $e) {
    error_log($e->getMessage());
    $response = ['status' => 'error', 'message' => 'خطایی رخ داده است. لطفاً با پشتیبانی تماس بگیرید.'];
    echo json_encode($response);
}
?>