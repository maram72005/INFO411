<?php

/* include '../../db/db_connect.php'; */

function select_id_user($conn, $login){
	$sql="SELECT id FROM `comptes` WHERE login='$login'" ;  
	$res=mysqli_query($conn, $sql) ; 
	$tab=rs_to_tab($res) ;
	if (count($tab) > 0) {
		return $tab[0]['id'] ;
	}
}

/* print_r(select_id_user($conn,"avocatmb")); */

function select_user_password($conn, $login){
	$sql="SELECT password FROM `comptes` WHERE login='$login'" ; 
	$res=mysqli_query($conn, $sql) ; 
	$tab=rs_to_tab($res) ;
	if (count($tab) > 0) {
		return $tab[0]['password'] ;
	}
}

/* print_r(select_user_password($conn,"avocatmb")); */

function select_id_password($conn, $password){
	$sql="SELECT id FROM `comptes` WHERE password='$password'" ; 
	$res=mysqli_query($conn, $sql) ; 
	$tab=rs_to_tab($res) ;
	if (count($tab) > 0) {
		return $tab[0]['id'] ;
	}
}

/* print_r(select_id_password($conn, "password")); */

function select_role($conn, $login){
	$sql="SELECT role FROM `comptes` WHERE login='$login'" ; 
	$res=mysqli_query($conn, $sql) ; 
	$tab=rs_to_tab($res) ;
	return $tab[0]['role'] ;
}

/* print_r(select_role($conn, 1)); */


function login_password_ok($conn, $login, $password) {
    /* Permet de tester si le mot de passe et le nom d'utilisateur saisis sont concomitants */
    $sql = "SELECT password FROM comptes WHERE login LIKE '$login'";
    $req = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($req);
    $data_password =  $row["password"];
	/* print_r($row); */
    if (password_verify($password, $data_password)) {
        $res = true;
    } else {
        $res = false;
    }
    return $res;
}

?>