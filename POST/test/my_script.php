<?php


header('Content-Type: application/json;charset=utf-8');

$json = file_get_contents('php://input');

$data = json_decode($json);


//echo($json);

var_dump($data->login);



?>