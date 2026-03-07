<?php
require 'config.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Ensure the uploads directory exists
    $target_dir = "uploads/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0755, true);
    }

    $full_name = htmlspecialchars(trim($_POST['full_name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $event_type = htmlspecialchars(trim($_POST['event_type'] ?? ''));
    $utr_number = htmlspecialchars(trim($_POST['utr_number'] ?? ''));

    // Validate inputs
    if (empty($full_name) || empty($email) || empty($phone) || empty($event_type) || empty($utr_number)) {
        echo json_encode(["status" => "error", "message" => "Please fill all required fields."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email address."]);
        exit;
    }

    // Handle File Upload
    if (isset($_FILES['payment_screenshot']) && $_FILES['payment_screenshot']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['payment_screenshot']['tmp_name'];
        $fileName = $_FILES['payment_screenshot']['name'];
        $fileSize = $_FILES['payment_screenshot']['size'];
        $fileType = $_FILES['payment_screenshot']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        $allowedfileExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];

        if (in_array($fileExtension, $allowedfileExtensions)) {
            // unique file name
            $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
            $dest_path = $target_dir . $newFileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                // Save to database
                try {
                    $pdo->exec("USE `$dbname`");
                    $stmt = $pdo->prepare("INSERT INTO registrations (full_name, email, phone, event_type, utr_number, screenshot_path) VALUES (?, ?, ?, ?, ?, ?)");
                    $stmt->execute([$full_name, $email, $phone, $event_type, $utr_number, $dest_path]);
                    echo json_encode(["status" => "success", "message" => "Registration successful! Welcome to the event."]);
                }
                catch (PDOException $e) {
                    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
                }
            }
            else {
                echo json_encode(["status" => "error", "message" => "Error moving the file to upload directory."]);
            }
        }
        else {
            echo json_encode(["status" => "error", "message" => "Upload failed. Allowed file types: " . implode(',', $allowedfileExtensions)]);
        }
    }
    else {
        echo json_encode(["status" => "error", "message" => "Payment screenshot not uploaded or there was an error."]);
    }
}
else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
