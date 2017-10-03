import JSZip from 'jszip';
import { parseString } from 'xml2js';
import db from '../db';

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

export function parseEpub(epub) {
  // Given an epub file, parse its contents and load it into indexed db
  const reader = new FileReader();
  reader.onload = function(e) {
    const blob = new Blob([e.target.result]);
    const epubData = unzipEpub(reader.result).catch(e => { console.error(e) });
    // Using the epubData create an indexedDb entry and then save the file
    // results as a blob to indexedDB
    console.log(db);
    epubData.then(bookId => db.books.where('id').equals(bookId).modify({ blob }));
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

// Adds the book data to indexedDB, returns a promise containing the id number
function saveBookToDB(manifest, epub) {
  if (db.books) {
    const chapters = manifest.toc.map(({ id, href }, index) =>
    Object.keys(epub.files).find(key => key.includes(href))
  );
  const bookEntry = { ...manifest.metadata, chapters };
  console.log(bookEntry);
  return db.books.put(bookEntry);
  }
}

/* Parses the epub data into indexeddb */
function handleEpubData(epub) {
  const { files } = epub;
  // Manifest is in opf file
  const manifestKey = Object.keys(files).find(s => /\.opf/.test(s))
  return epub.file(manifestKey).async('string')
    .then(xmlPromise)
    .then(createManifest)
    .then(manifest => saveBookToDB(manifest, epub))
}

