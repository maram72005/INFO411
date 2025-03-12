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

session_start() ;

$user = $_SESSION["username"];

print_r($user);

function list_products($conn) {
    $res = mysqli_query($conn, "select * from article") ;
	$tab=[] ; 
	while($row=mysqli_fetch_assoc($res)){
		$tab[]=$row ;	
	}
	return $tab;
}

// print_r(list_products($conn));

//1- Récupère la liste des articles
$products=list_products($conn) ;

//2- Transforme le tableau php en tableau Js
$products_str=json_encode($products);

?>

<script> 
<?php 
echo "const products = ${products_str}";
?> 

console.log(products);
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

<img class="voir_panier" src="Images/voir_panier.jpg" >

<section class="panier">
    <img class="croix_panier" src="Images/croix.png" alt="">
</section>

<section class="products_container"></section>

<section class="products_details_container"></section>

<script src="script.js" defer></script>

</body>
</html>
