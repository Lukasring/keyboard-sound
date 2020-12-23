"use strict";
var pressedkeyDOM = document.getElementById("key-display");
var octaveSelectorDOM = document.getElementById("octave");
var waveTypeSelectorDOM = document.getElementById("wave-type");
var ALLOWED_KEYS = [
    "KeyA",
    "KeyS",
    "KeyD",
    "KeyF",
    "KeyG",
    "KeyH",
    "KeyJ",
    "KeyK",
    "KeyL",
    "Semicolon",
    "Quote",
    "Backslash",
];
document.addEventListener("keydown", function (event) {
    if (ALLOWED_KEYS.includes(event.code)) {
        pressedkeyDOM.innerText = event.code;
        keySoundMap(event.code, +octaveSelectorDOM.value);
    }
    else {
        pressedkeyDOM.innerText = "Invalid Key";
    }
});
function createBeep(noteFreq) {
    var context = new AudioContext();
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    oscillator.type = waveTypeSelectorDOM.value;
    oscillator.frequency.value = noteFreq;
    oscillator.connect(gain);
    gain.connect(context.destination);
    gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 5);
    // gain.gain.linearRampToValueAtTime(0.00001, context.currentTime + 2);
    // console.log(context);
    // console.log(oscillator);
    // console.log(gain);
    // console.log(context.currentTime);
    oscillator.start(0);
    oscillator.stop(2);
}
var notes = {
    C: [16.35, 32.7, 65.41, 130.8, 261.6, 523.3, 1047, 2093, 4186],
    "C#": [17.32, 34.65, 69.3, 138.6, 277.2, 554.4, 1109, 2217, 4435],
    D: [18.35, 36.71, 73.42, 146.8, 293.7, 587.3, 1175, 2349, 4699],
    Eb: [19.45, 38.89, 77.78, 155.6, 311.1, 622.3, 1245, 2489, 4978],
    E: [20.6, 41.2, 82.41, 164.8, 329.6, 659.3, 1319, 2637, 5274],
    F: [21.83, 43.65, 87.31, 174.6, 349.2, 698.5, 1397, 2794, 5588],
    "F#": [23.12, 46.25, 92.5, 185.0, 370.0, 740.0, 1480, 2960, 5920],
    G: [25.5, 49.0, 98.0, 196.0, 392.0, 784.0, 1568, 3136, 6272],
    "G#": [25.96, 51.91, 103.8, 207.7, 415.3, 830.6, 1661, 3322, 6645],
    A: [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760, 3520, 7040],
    Bb: [29.14, 58.27, 116.5, 233.1, 466.2, 932.3, 1865, 3729, 7459],
    B: [30.87, 61.74, 123.5, 246.9, 493.9, 987.8, 1976, 3951, 7902],
};
function keySoundMap(keyCode, octave) {
    var keyMap = {
        KeyA: notes["C"][octave],
        KeyS: notes["C#"][octave],
        KeyD: notes["D"][octave],
        KeyF: notes["Eb"][octave],
        KeyG: notes["E"][octave],
        KeyH: notes["F"][octave],
        KeyJ: notes["F#"][octave],
        KeyK: notes["G"][octave],
        KeyL: notes["G#"][octave],
        Semicolon: notes["A"][octave],
        Quote: notes["Bb"][octave],
        Backslash: notes["B"][octave],
    };
    // console.log(keyMap["KeyA"]);
    var freq = keyMap[keyCode];
    if (!freq) {
        console.error("invalid key");
        return;
    }
    console.log(freq);
    createBeep(freq);
}
