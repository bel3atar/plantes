//
var viewModel = function () {
	var self = this;
	self.modalTitle = ko.observable();
	self.outs = ko.observableArray();
	self.visibleFinal = ko.observable(null);
	self.toggleFinal = function () {
		var id = this._id;
		if (self.visibleFinal() !== null)
			$('#finalProducts').remove();
		self.loading(true);
		$.getJSON('/outs/' + id, function (data) {
			$('#' + id).after('<tr id="finalProducts"><td colspan=3>ICI S\'AFFICHERONT LES PRODUITS</td></tr>');
			self.visibleFinal(id);
		});
	};
	self.remaining = ko.observable();
	self.raw = ko.observable();
	self.net = ko.observable().extend({
		number: true,
		required: true,
		min: 0,
		max: self.raw
	});
	self.raw.extend({
		number: true,
		required: true,
		min: self.net,
		max: self.remaining || 0
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
	};
	self.newOut = function () {
		self.adding(true);
		self.modalTitle('Nouvelle sortie');
		$('#trOuts').slideUp(1000, function () { $('#newOut').slideDown(); });
	};
	self.addOut = function () {
		$.post(
			'/lots/' + self.lotId() + '/outs',
			{date: $('#date').val(), raw: $('#raw').val(), net: $('#net').val()}, 
			self.loadData
		);
	};
	self.loadData = function () { //chargement des sorties vers production
		self.modalTitle('Sorties vers production du lot');
		self.loading(true);
		$.getJSON('/lots/' + self.lotId() + '/outs', function (data) {
			var sum = .0;
			for (var i = 0; i < data.outs.length; ++i)
				sum += data.outs[i].raw;
			self.remaining(data.quantity - sum);
			self.outs(data.outs);
			self.loading(false);
			self.adding(false);
			$('#newOut').slideUp(1000, function () { $('#trOuts').slideDown(); });
		});
	};
	$('.modal').hide().on('show.bs.modal', function () {
		self.loadData();
		$('#newOut').hide();
	});
};
var vm = new viewModel;
ko.applyBindings(vm);
