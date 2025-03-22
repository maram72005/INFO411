<?php

$debeug = True;

function list_products($conn) {
    $res = mysqli_query($conn, "select * from article") ;
	$tab=[] ; 
	while($row=mysqli_fetch_assoc($res)){
		$tab[]=$row ;	
	}
	return $tab;
}

// print_r(list_products($conn));

function recup_articles($conn) {
    //1- Récupère la liste des articles
    $products=list_products($conn) ;

    //2- Transforme le tableau php en tableau Js
    $products_str=json_encode($products);

    return $products_str;
}


function old_stock($conn, $id_product) {
    /* Renvoie le nombre d'article en stock */
    $sql = "SELECT stock FROM article WHERE id = $id_product";
    global $debeug ;
	if($debeug) //echo $sql ; 
	$res=mysqli_query($conn, $sql) ; 
	$tab=rs_to_tab($res) ;
	return $tab[0]["stock"] ;
}

function update_stock($conn, $id, $quant) {
    $old_stock = old_stock($conn, $id); // récup du stock avant la commande
    //print_r($old_stock);
    $new_stock = $old_stock - $quant;
    //print_r($new_stock);
        
    $sql = "UPDATE `article` SET `stock`='$new_stock'  WHERE id = $id";
    global $debeug ;
    if($debeug) //echo $sql ; 
	$res=mysqli_query($conn, $sql) ;
    return $res;
}

function MAJ_BDD_after_order($conn, $tab) {
    /* Met à jour les stocks à l'aide du panier commandé */
    $long = count($tab);
    //print_r($long);
    for($i=0; $i<$long; $i++) {
        $article = $tab[$i];
        //print_r($article);
        $id = $article["id_product"]; // recup de l'id du produit commandé
        //print_r($id);
        $quant = $article["quant_product"]; // recup la quantité commandée

        update_stock($conn, $id, $quant);
    }
}

?>