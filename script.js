// JavaScript for Color Picker App
document.addEventListener("DOMContentLoaded", () => {
    const colorBox = document.querySelector(".color-box");
    const hexValue = document.getElementById("hex-value");
    const rgbValue = document.getElementById("rgb-value");
    const hslValue = document.getElementById("hsl-value");
    const colorPicker = document.getElementById("color-picker");
    const randomColorBtn = document.getElementById("random-color-btn");
    const copyColorBtn = document.getElementById("copy-color-btn");
  
    // Convert HEX to RGB
    function hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgb(${r}, ${g}, ${b})`;
    }
  
    // Convert HEX to HSL
    function hexToHsl(hex) {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;
  
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
  
      if (max === min) {
        h = s = 0; // Achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
      }
  
      h = Math.round(h);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
  
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
  
    // Update Color Display
    function updateColorDisplay(color) {
      colorBox.style.backgroundColor = color;
      hexValue.textContent = color;
      rgbValue.textContent = hexToRgb(color);
      hslValue.textContent = hexToHsl(color);
    }
  
    // Generate Random HEX Color
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    // Event Listeners
    colorPicker.addEventListener("input", (e) => {
      updateColorDisplay(e.target.value);
    });
  
    randomColorBtn.addEventListener("click", () => {
      const randomColor = getRandomColor();
      updateColorDisplay(randomColor);
      colorPicker.value = randomColor;
    });
  
    copyColorBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(hexValue.textContent).then(() => {
        alert("HEX Color copied to clipboard!");
      });
    });
  
    // Initialize with a random color
    updateColorDisplay(getRandomColor());
  });
  