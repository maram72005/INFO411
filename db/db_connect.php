<?php
define ('SERVEUR_BD','localhost');
define ('LOGIN_BD','root');
define ('PASS_BD','root');
define ('NOM_BD','info411.sql');


$conn = mysqli_connect (SERVEUR_BD, LOGIN_BD, PASS_BD);
	//Connexion au serveur de bases de données
	if (mysqli_connect_errno()) {
		echo 'Désolé, connexion au serveur ' . SERVEUR_BD . ' impossible, '. mysqli_connect_error(), "\n";
    	exit();
	}
	// Sélection de la base de données
	mysqli_select_db($conn, NOM_BD);
	if (mysqli_connect_errno()) {
		echo 'Désolé, accès à la base ' . NOM_BD . ' impossible, '. mysqli_connect_error(), "\n";
    	exit();
	}
	// Spécification de l'encodage UTF-8 pour dialoguer avec la BD
	if (!mysqli_set_charset($conn, 'UTF8')) {
    	echo 'Erreur au chargement de l\'encodage UTF-8 : ', mysqli_connect_error(), "\n";
	}


/**
 * Fonction auxiliaire pour transformer un rs en tableau
 */
function rs_to_tab($rs){
	$tab=[] ; 
	while($row=mysqli_fetch_assoc($rs)){
		$tab[]=$row ;	
	}
	return $tab;
}

?>
