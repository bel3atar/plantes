viewModel = {
	outs: ko.observableArray(),
	raw: ko.observable(0),
	net: ko.observable(0),
	remaining: ko.observable(),
	loading: ko.observable(true),
	adding: ko.observable(false),
	lotId: ko.observable(),
	setLotId: function (id) {
		this.lotId(id);
		this.loadData();
	},
	newOut: function () {
		this.adding(true);
		$('#trOuts').slideUp();
		$('#newOut').slideDown();
	},
	addOut: function () {
		$.post(
			'/lots/' + this.lotId() + '/outs',
			{date: $('#date').val(), raw: $('#raw').val(), net: $('#net').val()}, 
			this.loadData
		);
	},
	loadData: function () {
		var self = this;
		self.loading(true);
		$.getJSON('/lots/' + self.lotId() + '/outs', function (data) {
			console.log('got data');
			console.log(data);
			var sum = .0;
			for (var i = 0; i < data.outs.length; ++i)
				sum += data.outs[i].raw;
			self.remaining(data.quantity - sum);
			self.outs(data.outs);
			self.loading(false);
			self.adding(false);
			$('#newOut').hide();
			$('#trOuts').show();
		});
	}
};
viewModel.net.extend({
	required: true,
	min: 0,
	max: viewModel.raw
});
viewModel.raw.extend({
	required: true,
	min: viewModel.net,
	max: viewModel.remaining
});
$('.modal').hide().on('show.bs.modal', function () {
	viewModel.loadData();
	$('#newOut').hide();
});
