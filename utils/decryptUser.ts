import CryptoJS from "crypto-js";

const secretKey = "my_secret_key_123";

export const getDecryptedUser = () => {
  try {
    const encryptedUser = localStorage.getItem("user");
    if (!encryptedUser) return null;

    const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("فشل فك التشفير:", error);
    return null;
  }
};
