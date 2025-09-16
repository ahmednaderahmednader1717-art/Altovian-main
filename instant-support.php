<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require "vendor/autoload.php";

$fullName          = $_POST['full_name']          ?? '';
$company           = $_POST['company']            ?? '';
$email             = $_POST['email']              ?? '';
$phone             = $_POST['phone']              ?? '';
$subject           = $_POST['subject']            ?? '';
$category          = $_POST['category']           ?? '';
$severity          = $_POST['severity']           ?? '';
$description       = $_POST['description']        ?? '';
$preferredContact  = $_POST['preferred_contact']  ?? '';

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug  = SMTP::DEBUG_OFF;
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'ahmednaderahmednader1717@gmail.com';
    $mail->Password   = 'hpthicmmqgpxjcic';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('ahmednaderahmednader1717@gmail.com', 'Altovian Website');

    // Fixed recipient (Instant Support)
    $mail->addAddress('support@altovian.net', 'Altovian Support');

    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($email, $fullName ?: $email);
    }

    $mail->isHTML(true);
    $mail->Subject = ($subject ?: 'Instant Support Request') . ' [' . ($severity ?: 'Severity N/A') . ']';
    $mail->Body    =
        '<b>Name:</b> ' . htmlspecialchars($fullName) . '<br>' .
        '<b>Company:</b> ' . htmlspecialchars($company) . '<br>' .
        '<b>Email:</b> ' . htmlspecialchars($email) . '<br>' .
        '<b>Phone:</b> ' . htmlspecialchars($phone) . '<br>' .
        '<b>Category:</b> ' . htmlspecialchars($category) . '<br>' .
        '<b>Severity:</b> ' . htmlspecialchars($severity) . '<br>' .
        '<b>Preferred Contact:</b> ' . htmlspecialchars($preferredContact) . '<br><br>' .
        '<b>Description:</b><br>' . nl2br(htmlspecialchars($description));

    $mail->send();
    echo '✅ Support request sent successfully';
} catch (Exception $e) {
    echo '❌ Support request failed. Mailer Error: ' . $mail->ErrorInfo;
}


