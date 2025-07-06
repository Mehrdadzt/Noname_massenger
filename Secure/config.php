<?php
$dbname = "massenger_database";
$dbuser = "root";
$dbpassword = "1234";
$dbserver = "localhost";

try {
  $pdo = new PDO("mysql:host=$dbserver;dbname=$dbname;charset=utf8", $dbuser, $dbpassword);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  die("خطا در اتصال: " . $e->getMessage());
}


?>