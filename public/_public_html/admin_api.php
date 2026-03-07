<?php
require 'config.php';
header('Content-Type: application/json');

$event = $_GET['event'] ?? 'all';

try {
    $pdo->exec("USE `$dbname`");

    if ($event === 'all') {
        $stmt = $pdo->prepare("SELECT * FROM registrations ORDER BY created_at DESC");
        $stmt->execute();
    }
    else {
        $stmt = $pdo->prepare("SELECT * FROM registrations WHERE event_type = ? ORDER BY created_at DESC");
        $stmt->execute([$event]);
    }

    $results = $stmt->fetchAll();

    echo json_encode(["status" => "success", "data" => $results]);


}
catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Could not fetch data from database.", "debug" => $e->getMessage()]);
}
?>
