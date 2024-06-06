<?php
// captcha.php
session_start();

// تولید یک رشته تصادفی
$captcha_code = '';
$characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
$characters_length = strlen($characters);
$captcha_length = 5;

for ($i = 0; $i < $captcha_length; $i++) {
    $captcha_code .= $characters[rand(0, $characters_length - 1)];
}

// ذخیره رشته کپچا در سشن
$_SESSION['captcha'] = $captcha_code;

// ایجاد تصویر
$image = imagecreatetruecolor(200, 60);
$background_color = imagecolorallocate($image, 255, 255, 255); // سفید
$line_color = imagecolorallocate($image, 64, 64, 64); // خاکستری
$pixel_color = imagecolorallocate($image, 0, 0, 255); // آبی

imagefilledrectangle($image, 0, 0, 200, 60, $background_color);

// افزودن خطوط تصادفی به تصویر (کاهش تعداد خطوط)
for ($i = 0; $i < 2; $i++) {
    imageline($image, 0, rand() % 60, 200, rand() % 60, $line_color);
}

// افزودن پیکسل‌های تصادفی به تصویر (کاهش تعداد پیکسل‌ها)
for ($i = 0; $i < 500; $i++) {
    imagesetpixel($image, rand() % 200, rand() % 60, $pixel_color);
}

// تعریف رنگ‌های مختلف برای حروف
$colors = [
    imagecolorallocate($image, 255, 0, 0), // قرمز
    imagecolorallocate($image, 0, 255, 0), // سبز
    imagecolorallocate($image, 0, 0, 255), // آبی
    imagecolorallocate($image, 255, 165, 0), // نارنجی
    imagecolorallocate($image, 128, 0, 128), // بنفش
    imagecolorallocate($image, 0, 255, 255)  // فیروزه‌ای
];

// مسیر به فونت TrueType
$font_path = 'arial.ttf';

// افزودن هر حرف کپچا به تصویر با رنگ‌های متفاوت
$x = 20;
$y = 40;
$font_size = 20; // تنظیم اندازه فونت برای TrueType
for ($i = 0; $i < $captcha_length; $i++) {
    $letter = $captcha_code[$i];
    $color = $colors[$i % count($colors)];
    imagettftext($image, $font_size, rand(-15, 15), $x, $y, $color, $font_path, $letter);
    $x += 30; // فاصله بین حروف
}

// ارسال هدرها و نمایش تصویر
header('Content-type: image/png');
imagepng($image);
imagedestroy($image);
?>
