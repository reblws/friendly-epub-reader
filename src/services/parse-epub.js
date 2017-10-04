import JSZip from 'jszip';
import { parseString } from 'xml2js';
import md5 from 'md5';

export function parseEpub(epub, callback) {
  // Given an epub file, parse its contents and load it into indexed db
  // Fires a callback with the book data as an input
  const reader = new FileReader();
  reader.onload = function() {
    unzipEpub(reader.result)
      .then(bookDetails => Object.assign({}, bookDetails, { md5: md5(reader.result)}))
      .then(callback)
      .catch(e => { console.error(e) });
  }
  reader.readAsArrayBuffer(epub);
}


function unzipEpub(data) {
  const zip = new JSZip();
  return zip.loadAsync(data)
    .then(handleEpubData);
}

/* Returns a structured manifest file from the manifest epub object */
function createManifest(manifest) {
  // Return structured manifest
  const underscoreMapper = ({ _ }) => _;
  const xmlAttributes = ({ $ }) => $;
  const md = manifest.package.metadata[0];
  const metadata = {
    authors: [ ...md['dc:creator'].map(underscoreMapper) ],
    gutenbergUri: md['dc:identifier'].map(underscoreMapper)[0],
    rights: md['dc:rights'][0],
    title: md['dc:title'][0],
    subject: md['dc:subject'][0],
    publishedAt: md['dc:date'].find(({ $ }) => /publication/.test($['opf:event']))._,
    language: md['dc:language'][0]._,
  }
  const mediaItems = manifest.package.manifest[0].item.map(xmlAttributes);
  const toc = manifest.package.spine[0].itemref
    .map(xmlAttributes)
    .map(({ idref }) => mediaItems.find(({ id }) => id === idref));
  return {
    metadata,
    mediaItems,
    toc,
  }
}

function saveBookDetails(manifest, epub) {
  const chapters = manifest.toc.map(({ id, href }, index) =>
    Object.keys(epub.files).find(key => key.includes(href))
  );
  const bookEntry = { ...manifest.metadata, chapters };
  return bookEntry
}

function handleEpubData(epub) {
  const { files } = epub;
  // Manifest is in opf file
  const manifestKey = Object.keys(files).find(s => /\.opf/.test(s))
  return epub.file(manifestKey).async('string')
    .then(xmlPromise)
    .then(createManifest)
    .then(manifest => saveBookDetails(manifest, epub))
}

function xmlPromise(file) {
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



