<?php
	session_start();
	if(isset($_SESSION['db'])) {
		require_once('php_ref.php');
		
		$db_name = $_SESSION['db'];
		$table = $_GET['table'];
		$query = 'SELECT * FROM ' . $table;
		$count = 1;
		
		$db = new SQLite3('../db/' . $db_name);
		$result = $db->query($query);
		$cols = $result->numColumns();
		$data = '<table id="result"><tr><td>Row #</td>';
		
		for($i = 0; $i < $cols; $i++) {
			$data .= '<th>' . $result->columnName($i) . '</th>';
		}
		
		$data .= '</tr>';
		
		while($row = $result->fetchArray()) {
			for($i = 0; $i < $cols; $i++) {
				$i == 0 ? $data .= '<tr><td>' . $count . '</td>' : '';
				$col = $result->columnName($i);
				$data .= '<td>' . $row[$col] . '</td>';
				$i == $cols - 1 ? $data .= '</tr>' : '';
			}
			$count++;
		}
		$data .= '</table>';
		echo $data;
	}
?>