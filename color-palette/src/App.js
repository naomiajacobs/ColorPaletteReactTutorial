import React, { useState } from 'react';
import './App.css';

// Function to generate a random color in hexadecimal format
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * 
 * @param {*} props 
 * - color: string
 * @returns 
 */
function MainColor(props) {
  return (<div className="color-box" style={{ backgroundColor: props.color }} />);
}

function App() {
  const [colors, setColors] = useState([]);  // array of hex strings
  const [paletteHistory, setPaletteHistory] = useState([]);  // array of arrays of hex strings

  // Function to generate a random palette of colors
  function generatePalette() {
    const newPalette = Array.from({ length: 3 }, () => getRandomColor());
    setColors(newPalette);
  }

  // Function to add the current palette to the history
  function addToPaletteHistory() {
    setPaletteHistory([...paletteHistory, colors]);
  }

  // Function to remove a palette from the history
  function removeFromPaletteHistory(index) {
    const updatedHistory = paletteHistory.filter((_, i) => i !== index);
    setPaletteHistory(updatedHistory);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Palette Generator</h1>
      </header>

      <main className="App-main">
        <section className="palette-history">
          <h2>Palette History</h2>
          <ul className="palette-set">
            {paletteHistory.map((palette, index) => (
              <li key={index}>
                {palette.map((color, colorIndex) => (
                  <span
                    key={colorIndex}
                    className="mini-square"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
                <button
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(palette.join(', '))}
                ></button>
                <button
                  className="delete-button"
                  onClick={() => removeFromPaletteHistory(index)}
                ></button>
              </li>
            ))}
          </ul>
        </section>

        <section className="palette-section">
          <div className="color-box-container">
            {colors.map((color, index) => <MainColor color={color} key={index} />)}
          </div>
          <button className="randomize-button" onClick={generatePalette}>
            Randomize
          </button>
          <button className="add-button" onClick={addToPaletteHistory}>
            Add to History
          </button>
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2023 Naomi Jacobs</p>
      </footer>
    </div>
  );
}

export default App;
