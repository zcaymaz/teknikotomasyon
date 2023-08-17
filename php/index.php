<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <title>Teknik Otomasyon v1.0</title>
    <script defer="defer" src="/static/js/main.826eca83.js"></script>
    <link href="/static/css/main.4be621f4.css" rel="stylesheet">
</head>

<body>
    <div id="root"></div>
</body>

</html>
<?php
// Veritabanı bilgilerini ayarlayın
$host = 'localhost';
$dbname = 'u547409376_technic';
$username = 'u547409376_tech';
$password = 'Teknik314';

// PDO nesnesini oluşturun
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Hataları görüntülemek için istisna modunu ayarlayın
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Veritabanı bağlantısı başarılı.<br>";

    // Sorgu çalıştırma
    $query = "SELECT * FROM kullanicilar";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    // Sonuçları işleme
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "Kullanıcı Adı: " . $row['u547409376_admin'] . "<br>";
    }
} catch (PDOException $e) {
    echo "Hata: " . $e->getMessage();
}
?>
