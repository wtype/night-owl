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

getColors();