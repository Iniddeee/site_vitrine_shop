<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

// Récupérer les données JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validation
if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Données incomplètes']);
    exit;
}

// Nettoyage des données
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = isset($data['phone']) ? htmlspecialchars(strip_tags($data['phone'])) : '';
$subject = isset($data['subject']) ? htmlspecialchars(strip_tags($data['subject'])) : '';
$message = htmlspecialchars(strip_tags($data['message']));

// Validation email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email invalide']);
    exit;
}

// Configuration email à modifier
$to = 'contact@fixphone.ch'; // Email du client
$from = 'noreply@votredomaine.ch';
$subject_email = '[FixPhone] Nouveau message de ' . $name;

// Corps de l'email
$email_body = "
Nouveau message de contact :

Nom: $name
Email: $email
Téléphone: $phone
Sujet: $subject

Message:
$message

---
Date: " . date('d/m/Y H:i:s');

// En-têtes email
$headers = "From: $from\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoyer l'email
if (mail($to, $subject_email, $email_body, $headers)) {
    // Sauvegarder dans un fichier log (optionnel)
    $log_entry = date('Y-m-d H:i:s') . " - $name ($email): $message\n";
    file_put_contents('messages.log', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true,
        'message' => 'Message envoyé avec succès'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de l\'envoi']);
}
?>
