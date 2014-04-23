document.getElementById('date').valueAsDate = new Date();	
$('#newOut').hide();
$('#newOut button').click(function () {
	$.post(
		$('#newOut form').attr('action'),
		{date: $('#date').val(), quantity: $('#quantity').val()}, 
		function (data) {
			console.log(data);
			$('#newOut').hide();
		}
	);
});
$('.modal-footer button.btn-primary').click(function () {
	$('#newOut').slideDown();
});
//attacher l'évenement click aux lignes du tableau
$('tbody tr').each(function (i, tr) {
	$(tr).children('td:nth-child(1)').each(function (j, td) {
		$(td).text(new Date(td.textContent).toLocaleDateString());
	});
	$(tr).click(function () {
		$('#newOut form').attr('action', '/lots/' + this.id + '/outs');
		$('#outs').empty();
		$.getJSON('/lots/' + this.id + '/outs', function (outs) {
			$('#status').empty();
			var frag = document.createDocumentFragment();	
			outs.forEach(function (item, index) {
				var tr = document.createElement('tr')
					, td = document.createElement('td');
				td.textContent = new Date(item['date']).toLocaleDateString();
				tr.appendChild(td);
				td = document.createElement('td');
				td.textContent = item['quantity'];
				tr.appendChild(td);
				frag.appendChild(tr);
			});
			document.getElementById('outs').appendChild(frag);
		});
		$('.modal').modal()
	});
});
