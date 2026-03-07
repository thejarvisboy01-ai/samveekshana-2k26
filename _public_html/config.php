<?php
// config.php - Database Configuration

$host = 'localhost';
$username = 'u343742970_samveekshana'; // Hostinger Database Username
$password = 'T!a04gry7'; // Hostinger Database Password
$dbname = 'u343742970_Registration'; // Hostinger Database Name

// Attempt to connect to MySQL
try {
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Select the database (or ignore if it doesn't exist yet for initial setup)
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    try {
        $pdo = new PDO($dsn, $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }
    catch (PDOException $e) {
    // If DB doesn't exist, we will catch it here, but keep the initial $pdo for setup
    }
}
catch (PDOException $e) {
    die(json_encode(["status" => "error", "message" => "Database Connection failed: " . $e->getMessage()]));
}
?>
