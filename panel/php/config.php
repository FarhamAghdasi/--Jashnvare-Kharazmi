<?php

/**
 * Config For Session
 */

session_start();

if (!isset($_SESSION['email']) || empty($_SESSION['email'])) {
    header("Location: ../login.php");
    exit();
}

if (isset($_SESSION['email']) && !empty($_SESSION['email'])) {
    $email = $_SESSION['email'];
    $first_name = $_SESSION['first_name'];
    $last_name = $_SESSION['last_name'];
} else {
    $email = "آدرس ایمیل نامشخص";
    $first_name = "نام نامشخص";
    $last_name = "نام خانوادگی نامشخص";
}


?>