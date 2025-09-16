<?php
// Basic contact form handler
// Ensure this file runs on a PHP-enabled server (e.g., XAMPP, Apache with PHP)

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo 'Method Not Allowed';
  exit;
}

function sanitize_text(string $value): string {
  $value = trim($value);
  $value = str_replace(["\r", "\n"], ' ', $value); // prevent header injection
  return filter_var($value, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
}

$firstName = isset($_POST['first_name']) ? sanitize_text($_POST['first_name']) : '';
$lastName  = isset($_POST['last_name']) ? sanitize_text($_POST['last_name']) : '';
$email     = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) : false;
$phone     = isset($_POST['phone']) ? sanitize_text($_POST['phone']) : '';
$subject   = isset($_POST['subject']) ? sanitize_text($_POST['subject']) : 'New Contact Message';
$message   = isset($_POST['message']) ? trim($_POST['message']) : '';

if (!$firstName || !$lastName || !$email || !$subject || !$message) {
  http_response_code(400);
  echo 'Please complete all required fields with a valid email.';
  exit;
}

$to = 'info@altovian.net'; // Change if needed
$emailSubject = 'Contact Form: ' . $subject;

$bodyLines = [
  'You have received a new message from the website contact form:',
  '',
  'Name: ' . $firstName . ' ' . $lastName,
  'Email: ' . $email,
  'Phone: ' . $phone,
  '',
  'Message:',
  $message,
];
$body = implode("\n", $bodyLines);

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Altovian Website <no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'altovian.net') . '>';
$headers[] = 'Reply-To: ' . $email;

$sent = @mail($to, $emailSubject, $body, implode("\r\n", $headers));

if ($sent) {
  // Simple success page
  echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Thank You</title><link rel="stylesheet" href="assets/css/main.css"></head><body><div style="max-width:720px;margin:60px auto;text-align:center;">';
  echo '<h2>Thank you!</h2><p>Your message has been sent. We will get back to you shortly.</p><p><a href="contact.html" style="text-decoration:underline;">Back to Contact</a></p></div></body></html>';
} else {
  http_response_code(500);
  echo 'Sorry, your message could not be sent at this time. Please try again later.';
}

?>


