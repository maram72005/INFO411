<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

$conn = mysqli_connect("localhost", "grp2","aeb7naiJ", "db_grp2");
mysqli_set_charset($conn, "utf8");

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
