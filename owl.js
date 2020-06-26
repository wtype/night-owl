const darkenImages = () => [...document.images].forEach(image => image.style.filter = `brightness(0.75)`);

function calculateBrightness(color) {
  const colorValues = [];

  let cleanColor = color.replace(/[^0-9,]/g, '');
  // slicing at ends to remove surrounding parentheses 
  cleanColor = cleanColor.slice(1, cleanColor.length - 1).split(',').slice(0, 3);
  cleanColor.forEach(value => {
    value.trim();
    colorValues.push(+value);
  });

  if (colorValues.length !== 3) {
    throw new Error(`Needing three color values to be passed in to calculate brightness. Received: ${colorValues.length}`);
  }

  const brightness = Number(Math.sqrt(0.241 * (colorValues[0] ** 2) + 0.691 * (colorValues[1] ** 2) + 0.068 * (colorValues[2] ** 2)).toFixed(2));

  return [color, brightness];
}

function getColors() {
  const colors = [];
  const rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
  const elements = document.getElementsByTagName('*');

  for (const element of elements) {
    elementStyles = window.getComputedStyle(element);

    for (const style of elementStyles) {
      const value = elementStyles[style];

      if (value && value.match(rgbRegex) && !colors.includes(value)) {
        colors.push(value);
      }
    }
  }

  return colors;
}

function go() {
  const colors = getColors();

  for (const color of colors) {
    console.log(calculateBrightness(color));
  }
}

go();