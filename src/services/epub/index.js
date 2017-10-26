import epubParser from './parse';

export default {
  parse: epubParser(window.FileReader),
};
