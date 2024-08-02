/* eslint-disable sort-keys-fix/sort-keys-fix */
export const ObdCodes = {
  genericAccess: {
    characteristics: {
      DeviceName: '2A00',
      Appearance: '2A01',
      CentralAddressResolution: '2AA6'
    },
    code: '1800'
  },
  genericAttribute: {
    characteristics: {
      ServiceChanged: '2A05'
    },
    code: '1801'
  },
  unknownService: {
    characteristics: {
      unknownCharacteristic: 'FFF1',
      unknownCharacteristic2: 'FFF2'
    },
    code: 'FFF0'
  }
};
