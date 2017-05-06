	
	$( document ).ready(function() {
	  // Handler for .ready() called.
	  
	  $( "#submit" ).click(function() {
	     $('#table').html('');
	    var _condition = "where ";
		var _conditions = [];
	  	var _lineID = $("#lineID").val();
	    var _name = $("#name").val();
		var _phone = $("#phone").val();
		var _email = $("#email").val();
		 if(_lineID !="")
		 {
		   
			 _conditions.push("A = '"+ _lineID+"'");
		   
		 }
		 
		  if(_name !="")
		 {

			  _conditions.push("B = '"+ _name+"'");
		   
		 }
		
		  if(_phone !="")
		 {

			  _conditions.push("C = '"+ _phone+"'");
		   
		 }
		 
		  if(_email !="")
		 {
			  _conditions.push("D = '"+ _email+"'");
		   
		 }
		 
          if(_conditions.length >0 ){
		    for(var i = 0; i< _conditions.length ; i++){
			    _condition += _conditions[i];
				if((i+1) != _conditions.length)
				  _condition += " and "
			}
		  }
		  
		  
		  var queryStr ="select A,B,C,D  " +_condition;
		  setQuery(queryStr);
		});
	});
	
	function capitalizeFirstLetter(string) {
    return string.substring(0,4) + string.slice(5).replace(/./g, '*');
}
 
     function hideEmail(string) {
    return string.slice(0, string.indexOf("@")+1) + string.slice(string.indexOf("@")+1).replace(/./g, '*');
}
    var isFirstTime = false;
    var options = {'showRowNumber': true};
    var data;
    var queryInput;
 
    // To see the data that this visualization uses, browse to
    // http://spreadsheets.google.com/pub?key=rYQm6lTXPH8dHA6XGhJVFsA 
	
	var key = "1FAIpQLScZI34KC350FAZZ_Y8tb210x3lEn2gbLpAYr93wqR5Hy2QPzg";
	var key2 = "1BskDT1-Y4mTHS1cu203Ys-FHjAKndWaSbc5CIqK3TnQ";
	var key3 = "1Q6D39u6Nyn61yXcS_ycmJAxNhm3gyLmX2LaYbZmVn4M";
    var query = new google.visualization.Query(
        'http://spreadsheets.google.com/tq?key='+key3+'&pub=1');
 
    function sendAndDraw() {
      // Send the query with a callback function.
      query.send(handleQueryResponse);
    }
 
    function handleQueryResponse(response) {
      if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
      }
      data = response.getDataTable();
	  displayData(data);
     // var table = new google.visualization.Table(document.getElementById('querytable'));  
     // table.draw(data, {'showRowNumber': true});
     // if (isFirstTime) {
     // init();  
      //}
    }
 
    function setQuery(queryString) {
      // Query language examples configured with the UI
      query.setQuery(queryString);
      sendAndDraw();
    //  queryInput.value = queryString;
    }
 
    //google.setOnLoadCallback(sendAndDraw);
 
    function init() {
      isFirstTime = false;
      (new google.visualization.Table(document.getElementById('table'))).draw(data, options);
      queryInput = document.getElementById('display-query');
    }
 
    function setQueryFromUser() {
      setQuery(queryInput.value);
    }
	
	function displayData(data)
	{
	
		var numrows = data.getNumberOfRows();
		var tableHtml = '<table width="320"  class="table"><thead> <tr><th>lineID</th><th>name</th><th>phone</th><th>email</th></tr></thead><tbody>';
        
		for (var row=0; row < numrows; row++) {
			var lineID = data.getValue(row, 0);
			var name = data.getValue(row, 1);
			var phone = data.getValue(row, 2);
			var email = data.getValue(row, 3);
			tableHtml += '<tr><td>' + lineID + '</td><td>' + name + '</td><td>' + capitalizeFirstLetter(phone) + '</td><td>' + hideEmail(email) + '</td>';
		}
		
		if(numrows == 0)
		{
			tableHtml += '<tr><td>'+notFound+'</td></td>';
		}
		tableHtml += '</tbody></table>';
		$('#table').html(tableHtml);
	}