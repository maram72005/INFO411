<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <link rel="icon" href="logo.png">
  <link rel="stylesheet" href="style_admin.css">
  <title>Model-Shop Admin</title>
</head>
<body> 

<a href="index.php?action=disconnect" class="log_out">
<img class="log_out" src="Images/logout.png">
</a>

<?php

include 'db/db_connect.php';
include 'CRUD/crud_insert.php';

session_start();

$user = $_SESSION["username"];

echo "Bienvenue " . $user;

?>
<script>
<?php

if((isset($_GET["action"]) && ($_GET["action"] == "restock"))) {

  $id_product = $_GET["product"];
  $new_stock = $_GET["new_stock"];

  update_stock_admin($conn, $id_product, $new_stock);

  $products_str = recup_articles($conn);

  echo "var products = ${products_str};\n";

  echo "var user = '${user}';\n";

} else {

  $products_str = recup_articles($conn);

  echo "var products = ${products_str};\n";
  
  echo "var user = '${user}';\n";
  
}

?>
//console.log(user);
//console.log(products);

</script>

<script src="script_admin.js" defer></script>

</body>
</html>