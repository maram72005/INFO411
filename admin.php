<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <link rel="icon" href="logo.png">
  <link rel="stylesheet" href="style_admin.css">
  <title>Model-Shop Admin</title>
</head>
<body> 

<?php

include 'db/db_connect.php';
include 'CRUD/crud_insert.php';

session_start();

$user = $_SESSION["username"];

echo "Bienvenue " . $user;

?>
<script>
<?php

$products_str = recup_articles($conn);

echo "var products = ${products_str};\n";

echo "var user = '${user}';\n";

?>
//console.log(user);
//console.log(products);

</script>

<script src="script_admin.js" defer></script>

</body>
</html>