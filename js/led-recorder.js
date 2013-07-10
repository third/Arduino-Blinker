var states = {
  RESET: 0,
  START: 1,
  STOP: 2
}

var LedRecorder = function(options) {
  this.blinks  = [];
  this.startTime = null;
  this.state = states.RESET;
  this.keyIsDown = false;
  this.isRoundDown = false;

  this.btnRecorder = options.btnRecorder;
  this.btnPreview = options.btnPreview;
  this.radRoundDown = options.radRoundDown;
  this.divLed = options.divLed;
  this.txtResult = options.txtResult;

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

    //console.log('orig value = ' + elapsed)

    if(this.isRoundDown) {
      elapsed = Math.floor(elapsed / 10)*10;
    }
    else {
      elapsed = Math.round(elapsed / 10)*10;
    }

    //console.log('new value = ' + elapsed)

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

      this.isRoundDown = this.radRoundDown.checked;

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

      var blinks = this.blinks;
      var count = blinks.length;


      result.push('int delayArray[] = {' + blinks.join(',') + '};');
      result.push('int count = ' + count + ';');


      result.push('void setup() {');
      result.push('  pinMode(13, OUTPUT);');
      result.push('}');
      result.push('\t');

      result.push('void loop() {');
      result.push('  for(count=0;count<' + count + ';count++){');
      result.push('    if(count%2 == 0) {');
      result.push('      digitalWrite(13, HIGH);');
      result.push('    }');
      result.push('    else {');
      result.push('      digitalWrite(13, LOW);');
      result.push('    }');
      result.push('\t');      
      result.push('    delay(delayArray[count]);');      
      result.push('  }');
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