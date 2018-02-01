<?php
	session_start();
	if(isset($_SESSION['db'])) {
		require_once('php_ref.php');
		
		$db_name = $_SESSION['db'];
		$query = $_SESSION['query'];
		if($query == '') {
			return;
		}
		$count = 1;
		if(isset($_GET['page'])) {
			$page = $_GET['page'];
			$start = ($page - 1) * $page_limit;
			$query .= ' LIMIT ' . $page_limit . ' OFFSET ' . $start;
			$count = $start + 1;
		}
		
		/*$db = new SQLite3('../db/' . $db_name);
		$result = $db->query($query);
		if(!$result) { 
			return;
		}
		$cols = $result->numColumns();
		$data = '<table id="result"><tr><td>Row #</td>';
		
		for($i = 0; $i < $cols; $i++) {
			$data .= '<th>' . $result->columnName($i) . '</th>';
		}
		
		$data .= '</tr>';
		
		while($row = $result->fetchArray()) {
			for($i = 0; $i < $cols; $i++) {
				$i == 0 ? $data .= '<tr id="' . $count . '"><td>' . $count . '</td>' : '';
				$col = $result->columnName($i);
				$data .= '<td>' . $row[$col] . '</td>';
				$i == $cols - 1 ? $data .= '</tr>' : '';
			}
			$count++;
		}
		$data .= '</table>';*/
		echo $data;
	} else {
		echo 'Error: No database'; 
	}
?>