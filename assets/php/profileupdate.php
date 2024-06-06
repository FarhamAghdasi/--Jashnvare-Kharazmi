<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'form_php');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

header('Content-Type: application/json');

function validateInput($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

function sendConfirmationEmail($email, $name, $phoneNumber) {
    $subject = "آپدیت پروفایل";
    $message = "کاربر محترم ، $name,\n\n پروفایل شما با موفقیت آپدیت شد.\n\nاطلاعات جدید:\nایمیل: $email\nشماره موبایل: $phoneNumber\n\nبا آرزوی موفقیت,\nآنتی ریپ ، توسط فرهام اقدسی";
    $headers = 'From: noreply@yourdomain.com' . "\r\n" .
               'Reply-To: noreply@yourdomain.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();
    
    mail($email, $subject, $message, $headers);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $newName = validateInput($_POST['newname']);
    $email = validateInput($_POST['gmail']);
    $phoneNumber = validateInput($_POST['phoneNumber']);
    $currentPassword = validateInput($_POST['currentpassword']);
    $newPassword = validateInput($_POST['newpassword']);

    if (empty($newName) || empty($email) || empty($phoneNumber) || empty($currentPassword) || empty($newPassword)) {
        echo json_encode(['status' => 'error', 'message' => 'تمامی فیلد ها ضروری است']);
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'فرمت ایمیل نا مشخص هست']);
        exit();
    }

    if (strlen($phoneNumber) != 11) {
        echo json_encode(['status' => 'error', 'message' => 'شماره موبایل اشتباه است']);
        exit();
    }


    $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if ($conn->connect_error) {
        echo json_encode(['status' => 'error', 'message' => 'دیتابیس متصل نشد']);
        exit();
    }

    $sql = "SELECT password FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($storedPassword);
    $stmt->fetch();
    $stmt->close();

    if (!password_verify($currentPassword, $storedPassword)) {
        echo json_encode(['status' => 'error', 'message' => 'پسورد فعلی اشتباه است']);
        exit();
    }

    $newHashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
    $sql = "UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ?, updated_at = NOW() WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssssi', $newName, $email, $phoneNumber, $newHashedPassword);

    if ($stmt->execute()) {
        sendConfirmationEmail($email, $newName, $phoneNumber);
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'پروفایل شما آپدیت نشد']);
    }

    $stmt->close();
    $conn->close();
}
