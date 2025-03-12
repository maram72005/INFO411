<?php
/**
 * Gestion des utilisateurs
 */
$debeug=True ; 

function insert_utilisateur($conn, $login, $password, $role){
	$password_encod = password_hash($password, PASSWORD_DEFAULT);
	$sql="INSERT INTO `comptes` (`login`, `password`, `role`) value( '$login', '$password_encod', '$role' )" ; 
	$res=mysqli_query($conn, $sql) ; 
	return $res ; 
}

function update_utilisateur($conn, $id, $login, $password, $role){
	$password_encod = password_hash($password, PASSWORD_DEFAULT);
	$sql="UPDATE `comptes` SET `login`='$login',`password`='$password_encod', `role`='$role'  WHERE id = $id" ; 
	global $debeug ;
	if($debeug) echo $sql ; 
	$res=mysqli_query($conn, $sql) ; 
	return $res ; 
}

function delete_utilisateur($conn, $id){
	$sql="DELETE FROM `comptes` WHERE id=$id" ; 
	global $debeug ;
	if($debeug) echo $sql ; 
	$res=mysqli_query($conn, $sql) ; 
	return $res ;
}

function select_utilisateur($conn, $id){
	$sql="SELECT * FROM `comptes` WHERE id=$id" ; 
	global $debeug ;
	if($debeug) echo $sql ; 
	$res=mysqli_query($conn, $sql) ; 
	$tab=rs_to_tab($res) ;
	return $tab[0] ;
}

function list_utilisateur($conn){
	$sql="SELECT * FROM `comptes`"; 
	$res=mysqli_query($conn, $sql) ; 
	return rs_to_tab($res) ;
}

function already_in_use($conn, $login) {
	$sql="SELECT login FROM `comptes` WHERE login='$login'" ; 
	$res=mysqli_query($conn, $sql) ; 
	$tab=rs_to_tab($res) ;
	if (count($tab) > 0) {
		return  True;
	} else {
		return False;
	}
}

function list_login_utilisateur($conn){
	$sql="SELECT login FROM `comptes`"; 
	$res=mysqli_query($conn, $sql) ; 
	$res = rs_to_tab($res) ;
	$tab = [];
	for ($i = 0; $i < count($res); $i++) {
		$tab[] = $res[$i]["login"];
	}
	return $tab;
}

?>