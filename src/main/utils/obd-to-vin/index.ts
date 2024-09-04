export const convertOBDResponseToVIN = (vinData: { line1: string; line2: string }): string => {
  const hexToAscii = (hex: string): string => {
    let ascii = '';

    for (let index = 0; index < hex.length; index += 2) {
      const hexCode = hex.slice(index, 2);

      ascii += String.fromCharCode(parseInt(hexCode, 16));
    }
    return ascii;
  };

  const vinPart1 = hexToAscii(vinData.line1.replace(/[0-9]: /u, '').replace(/\s+/gu, ''));
  const vinPart2 = hexToAscii(vinData.line2.replace(/[0-9]: /u, '').replace(/\s+/gu, ''));

  const vin = vinPart1 + vinPart2;

  return vin;
};
