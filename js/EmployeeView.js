var EmployeeView = function(employee) {
	
	this.initialize = function() {
		this.el = $('<div/>');

		this.el.on('click', '.add-location-btn', this.addLocation);
	};

	this.render = function() {
		this.el.html(EmployeeView.template(employee));
		return this;
	};


	var options = {
		timeout: 31000,
		enableHighAccuracy: true;
		maximumAge: 90000;
	};

	this.addLocation = function(event) {
		event.preventDefault();
		console.log('addLocation');
		console.log(navigator);
		navigator.geolocation.getCurrentPosition(
			function(position) {
				console.log(position);
				$('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
			},
			function() {
				alert('Error getting location');
			},
			options);
		return false;
	};

	this.initialize();

}

EmployeeView.template = Handlebars.compile($('#employee-tpl').html());