<?php
	session_start();
	if(!isset($_GET['db']))
		$_SESSION = array();
	else 
		$_SESSION['db'] = $_GET['db'];
?>