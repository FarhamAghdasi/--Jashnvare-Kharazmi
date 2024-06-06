<?php 

/**
 * Config For Session
 */

 session_start();

 if (isset($_SESSION['email']) && !empty($_SESSION['email'])) {
    header("Location: panel/dashboard.php");
}
?>