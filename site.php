<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Model-Shop</title>
    <link rel="stylesheet" href="style_site.css">
    
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

if((isset($_GET["action"]) && ($_GET["action"] == "commande"))) {
    // echo "commande";

    $long = $_GET["long"];
    $order = [];

    for($i=0; $i<$long; $i++) {
        $product_ordered = $_GET["id_art".strval($i)];
        $quantity_ordered = $_GET["quant".strval($i)];

        // print_r($product_ordered);
        // print_r($quantity_ordered);

        $order[] = ["id_product" => $product_ordered, "quant_product" => $quantity_ordered];
    }
    //print_r($order);

    MAJ_BDD_after_order($conn, $order); // On met à jour la base de données en enlevant les produits commandés

    $products_str = recup_articles($conn); // On récupère la base de données maintenant mise à jour
    
    echo "products = ${products_str}";
} else {
    $products_str = recup_articles($conn);

    echo "var products = ${products_str}";
}

?>

</script>


<h1> Bienvenue sur Model-Shop ! </h1>

<div class="filtre">

    <p> Vous pouvez filtrer les produits suivant leur échelle </p>

    <div>
    <input type="radio" id="all" name="scale" value="all" checked />
    <label for="all"> Toutes échelles </label> 
    </div>
        
    <div>
    <input type="radio" id="1/32" name="scale" value="1/32" />
    <label for="1/32"> 1/32 </label> 
    </div>
        
    <div>
    <input type="radio" id="1/48" name="scale" value="1/48" />
    <label for="1/48"> 1/48 </label> 
    </div>
    
    <div>
    <input type="radio" id="1/72" name="scale" value="1/72" />
    <label for="1/72"> 1/72 </label> 
    </div>
        
    <button id="bouton_filtre"> Afficher les produits correspondants </button>
        
</div>

<a href="index.php?action=disconnect" class="log_out">
<img class="log_out" src="Images/logout.png">
</a>

<img class="voir_panier" src="Images/voir_panier.jpg" >

<section class="panier">
    <img class="croix_panier" src="Images/croix.png" alt="">
</section>

<section class="products_container"></section>

<section class="products_details_container"></section>

<script src="script.js" defer></script>

</body>
</html>
