//
var viewModel = function () {
	var self = this;
	self.outs = ko.observableArray();
	self.remaining = ko.observable();
	self.raw = ko.observable();
	self.net = ko.observable().extend({
		required: true,
		min: 0,
		max: self.raw
	});
	self.raw.extend({
		required: true,
		min: self.net,
		max: self.remaining
	});
	this.validables = new ko.validatedObservable({
		a: self.raw,
		b: self.net
	});
	self.loading = ko.observable(true);
	self.adding = ko.observable(false);
	self.lotId = ko.observable();
	self.setLotId = function (id) {
		this.lotId(id);
		this.loadData();
	},
	self.newOut = function () {
		this.adding(true);
		$('#trOuts').slideUp();
		$('#newOut').slideDown();
	},
	self.addOut = function () {
		$.post(
			'/lots/' + self.lotId() + '/outs',
			{date: $('#date').val(), raw: $('#raw').val(), net: $('#net').val()}, 
			self.loadData
		);
	},
	self.loadData = function () {
		self.loading(true);
		$.getJSON('/lots/' + self.lotId() + '/outs', function (data) {
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
	$('.modal').hide().on('show.bs.modal', function () {
		self.loadData();
		$('#newOut').hide();
	});
};
var vm = new viewModel;
ko.applyBindings(vm);
