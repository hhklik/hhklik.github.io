var db
getPagination('#table-id');
	$('#maxRows').trigger('change');
	function getPagination (table){

		  $('#maxRows').on('change',function(){
		  	$('.pagination').html('');						// reset pagination div
		  	var trnum = 0 ;									// reset tr counter 
		  	var maxRows = parseInt($(this).val());			// get Max Rows from select option
        
		  	var totalRows = $(table+' tbody tr').length;		// numbers of rows 
			 $(table+' tr:gt(0)').each(function(){			// each TR in  table and not the header
			 	trnum++;									// Start Counter 
			 	if (trnum > maxRows ){						// if tr number gt maxRows
			 		
			 		$(this).hide();							// fade it out 
			 	}if (trnum <= maxRows ){$(this).show();}// else fade in Important in case if it ..
			 });											//  was fade out to fade it in 
			 if (totalRows > maxRows){						// if tr total rows gt max rows option
			 	var pagenum = Math.ceil(totalRows/maxRows);	// ceil total(rows/maxrows) to get ..  
			 												//	numbers of pages 
			 	for (var i = 1; i <= pagenum ;){			// for each page append pagination li 
			 	$('.pagination').append('<li data-page="'+i+'">\
								      <span>'+ i++ +'<span class="sr-only">(current)</span></span>\
								    </li>').show();
			 	}											// end for i 
     
         
			} 												// end if row count > max rows
			$('.pagination li:first-child').addClass('active'); // add active class to the first li 
        
        
        //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT
       showig_rows_count(maxRows, 1, totalRows);
        //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT

        $('.pagination li').on('click',function(e){		// on click each page
        e.preventDefault();
				var pageNum = $(this).attr('data-page');	// get it's number
				var trIndex = 0 ;							// reset tr counter
				$('.pagination li').removeClass('active');	// remove active class from all li 
				$(this).addClass('active');					// add active class to the clicked 
        
        
        //SHOWING ROWS NUMBER OUT OF TOTAL
       showig_rows_count(maxRows, pageNum, totalRows);
        //SHOWING ROWS NUMBER OUT OF TOTAL
        
        
        
				 $(table+' tr:gt(0)').each(function(){		// each tr in table not the header
				 	trIndex++;								// tr index counter 
				 	// if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
				 	if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
				 		$(this).hide();		
				 	}else {$(this).show();} 				//else fade in 
				 }); 										// end of for each tr in table
					});										// end of on click pagination list
		});
											// end of on select change 
		 
								// END OF PAGINATION 
    
	}	


			

// SI SETTING
$(function(){
	// Just to append id number for each row  
	default_index();

	var changeDB = function(){
		/*db.transaction(function (tx) {  
	      tx.executeSql('SELECT U.rowid, U.name, U.email, U.status FROM USERS U', [], function (tx, results) {  
	          var len = results.rows.length, i;  
	          // document.getElementById("tblGrid").innerHTML = '';  
	          $("#data_tbody").find("tr").remove();  
	          var str = '';  
	          for (i = 0; i < len; i++) {  
	             	str += `
	             		<tr>
	             			<td>${results.rows.item(i).rowid}</td>
										<td>${results.rows.item(i).name}</td>
										<td>${results.rows.item(i).email}</td>
										<td>${results.rows.item(i).status}</td>
									</tr>
	             	`
	              document.getElementById("data_tbody").innerHTML += str;
	              $('#maxRows').trigger('change');
	              str = '';  
	      		}
	      })
	  })*/ 
	  //${e.result.rows[i].status}
	  db.query("SELECT U.rowid, U.name, U.email, U.status FROM USERS U", function(e){
	  	if(typeof e.result !== 'undefined'){
		  	$("#data_tbody").find("tr").remove();  
		  	var str = '';  
		  	for(var i = 0; i < e.result.rows.length; i++){
	       	str += `
	       		<tr>
	       			<td>${e.result.rows[i].rowid}</td>
							<td>${e.result.rows[i].name}</td>
							<td>${e.result.rows[i].email}</td>
							<td>
								<div class="form-check form-switch">
								  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
								  <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
								</div>
							</td>
						</tr>
							
	       	`
	        document.getElementById("data_tbody").innerHTML += str;
	        $('#maxRows').trigger('change');
		      str = '';  

		  	}
		  }
	  });
	}

	$(document).ready(function(){
		db = new Database({
			name: "WebSQL_LiteEditor",
			description: "Default Database",
			size: 10 * 1024 * 1024 //10Mb
		}); 
		changeDB();
	})

	

	

	$('#check_data').click(function(){
		changeDB();
	})

	$('#deleteData').click(function(){
		//var db = openDatabase('nigma', '1.0', 'Test DB', 2 * 1024 * 1024);
		db.transaction(function (tx) {  
			tx.executeSql('DELETE FROM USERS');
		})
		changeDB();
	})
	 


	$('#upload').click(function(){
    var csv = $('#filename');
    var csvFile = csv[0].files[0];
    var ext = csv.val().split(".").pop().toLowerCase();

    if($.inArray(ext, ["csv"]) === -1){
        alert('upload csv');
        return false;
    }
    if(csvFile != undefined){
        reader = new FileReader();
       	//var db = openDatabase('nigma2', '1.0', 'Test DB', 2 * 1024 * 1024); 
        /*var db = openDatabase('nigma2', '1.0', 'Test DB', 2 * 1024 * 1024); 
        db.transaction(function (tx) { 
           tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (name, email, status)'); 
        });*/
        //var db = openDatabase('nigma', '1.0', 'Test DB', 2 * 1024 * 1024); 
        console.log(db)
        //var nombre = "Carlos";
	      //var correo = "abc@gmail.com";
        db.query(`
        	DELETE FROM Users
        	`, function(e){
        });
        db.query(`
        	create table IF NOT EXISTS Users (
					   name            varchar(40)         not null,
					   email                varchar(40)         null,
					   status               varchar(2)          null
					);`, function(e){
        });
        /*db.transaction(function (tx) { 
        	tx.executeSql('DELETE FROM USERS'); 
          tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (name, email, status)'); 
          tx.executeSql('INSERT INTO USERS (name, email, status) VALUES (?, ?, ?)', ["mario", "abc@gmail.com", 0]);
        });*/
	        reader.onload = function(e){

	            csvResult = e.target.result.split(/\r|\n|\r\n/);
	            
	            $.each( csvResult, function( key, value ) {
	              if(value != ''){
	              	console.log(value)
	              	var csvLine = value.split(',');
	              	var nombre = csvLine[0];
	              	var correo = csvLine[1];
	              	/*db.transaction(function (tx) {
	              		tx.executeSql('INSERT INTO USERS (name, email, status) VALUES (?, ?, ?)', [nombre, correo, 0]);
	              	});*/
        	        db.query(`
        	        	INSERT INTO USERS (name, email, status) VALUES ("${nombre}", "${correo}", "0")
        	        	`, function(e){
        	        });
	              	
	              }
	              	
	            });
	            //$('.csv').append(csvResult);
	              }
	        
	      
        reader.readAsText(csvFile);

    }
    alert('Data cargada')
  });
					
});

//ROWS SHOWING FUNCTION
function showig_rows_count(maxRows, pageNum, totalRows) {
   //Default rows showing
        var end_index = maxRows*pageNum;
        var start_index = ((maxRows*pageNum)- maxRows) + parseFloat(1);
        var string = 'Showing '+ start_index + ' to ' + end_index +' of ' + totalRows + ' entries';               
        $('.rows_count').html(string);
}

// CREATING INDEX
function default_index() {
  $('table tr:eq(0)').prepend('<th> ID </th>')

					var id = 0;

					$('table tr:gt(0)').each(function(){	
						id++
						$(this).prepend('<td>'+id+'</td>');
					});
}

// All Table search script
function FilterkeyWord_all_table() {
  
// Count td if you want to search on all table instead of specific column

  var count = $('.table').children('tbody').children('tr:first-child').children('td').length; 

        // Declare variables
  var input, filter, table, tr, td, i;
  input = document.getElementById("search_input_all");
  var input_value =     document.getElementById("search_input_all").value;
        filter = input.value.toLowerCase();
  if(input_value !=''){
        table = document.getElementById("table-id");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {
          
          var flag = 0;
           
          for(j = 0; j < count; j++){
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
             
                var td_text = td.innerHTML;  
                if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
                //var td_text = td.innerHTML;  
                //td.innerHTML = 'shaban';
                  flag = 1;
                } else {
                  //DO NOTHING
                }
              }
            }
          if(flag==1){
                     tr[i].style.display = "";
          }else {
             tr[i].style.display = "none";
          }
        }
    }else {
      //RESET TABLE
      $('#maxRows').trigger('change');
    }
}

function generateHtmlTable(data) {
    var html = '';

      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
        $.each(data, function( index, row ) {
          //bind header
          if(index == 0) {
            html += '';
            html += '';
            $.each(row, function( index, colData ) {
                html += '';
            });
            html += '';
            html += '';
            html += '';
          } else {
            html += '';
            $.each(row, function( index, colData ) {
                html += '';
            });
            html += '';
          }
        });
        html += '';
        html += `
<table class="table table-condensed table-hover table-striped">
<thead>
<tr>
<th>`;
                html += colData;
                html += `</th>
</tr>
</thead>
<tbody>
<tr>
<td>`;
                html += colData;
                html += `</td>
</tr>
</tbody>
</table>
`;
        alert(html);
        $('#csv-display').append(html);
      }
    }