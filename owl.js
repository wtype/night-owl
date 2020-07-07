function getColors() {
  const hexRegex = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})\b$/;
  const hslRegex = /^hsl\(\s*(\d+)\s*,\s*(\d*(?:\.\d+)?%)\s*,\s*(\d*(?:\.\d+)?%)\)$/;
  const hslaRegex = /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)$/;
  const rgbaRegex = /^rgba\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d*(?:\.\d+)?)\)$/;
  const rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
  // need to check which browsers coerce colors to rgb and rgba
  const allColorRegex =
    hexRegex.source + '|' +
    rgbRegex.source + '|' +
    rgbaRegex.source + '|' +
    hslRegex.source + '|' +
    hslaRegex.source;

  const fullColorRegex = new RegExp(allColorRegex, 'ig');

  const colors = [];
  const elements = {};
  const allElements = document.getElementsByTagName('*');

  for (const element of allElements) {
    elementStyles = window.getComputedStyle(element);

    for (const style of elementStyles) {
      const value = elementStyles[style];

      if (value && value.match(fullColorRegex) && !colors.includes(value)) {
        colors.push(value);
        if (!elements[element.localName]) {
          elements[element.localName] = value;
        }
      }
    }
  }

  return [colors, elements];
}

function calculateBrightness(color) {
  const colorValues = [];

  /* TODO:
    check which browsers coerce colors 
    to rgb/rgba then see about cleaning 
  */
  let cleanColor = color.replace(/[^0-9,]/g, '');
  // slicing at ends to remove surrounding parentheses
  cleanColor = cleanColor
    .slice(1, cleanColor.length - 1)
    .split(',')
    .slice(0, 3);

  cleanColor.forEach(value => {
    colorValues.push(+value.trim());
  });

  if (colorValues.length !== 3) {
    throw new Error(
      `calculateBrightness expected 3 colors values. Received: ${colorValues.length}`
    );
  }

  const brightness = Number(
    Math.sqrt(
      0.241 * colorValues[0] ** 2 + 0.691 * colorValues[1] ** 2 + 0.068 * colorValues[2] ** 2
    ).toFixed(2)
  );

  return [color, brightness];
}

function replaceColor(c) {
  const [color, brightness] = c;
  console.log(color, brightness);
}

const darkenImages = () =>
  [...document.images].forEach(image => (image.style.filter = `brightness(0.75)`));

function go() {
  const colors = getColors()[0];
  const elements = getColors()[1];
  console.log(elements);

  const withBrightness = [];
  colors.forEach(color => withBrightness.push(calculateBrightness(color)));
  withBrightness.forEach(color => replaceColor(color));
}

go();

