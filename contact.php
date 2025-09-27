<?php
/**
 * Contact Form Handler
 * 
 * This is a basic PHP script to handle contact form submissions.
 * Customize this according to your hosting provider's email configuration.
 */

// Set content type to JSON
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Validate and sanitize input
$name = isset($_POST['name']) ? trim(htmlspecialchars($_POST['name'])) : '';
$email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
$message = isset($_POST['message']) ? trim(htmlspecialchars($_POST['message'])) : '';

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Email configuration - UPDATE THESE VALUES
$to = 'hello@hijrahassalam.com';  // Your email address
$subject = 'New Contact Form Submission from ' . $name;
$headers = [
    'From: ' . $email,
    'Reply-To: ' . $email,
    'Content-Type: text/html; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

// Email body
$email_body = "
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body>
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Message:</strong></p>
    <p>{$message}</p>
    <hr>
    <p><small>Sent from: {$_SERVER['HTTP_HOST']}</small></p>
</body>
</html>
";

// Send email
try {
    $mail_sent = mail($to, $subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
    } else {
        throw new Exception('Failed to send email');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please try again later.']);
    
    // Log error for debugging (optional)
    error_log('Contact form error: ' . $e->getMessage());
}
?>
