function Cartoon({ message, isSpeaking, soundFile }) {
  const audio = React.useRef(null);

  React.useEffect(() => {
    if (isSpeaking && audio.current) {
      audio.current
        .play()
        .catch(err => console.error("Audio play error:", err));
    }
  }, [isSpeaking]);
  

  return (
    <div className="cartoon">
      <audio ref={audio} src={soundFile} preload="auto"></audio>
      <div className={`speech-bubble ${isSpeaking ? "show" : ""}`}>
        {message}
      </div>
      <div className="head">
        <div className="eye left"></div>
        <div className="eye right"></div>
        <div className="mouth"></div>
      </div>
      <div className="body"></div>
      <div className="arm left"></div>
      <div className="arm right"></div>
      <div className="leg left"></div>
      <div className="leg right"></div>
    </div>
  );
}
// Get the audio elements by their IDs
var sound1 = document.getElementById('sound1');
var sound2 = document.getElementById('sound2');

function playSound1() {
  const sound1 = document.getElementById('sound1');
  if (sound1) {
    sound1.play().catch((err) => console.error("Error playing sound1:", err));
  }
}

function playSound2() {
  const sound2 = document.getElementById('sound2');
  if (sound2) {
    sound2.play().catch((err) => console.error("Error playing sound2:", err));
  }
}



function animateSpeech() {
  const speech1 = document.querySelector(".cartoon:nth-child(1) .speech-bubble");
  const speech2 = document.querySelector(".cartoon:nth-child(2) .speech-bubble");

  // Ensure user interaction before playing sound
  sound1.play()
    .then(() => {
      speech1.classList.add("show");
      setTimeout(() => {
        speech1.classList.remove("show");
        sound2.play()
          .then(() => speech2.classList.add("show"))
          .catch(err => console.error("Error playing sound2:", err));
      }, 4000);
    })
    .catch(err => console.error("Error playing sound1:", err));
}


 
  
function CartoonConversation() {
  const [speaking, setSpeaking] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSpeaking((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const characters = [
    { message: "Hello! How are you?", soundFile: "sound1.mp3" },
    { message: "Hello! I'm fine.", soundFile: "sound2.mp3" }
  ];

  return (
    <div className="cartoon-container">
      {characters.map((char, index) => (
        <Cartoon
          key={index}
          message={char.message}
          isSpeaking={speaking === index}
          soundFile={char.soundFile}
        />
      ))}
    </div>
  );
}

ReactDOM.render(<CartoonConversation />, document.getElementById("root"));