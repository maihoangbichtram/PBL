<?php
	session_start();
?>
<html>
	<head>
		<meta charset='utf-8'>
		<title>SQL Tables</title>
		<link rel="stylesheet" href="css/style.css">
		<style>
			body {
				position:relative;
				background: #333 url(img/bg.png) repeat;
				color: white;
				margin: 30px 30px 30px 30px;
			}
			
		</style>
	</head>
	<body>
		<p style='font-size: 18px;'>Which table?</p>
		<select id='table_list' style='margin-bottom: 20px; margin-top: 10px;'>
		</select>
		<div id='result'>
			
		</div>
		<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
		<script src="<?php echo $js_path;?>/js_ref.js"></script>
		<script src="<?php echo $js_path;?>/js_fnc.js"></script>
		<script>
			$(document).ready(function() {
				$.ajax({
					type: "GET",
					dataType: "json",
					url: REST_path + 'query/SELECT name FROM sqlite_master WHERE type="table"',
					success:function(data) {
						console.log(data);
						var arr = data.row;
						for(var i = 0; i < arr.length; i++) {
						/*var arr = data.split('/');
						for(var i = 0; i < arr.length; i++) {*/
							if(i == 0) {
								var query = "SELECT * FROM " + arr[i].name;
								get_result_table(query, 1);
							}
							if(arr[i] != '')
								$('#table_list').append('<option>' + arr[i].name + '</option>');						
						}
					}
				});
			});
			
			$('#table_list').change(function() {
				var val = $('#table_list').val();
				var query = "SELECT * FROM " + val;
				get_result_table(query, 1, php_path);
			});
		</script>
	</body>
</html>