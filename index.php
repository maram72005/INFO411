<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <link rel="icon" href="logo.png">
  <link rel="stylesheet" href="style_index.css">
  <title>Connexion</title>
</head>
<body>

<div>
<img class="logo" src="logo.png"/>
</div>
<br />	

<h1> Model-shop </h1>

<p> Bienvenue sur Model-shop, un site sur lequel vous pouvez acheter des modèles réduits à monter </p>

<form method="POST" action="index.php">
	
<table class="insertion">

<thead>

<tr>
<th> Nom d'utilisateur: </th>
</tr>

<tr>
<th> <input type="text" name="login"> </th>
</tr>

<br/>

<tr>
<th> Mot de passe </th> 
</tr>

<tr>
<th> <input type="password" name="passwd"> </th>
</tr>

</thead>

</table>
<br />
<input type="submit" value="Se connecter"> 
	
</form>
<br/>

<?php

include 'db/db_connect.php';
include 'CRUD/crud_admin.php';

session_start() ;

if ((isset($_POST["login"])) && (isset($_POST["passwd"]))) {
	connexion($conn);
}

function connexion($conn) {

	if ((strlen(select_id_user($conn, $_POST["login"])) > 0) and (strlen(select_id_password($conn, $_POST["passwd"])) > 0)) {
		
		$login = $_POST["login"];
		$password = $_POST["passwd"];

		if ($password == select_user_password($conn, $login)) {
			
			$role = select_role($conn, $login);
			
			if ($role == "admin") {
				
				/* session admin */
				$_SESSION["admin"]=time() ; 
				
				/* redirection */
				header("Location: admin/admin.php") ; 
			}
			
			if ($role == "client") {
				
				/* session client */
				$_SESSION["client"]=time() ; 
				$_SESSION["username"]=$login;
				
				/* redirection */
				header("Location: client.php") ; 
			}
			
		} else {
			echo "<p class='incorrect'> Nom d'utilisateur ou mot de passe incorrect </p>";
		}

	} else {
		echo "<p class='incorrect'> Veuiller saisir un nom d'utilisateur et un mot de passe conforme </p>";
	}

}

include 'db/db_disconnect.php';

if(isset($_GET["action"])){
	$action=$_GET["action"] ;
	if($action=="disconnect"){
		session_unset();
	}
}

?>

<a href="creation_compte.php">Cliquer ici pour créer un compte</a>

</body>
</html>