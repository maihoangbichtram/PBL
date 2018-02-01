var query = '';
var db = '';

$(document).ready(function() {
	$.ajax({url:'session_start.php'});
	$.ajax({
		url: db_path,
		success: function(data) {
			$(data).find('a:contains(.db)').each(function() {
				var db = $(this).attr('href');
				if(db.indexOf('/db/') != -1)
					db = db.substring(db.indexOf('/db/') + 4);
				$('#db_list').append('<option>' + (db.split('.'))[0] + '</option>');
			});
		}
	});
});

$('#execute').click(function() {
	query = $('#query').val();
	console.log('db = ' + db);
	$.ajax({
		type: "GET",
		dataType: "json",
		url: REST_path + "query/SELECT COUNT(*) as total FROM (" + query + ") a",
		success:function(result) {
			var a = JSON.stringify(result.row[0]);
			result = (a.split(/[:}]/))[1];
			console.log('result = ' + result);
			$('#animated_icon').hide();
			$('#resultDiv').show();
			if(window.parent.$("#frame2").width() == 0)
				showAnm();
			$('#pagination').html('');
			if(Number.isInteger(result * 1) && result != '') {
				
				
				$('#total_row').html(result);
				$('#utility').show();
				$('#displayAll').show();
				$.ajax({data: {"query" : query}, url: "pages.php", success: function(out) {console.log(out);}});
				var pages = Math.round(result/page_limit);
				for(var i = 1; i <= pages; i++) {
					if(i == 1) {
						$('#pagination').append('<a class="active" id="' + i + '">' + i + '</a>');
					} else if(i <= page_max)
						$('#pagination').append('<a id="' + i + '">' + i + '</a>');
					else {
						$('#pagination').append('<a id="more">...</a>');
						break;
					}
				}
				//$('#result').load('pagination.php?page=1');
				get_result(1);
			} else {
				var error;
				resetUtility();
				if(result.indexOf('table') != -1) {
					$('#result').html(result);
					var text = $('.xdebug-error').find('th:first').text();
					error = text.substring(text.indexOf('Warning'), text.indexOf(' in '));
				} else if(result.indexOf('Error') != -1) {
					error = result;
				} else
					error = 'Invalid query';
				$('#result').html('<p class="error"><i class="fa fa-times-circle"></i>' + error + '</p>');
			}	
		}
	});
});

function resetUtility() {
	$('#total_row').html(0);
	$('#displayAll').hide();
}

function query_setup(q) {
	$.ajax({
		url: 'session_start.php',
		type: 'get',
		data: {'query': q},
		success:function() {}
	});
}

$('#pagination').on('click', function(e) {
	console.log(e.target.id);
	if(e.target.id != 'more') {
		$('#pagination a').removeClass('active');
		$(e.target).addClass('active');
		var page = e.target.id;
		//$('#result').load('pagination.php?page=' + page);
		get_result(page);
	} else {
		var id = page_limit * page_max + 1;
		window.open('showResult.php?id=' + id,'SQL Result');
	}
});

function query_change() {
	$('#result').html('');
	$('#pagination').html('');
	resetUtility();
}

$('#clear').click(function() {
	$('#query').val('');
	query_change();
});

$('#displayAll').click(function() {
	window.open('showResult.php','SQL Result').focus();
});

$('#query').on('keyup', function() {
	if($('#query').val() != query)
		if(query != '')
			query_change();
});

$('#db_list').change(function() {
	resetUtility();
	if(query != '') {
		$('#query').select();
		query_change();
	}
	var option = $(this).val();
	if(option != '') {
		$.ajax({
			url: 'session_start.php',
			type: 'get',
			data: {'db': option}
		});
		$.ajax({
			url: REST_path + 'db/' + option,
			type: 'get',
		});
		db = option;
		parent.frame2.document.getElementById('er').innerHTML = '<img src="' + er_path + '/' + option + '.PNG">'; 
		$('#title_icon').html('<button type="button" class="iconBtn tooltip" style="position:absolute; top:-6px; left:268px; background-color: #3dd28d;" onclick="window.open(\'' + html_path + '/showTable.html\',\'SQL Table\')"><i class="fa fa-external-link" aria-hidden="true"></i><span class="tooltiptext">Display all tables</span></button>');
		if(window.parent.$("#frame2").width() == 0)
			$('#resize').change();
	} else {
		$.ajax({
			url: 'session_start.php'
		});
		$.ajax({
			url: REST_path + 'db/null',
			type: 'get',
		});
		parent.frame2.document.getElementById('er').innerHTML = '';
		$('#title_icon').html('');
		if(window.parent.$("#frame2").width() != 0)
			$('#resize').change();
	}
});

function generateAnm() {
	$.ajax({
		url: img_path + '/animation',
		success: function(data) {
			var count = $(data).find('a:contains(.gif)').length;
			var ranNum = Math.floor((Math.random() * count) + 1);
			$('#fun_anm').html('<img src="' + img_path + '/animation/' + ranNum + '.gif" height="280" class="dim-image">');
		}
	});
}

function showAnm() {
	if(!$('#animated_icon').is(':visible')) {
		generateAnm();
		$('#fun_anm').show();
	}
}

$('#resize').change(function() {
	var frame1 = window.parent.$("#frame1").width();
	var frame2 = window.parent.$("#frame2").width();
	if(frame2 != 0) {
		//window.parent.$("#frame1").width(frame1 * 1.005 + frame2);
		window.parent.$("#frame1").css('width', '100%');
		window.parent.$("#frame2").width(0);
		$('#resize').prop('checked', false);
		if(! $('#resultDiv').is(':visible')) {
			$('#animated_icon').show();
		}
		showAnm();
	} else {
		//window.parent.$("#frame2").width(frame1 * 0.4);
		window.parent.$("#frame2").css('width', '40%');
		//window.parent.$("#frame1").width(frame1 * 0.597);
		window.parent.$("#frame1").css('width', '59.7%');
		$('#resize').prop('checked', true);
		$('#animated_icon').hide();
		$('#fun_anm').hide();
	}
});

function get_result(page) {
	var start = (page - 1) * page_limit;
	var combined_query = query + ' LIMIT ' + page_limit + ' OFFSET ' + start;
	
	get_result_table(combined_query, start + 1);
}
