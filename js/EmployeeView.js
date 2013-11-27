var EmployeeView = function(employee) {
	
	this.initialize = function() {
		this.el = $('<div/>');

		this.el.on('click', '.add-location-btn', this.addLocation);
		this.el.on('click', '.add-contact-btn', this.addToContacts);
		this.el.on('click', '.change-pic-btn', this.changePicture);
	};

	this.render = function() {
		this.el.html(EmployeeView.template(employee));
		return this;
	};

	this.addLocation = function(event) {
		event.preventDefault();
		console.log('addLocation');
		console.log(navigator);
		var options = {
			timeout: 31000,
			enableHighAccuracy: true,
			maximumAge: 90000
		};
		navigator.geolocation.getCurrentPosition(
			function(position) {
				console.log(position);
				$('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
			},
			function(error) {
				alert('Error getting location');
				console.log(error);
			},
			options);
		return false;
	};

	this.addToContacts = function(event) {
		event.preventDefault();
		console.log('addToContacts');
		if (!navigator.contacts) {
			app.showAlert('Contacts API not supported', 'Error');
			return;
		}
		var contact = navigator.contacts.create();
		contact.name = {givenName: employee.firstName, familyName: employee.lastName};
		var phoneNumbers = [];
		phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
		phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true);
		contact.phoneNumbers = phoneNumbers;
		contact.save();
		return false;
	};

	this.changePicture = function(event) {
		event.preventDefault();
		if (!navigator.camera) {
			app.showAlert('Camera API not supported', 'Error');
			console.log('camera api not supported');
			return;
		}
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: 1, // 0 - photo library, 1 - Camera, 2 - Saved photo album
			encodingType: 0 // 0 - jpg, 1 - png
		};

		navigator.camera.getPicture(
			function(imageData) {
				$('.employee-image', this.el).attr('src', 'data:image/jpeg;base64, ' + imageData);
			},
			function(error) {
				app.showAlert('Error taking picture', 'Error');
				console.log(error);
			},
			options
		);
		return false;
	};

	this.initialize();

}

EmployeeView.template = Handlebars.compile($('#employee-tpl').html());