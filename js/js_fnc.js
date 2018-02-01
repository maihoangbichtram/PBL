function get_result_table(query, start_row) {	
	console.log(query);
	var id = '';
	var db;
	if(arguments[2] != null)
		id = arguments[2];
	//$.ajax({url: local_php_path + '/get_db.php', success: function(db_name) {
		//db = db_name;
		//console.log(db);
	
	
	$.ajax({
		type: "GET",
		dataType: "json",
		url: REST_path + "query/" + query,
		success: function(data){ 
			var myData = [];
			myData = data.row;	
			
			var count = start_row;
			var col = [];
			for (var i = 0; i < myData.length; i++) {
				for (var key in myData[i]) {
					if (col.indexOf(key) === -1) {
						col.push(key);
					}
				}
			}

			// CREATE DYNAMIC TABLE.
			var table = document.createElement("table");

			// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

			var tr = table.insertRow(-1);			// TABLE ROW.
			
			var th = document.createElement("th");      // TABLE HEADER.
			th.innerHTML = "Row #";
			tr.appendChild(th);
			
			for (var i = 0; i < col.length; i++) {
				th = document.createElement("th");      // TABLE HEADER.
				th.innerHTML = col[i];
				tr.appendChild(th);
			}

			// ADD JSON DATA TO THE TABLE AS ROWS.
			for (var i = 0; i < myData.length; i++) {

				tr = table.insertRow(-1);
				var tabCell = tr.insertCell(-1);
				tabCell.id = count;
				tabCell.innerHTML = count;
				
				for (var j = 0; j < col.length; j++) {
					var tabCell = tr.insertCell(-1);
					tabCell.innerHTML = myData[i][col[j]];
				}
				count++;
			}

			// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
			var divContainer = document.getElementById("result");
			divContainer.innerHTML = "";
			divContainer.appendChild(table);
			
			if(id != '') {
				$(window).scrollTop($('#' + id).offset().top);
			}
		}
	});
	//}});
}