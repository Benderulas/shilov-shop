<?php

session_start();
require_once("DataBase.php");
require_once("classes/User.php");

if(isset($_SESSION['is_auth']) == false) $_SESSION['is_auth'] = false;

if($_SESSION['is_auth']) 
{
	
	$user = new User();
	$user->SetByLogin($_SESSION['login'], $mysqli);

	if ($user->id == NULL) $exception = "Authorization ERROR, can't find user in DB";
}
else
{
	$user = false;
}

?>