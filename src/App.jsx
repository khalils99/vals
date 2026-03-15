import { useState, useMemo } from "react";
import "./App.css";

// Generate confetti data outside of component
function generateConfetti() {
  return Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: Math.random() * 2 + 2,
  }));
}

function Confetti() {
  const confetti = useMemo(() => generateConfetti(), []);

  return (
    <div className="confetti-container">
      {confetti.map((item) => (
        <div
          key={item.id}
          className="confetti"
          style={{
            left: item.left + "%",
            animationDelay: item.delay + "s",
            animationDuration: item.duration + "s",
          }}
        />
      ))}
    </div>
  );
}

function App() {
  const [answered, setAnswered] = useState(false);
  const [yesSize, setYesSize] = useState(1);
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [shake, setShake] = useState(false);

  const handleNo = () => {
    setNoCount(noCount + 1);
    setYesSize(yesSize + 0.6);
    setShake(true);
    setTimeout(() => setShake(false), 500);

    // Move No button randomly on desktop
    if (noCount > 2) {
      setNoPosition({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 100,
      });
    }
  };

  const handleYes = () => {
    setAnswered(true);
  };

  if (answered) {
    return (
      <div className="proposal-container celebration">
        <Confetti />
        <h1 className="celebration-text">🎉 YES! 💕</h1>
        <p className="celebration-subtext">You make me the happiest! 😊</p>
        <div className="hearts">
          <span className="heart">💕</span>
          <span className="heart">💕</span>
          <span className="heart">💕</span>
          <span className="heart">💖</span>
          <span className="heart">💕</span>
        </div>
        <p className="love-message">I love you! 🌹</p>
      </div>
    );
  }

  const yesText =
    noCount === 0 ? "Yes" : noCount === 1 ? "Pretty Please" : "Please 🥺";
  const yesStyle = {
    fontSize: `${16 + (yesSize - 1) * 10}px`,
    padding: `${8 + (yesSize - 1) * 5}px ${12 + (yesSize - 1) * 8}px`,
  };

  return (
    <div className="proposal-container">
      <div className="stars">
        <span className="star" style={{ animationDelay: "0s" }}>
          ✨
        </span>
        <span className="star" style={{ animationDelay: "0.5s" }}>
          ✨
        </span>
        <span className="star" style={{ animationDelay: "1s" }}>
          ✨
        </span>
        <span className="star" style={{ animationDelay: "1.5s" }}>
          ✨
        </span>
      </div>
      <h1 className="proposal-text">
        You're my favorite person in the world 💕
      </h1>
      <p className="proposal-subtitle">
        Every moment with you feels like home. Will you be my girlfriend?
      </p>
      <div className={`buttons-container ${shake ? "shake" : ""}`}>
        <button
          className="btn btn-no"
          onClick={handleNo}
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            transition: "transform 0.3s ease",
          }}
        >
          No
        </button>
        <button className="btn btn-yes" style={yesStyle} onClick={handleYes}>
          {yesText}
        </button>
      </div>
      <p className="click-count">
        {noCount > 0 && <span className="hint">Come on... 👉👈</span>}
      </p>
    </div>
  );
}

export default App;
