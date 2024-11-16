const screen = document.getElementById('screen');
const calculator = document.getElementById('calculator');
const secretPage = document.getElementById('secretPage');
const video = document.getElementById('video');

let inputSequence = '';

function appendValue(value) {
  inputSequence += value;
  screen.value += value;

  if (inputSequence === '9746') {
    showSecretPageWithStream();
  } else if (!'9746'.startsWith(inputSequence)) {
    resetCalculator();
    inputSequence = ''; // Reset sequence
  }
}

function clearScreen() {
  screen.value = '';
  inputSequence = '';
}

function calculate() {
  try {
    screen.value = eval(screen.value);
  } catch {
    screen.value = 'Error';
  }
}

function showSecretPageWithStream() {
  calculator.style.display = 'none'; // Hide the calculator
  secretPage.style.display = 'block'; // Show the secret page

  // Start video stream
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      alert('Unable to access camera: ' + err.message);
    });
}

function resetCalculator() {
  screen.value = '';
  alert('Incorrect sequence. Resetting!');
}
