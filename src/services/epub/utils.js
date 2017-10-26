import { parseString } from 'xml2js';

export function promiseXML(file) {
  return new Promise((resolve, reject) => {
    parseString(file, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Promise a file read as an ArrayBuffer
export function promiseFileReader(file, FileReader = window.FileReader) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.addEventListener('error', (error) => {
      reject(new Error(`Error reading ${file.name}: ${error}`));
    });
    reader.readAsArrayBuffer(file);
  });
}
