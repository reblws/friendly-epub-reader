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

function parseEpub(epub) {
  // Given an epub file, parse its contents and load it into indexed db
  const reader = new FileReader();
  reader.onload = function(e) {
    const epubData = unzipEpub(reader.result);
  }
  reader.readAsArrayBuffer(epub);
}

function unzipEpub(data) {
  const zip = new JSZip();
  zip.loadAsync(data)
    .then(handleEpubData)
    .catch(e => { throw e });
}

/* Returns a structured manifest file from the manifest epub object */
function handleManifest(manifest) {
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
  console.log({ mediaItems })
  const toc = manifest.package.spine[0].itemref
    .map(xmlAttributes)
    .map(({ idref }) => mediaItems.find(({ id }) => id === idref));
  return {
    metadata,
    mediaItems,
    toc,
  }
}

function saveBookToDB(manifest, epubFile) {
  manifest.toc.forEach(({ id, href }) => {
    console.log(id, href)
  })
}

/* Parses the epub data into indexeddb */
function handleEpubData(zipFile) {
  const { files } = zipFile;
  // Manifest is in opf file
  const manifestKey = Object.keys(files).find(s => /\.opf/.test(s))
  zipFile.file(manifestKey).async('string')
    .then(xmlPromise)
    .then(handleManifest)
    .then(manifest => saveBookToDB(manifest, zipFile))
}

export default parseEpub;
