var five = require("johnny-five"),
	fs = require('fs'),
	lame = require('lame'),
	Speaker = require('speaker'),
  board, button, peizo, speaker;

board = new five.Board();

board.on("ready", function() {

  button = new five.Button({
	  pin: 13,
    isPullup: true
  });

  piezo = new five.Piezo(11);

  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
	  button: button
  });

  // Button Event API

  // "down" the button is pressed
  button.on("down", function() {
	  console.log("down");

    // Plays a song
  piezo.play({
    // song is composed by an array of pairs of notes and beats
    // The first argument is the note (null means "no note")
    // The second argument is the length of time (beat) of the note (or non-note)
    song: [
      ["A1", 1/4],
      ["F4", 1/4],
      ["A1", 1/4],
      ["F4", 1/4],
      [null, 1/4],
      ["C1", 1/4],
      ["F4", 1/4],
      ["C1", 1/4],
      ["F4", 1/4],
      [null, 1/4],
      ["C1", 1/4],
      ["F4", 1/4],
      ["C1", 1/4],
      ["F4", 1/4],
      [null, 1/4],
    ],
    tempo: 100
  });
	  
	  // fs.createReadStream("sounds/siren.mp3")
	  //   .pipe(new lame.Decoder())
	  //   .on('format', function (format) {
	  //     this.pipe(new Speaker(format));
	  //   });
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function() {
	  console.log("hold");
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
  });
});
