var states = {
	RESET: 0,
	START: 1,
	STOP: 2
}

var LedRecorder = function(btnRecorder, btnPreview, divLed, txtResult) {
	this.blinks	= [];
	this.startTime = null;
	this.state = states.RESET;
	this.keyIsDown = false;

	this.btnRecorder = btnRecorder;
	this.btnPreview = btnPreview;
	this.divLed = divLed;
	this.txtResult = txtResult;

	this.init();
}

LedRecorder.prototype = {
	init: function () {
		var oThis = this;


		oThis.reset();


		//bind events to buttons
		oThis.btnRecorder.onclick = function() {
			oThis.toggleRecorder();
		}

		oThis.btnPreview.onclick = function() {
			oThis.replay();
		}			
	},

	reset: function () {
		var txtResult = this.txtResult;
		var btnPreview = this.btnPreview;

		if(txtResult) {
			txtResult.value = '';
		}

		this.togglePreview();

		this.blinks = [];
		this.state = states.RESET;
	},

	startTimer: function() {
		this.startTime = (new Date()).getTime();
	},

	endTimer: function() {
		var endTime = (new Date()).getTime()
		var elapsed = endTime - this.startTime;

		//console.log(elapsed)

		this.blinks.push(elapsed);
	},

	toggleRecorder: function() {
		var btnRecorder = this.btnRecorder;
		
		this.togglePreview();

		if(btnRecorder) {
			var state = this.state;

			if(state === states.RESET) {
				//move to START
				this.state = states.START;
				btnRecorder.value = 'Stop Recording'					
			}
			else if(state === states.START) {
				//move to STOP
				this.state = states.STOP;
				btnRecorder.value = 'Reset Recording';

				this.endTimer();

				this.displayResult();
			}
			else if(state === states.STOP) {
				this.state = states.RESET;

				btnRecorder.value = 'Start Recording';

				this.init();
			}
		}
	},

	togglePreview: function() {
		var btnPreview = this.btnPreview;
		btnPreview.style.visibility = (this.state === states.START ? 'visible' : 'hidden');
	},

	ledOn: function() {
		var state = this.state;

		if(state === states.START && this.keyIsDown === false) {

			if(this.blinks.length > 0) {
				this.endTimer();
			}

			this.startTimer();

			this.toggleLed(true);

			this.keyIsDown = true;
		}
	},

	ledOff: function() {
		var state = this.state;

		if(state === states.START) {				
			this.endTimer();
			this.startTimer();
			
			this.toggleLed(false);

			this.keyIsDown = false;
		}
	},

	displayResult: function() {
		var txtResult = this.txtResult;

		if(txtResult) {
			var result = [];

			result.push('void setup() {');
			result.push('  pinMode(13, OUTPUT);');
			result.push('}');
			result.push('\t');

			result.push('void loop() {');


			for(var i=0,l=this.blinks.length;i<l;i++) {
				var blink = this.blinks[i];

				result.push('  digitalWrite(13, ' + (i%2===0 ? 'HIGH' : 'LOW') + ');');
					result.push('  delay(' + blink + ');');
			}

			result.push('}')

			txtResult.value = result.join('\n');
		}
	},

	replay: function() {
		var oThis = this;
		var counter = 0;

		function processItem(arr) {
			if(arr.length > 0) {
				var delay = arr.shift();

				var isOn = counter%2 === 0;
				counter++;

				oThis.toggleLed(isOn);


				setTimeout(function() {
					processItem(arr);
				}, delay);					
			}
		}

		var blinks = oThis.blinks.slice(0);

		processItem(blinks);
	},

	toggleLed: function(isOn) {
		var divLed = this.divLed;
		if(divLed) {
			divLed.className = divLed.className.replace(' led-on', '').replace(' led-off', '');
			divLed.className += (isOn ? ' led-on' : ' led-off');
		}
	}
}