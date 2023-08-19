document.addEventListener("DOMContentLoaded", function () {
  // Function to generate a random color in hexadecimal format
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Function to change the color of a box
  function changeBoxColor(box) {
    box.style.backgroundColor = getRandomColor();
  }

  // Function to add a palette to the history
  function addPaletteToHistory(paletteColors) {
    const paletteHistory = document.querySelector('.palette-set');
    const listItem = document.createElement('li');

    // Create mini squares for each color in the palette
    paletteColors.forEach(function (color) {
      const miniSquare = document.createElement('span');
      miniSquare.className = 'mini-square';
      miniSquare.style.backgroundColor = color;
      listItem.appendChild(miniSquare);
    });

    // Create a copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.addEventListener('click', function () {
      // Copy the palette hex codes to the clipboard
      const hexCodes = paletteColors.join(', ');
      navigator.clipboard.writeText(hexCodes).then(function () {
        alert('Palette copied to clipboard: ' + hexCodes);
      }).catch(function (error) {
        console.error('Clipboard write error: ', error);
      });
    });

    // Add a copy icon to the copy button
    const copyIcon = document.createElement('span');
    copyIcon.className = 'copy-icon';
    copyButton.appendChild(copyIcon);

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function () {
      // Remove the palette item when the delete button is clicked
      listItem.remove();
    });

    // Add a delete icon to the delete button
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'delete-icon';
    deleteButton.appendChild(deleteIcon);

    listItem.appendChild(copyButton);
    listItem.appendChild(deleteButton);
    paletteHistory.appendChild(listItem);
  }

  // Add a click event listener to the "Randomize" button
  const randomizeButton = document.querySelector('.randomize-button');
  if (randomizeButton) {
    randomizeButton.addEventListener('click', function () {
      const colorBoxes = document.querySelectorAll('.color-box');
      const paletteColors = [];
      colorBoxes.forEach(function (box) {
        const newColor = getRandomColor();
        changeBoxColor(box);
        paletteColors.push(newColor);
      });
      addPaletteToHistory(paletteColors);
    });
  }
});
