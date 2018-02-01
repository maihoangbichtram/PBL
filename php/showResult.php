<?php 
	require_once('php_ref.php'); 
	session_start();
?>
<html>
	<head>
		<meta charset='utf-8'>
		<title>All results</title>
		<link rel="stylesheet" href="../css/style.css">
		<style>
			body {
				position:relative;
				background: #333 url(<?php echo $img_path;?>/bg.png) repeat;
				color: white;
				margin: 30px 30px 30px 30px;
			}
		</style>
	</head>
	<body>
		<label id='query' style='background:#E1B42B; border-radius: 5px; padding: 8px; font-size: 18px;'></label>
		<div id='result' style='margin-top: 25px;'>
			
		</div>
		<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
		<script src="<?php echo $js_path;?>/js_ref.js"></script>
		<script src="<?php echo $js_path;?>/js_fnc.js"></script>
		<script>
			$(document).ready(function() {
				//console.log('<?php echo $_SESSION['query'];?>');
				var query = '<?php echo $_SESSION['query'];?>';
				$('#query').html(query);
				var id = <?php if(isset($_GET['id'])) echo $_GET['id']; else echo 0;?>;
				get_result_table(query, 1, id);
			});
		</script>
	</body>
</html>