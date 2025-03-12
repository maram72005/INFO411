<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Connexion</title>
  <link rel="stylesheet" href="style_index.css">
</head>

<body>
<div>
<img class="logo" src="logo.png"/>
</div>

<br />	

<h1> GorillaPod </h1>
<form method="POST" action="creation_compte.php">
	
<table class="insertion">
	
<thead>

<tr>
<th> Nom d'utilisateur : </th>
</tr>

<tr>
<th> <input type="text" name="login"> </th>
</tr>

<br />

<tr>
<th> Mot de passe : </th>
</tr>

<tr>
<th> <input type="text" name="passwd"> </th>
</tr>

<br />

<tr>
<th> Code de création : </th>
</tr>

<tr>
<th> <input type="text" name="code"> </th>
</tr>

</thead>

</table>
<br />
	
<input type="submit" value="Créer un compte">
	
<?php 

include 'db/db_connect.php';
include 'CRUD/crud_utilisateur.php';

if (isset($_POST["login"]) && isset($_POST["passwd"]) && ($_POST["code"] == "7474")) {
	$login = $_POST["login"];
	$password = $_POST["passwd"];
	
	if (already_in_use($conn, $login)) {
		echo "<p id='incorrect' > Nom d'utilisateur déjà attribué ! </p>";
	} else {
		insert_utilisateur($conn, $login, $password, "client");
		echo "<p id='incorrect' > Votre compte a bien été créé ! </p>";
	}

}

?>

</form>

<br />

<a href="index.php">Retour à l'interface de connexion</a>

</body>
</html>