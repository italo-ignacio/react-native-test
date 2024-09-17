// {"line1": "5A 42 35 35 58 39", "line2": "38 38 35 32 39 33", "line3": false}
// {"line1": "35 2D 31 34 43 32", "line2": "34 2D 45 44 42 00", "line3": false}

export const convertOBDResponseToVIN = (response: { line1: string; line2: string }): string => {
  const combinedHex = response.line1.replace(/\s+/gu, '') + response.line2.replace(/\s+/gu, '');

  let vin = '';

  for (let index = 0; index < combinedHex.length; index += 2) {
    const hexPair = combinedHex.slice(index, index + 2);
    const charCode = parseInt(hexPair, 16);

    if (charCode > 0) vin += String.fromCharCode(charCode);
  }

  return vin;
};
