<?php
	session_start();
	if(isset($_SESSION['db'])) {
		//$db_name = $_SESSION['db'];
		$query = trim($_GET['query']);
		if($query == '') {
			echo 'Error: No query'; 
			return;
		}
		
		$_SESSION['query'] = $query;
		echo $_SESSION['query'];
		
		
		//$db = new SQLite3('../db/' . $db_name);
		//$result = $db->query('SELECT COUNT(*) as total FROM (' . $query . ') a');
		//if(!$result) {
		//	return;
		//}
		//$data = $result->fetchArray();
		//echo $data['total'];
	} 
	else {
		echo 'Error: No database'; 
	}
	//echo $_SESSION['query'];
?>