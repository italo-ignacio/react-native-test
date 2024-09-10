export const convertOBDResponseToVIN = (response: { line1: string; line2: string }): string => {
  const combinedHex = response.line1.replace(/\s+/gu, '') + response.line2.replace(/\s+/gu, '');

  let vin = '';

  for (let index = 0; index < combinedHex.length; index += 2) {
    const hexPair = combinedHex.slice(index, index + 2);

    vin += String.fromCharCode(parseInt(hexPair, 16));
  }

  return vin;
};
