<?php
	session_start();
	
	$db_name = $_SESSION['db'];
	$query = 'SELECT name FROM sqlite_master WHERE type="table"';
	$data = '';
	$db = new SQLite3('../db/' . $db_name);
	$result = $db->query($query);
	while($row = $result->fetchArray()) {
			$data .= $row[0] . '/';
		}
	echo $data;
?>