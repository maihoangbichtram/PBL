<?php 
	require_once('php_ref.php');
?>
<html>
	<head>
		<meta charset='utf-8'>
		<link rel="stylesheet" href="../font/awesome/css/font-awesome.min.css">
		<link rel="stylesheet" href="../css/style.css">
		<style>
			body {
				position:relative;
				background: #333 url(<?php echo $img_path;?>/bg.png) repeat;
				color: white;
				margin: 30px 30px 30px 30px;
			}
			
			body::-webkit-scrollbar
			{
				display: none;
			}
		</style>
	</head>
	<body >
		<div style='display:relative;'>
			<label class="switch" id='resize_switch'>
				<input class="switch-input" id='resize' type="checkbox" />
				<span class="switch-label" data-on="On" data-off="Off"></span> 
				<span class="switch-handle"></span> 
			</label>
			
			<div id='title'>
			SQL Query: <label id='db_name'>
			
					<select id='db_list' style='background: #E8DAD8'>
						<option></option>
					</select>
				
					</label>.db 
					<label id='title_icon'></label>
			</div>
			<img src='../img/sql.png' id='sql_icon'>
			<label id='fun_anm' class='dimmer' style='position:absolute;top:3px;left:810px;'></label>
		</div>	
			<textarea id='query' style="word-wrap: break-word; resize: vertical; height: 160px; "></textarea>
			<br>
			<button type='button' class='btn' id='execute' align='right'>Execute</button>
			<button type='button' class='btn' id='clear' align='right'><i class="fa fa-eraser" aria-hidden="true"></i> Clear</button>
		</div>
		<div id='animated_icon' style='margin-top: 10px;' class='dimmer' style='position:relative;'>
			<p style='margin-left: 100px;margin-top:60px;'><img src='../img/hello_1.gif' height="300" class="dim-image"></p>
			<img src='../img/sql_1.png' style='position:absolute;top:164px;right:71px;' height='250'>
		</div>
		<div id='resultDiv' class='displayOff'>
			<div id='utility' class=''>
			<table><tr>
				<td align='right' style='width:10px;'><button type='button' id='displayAll' class='iconBtn tooltip' style="background-color: #F32C52;"><i class="fa fa-external-link"  aria-hidden="true"></i><span class="tooltiptext">Display all rows</span></button></td>
				<td style='padding-right: 10px; font-family:Courier, monospace;'>Total rows: <label id='total_row'></label></td>
			</tr></table>
			</div>
			<div id='result'>
		
			</div>
			<div class="pagination" id='pagination'>
			
			</div>
			<br><br>
			
		</div>
		
		<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
		<script src="<?php echo $js_path;?>/js_ref.js"></script>
		<script src="<?php echo $js_path;?>/js_fnc.js"></script>
		<script>
			var page_limit = <?php echo $page_limit;?>;	
			var page_max = <?php echo $page_max; ?>;
		</script>
		<script src="<?php echo $js_path;?>/frame1.js"></script>
	</body>
</html>