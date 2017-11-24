const socket = io();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'es-ES';

recognition.start();

recognition.onresult = (e) => {
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  console.log('Texto: ', text);
  socket.emit('chat message', text);
};

recognition.onend = () => {
  recognition.start();
};