import { AES, enc } from 'crypto-js';

const cryptoConfig = 'import.meta.env.VITE_CRYPTO_KEY';

export const encryptData = (data: string): string => AES.encrypt(data, cryptoConfig).toString();

export const decryptData = (data: string): string | null => {
  try {
    return AES.decrypt(data, cryptoConfig).toString(enc.Utf8);
  } catch {
    return null;
  }
};
