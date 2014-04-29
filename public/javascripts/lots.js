viewModel = {
	outs: ko.observableArray(),
	loading: ko.observable(true),
	adding: ko.observable(false),
	lotId: ko.observable(),
	setLotId: function (id) {
		viewModel.lotId(id);
		viewModel.loadData();
	},
	newOut: function () {
		viewModel.adding(true);
		$('#trOuts').slideUp();
		$('#newOut').slideDown();
	},
	addOut: function () {
		$.post(
			'/lots/' + viewModel.lotId() + '/outs',
			{date: $('#date').val(), raw: $('#raw').val(), net: $('#net').val()}, 
			viewModel.loadData
		);
	},
	loadData: function () {
		viewModel.loading(true);
		$.getJSON('/lots/' + viewModel.lotId() + '/outs', function (outs) {
			viewModel.outs(outs);
			viewModel.loading(false);
			viewModel.adding(false);
			$('#newOut').hide();
			$('#trOuts').show();
		});
	}
};
$('.modal').hide().on('show.bs.modal', function () {
	viewModel.loadData();
	$('#newOut').hide();
});
