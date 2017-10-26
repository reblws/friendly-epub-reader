import JSZip from 'jszip';
import SparkMD5 from 'spark-md5';
import { promiseFileReader, promiseXML } from './promises';

export default function parseEpub(epub, callback, FileReader = window.FileReader) {

  const epubPromise = promiseFileReader(epub, FileReader);
  const throwErrors = e => {
    throw new Error(e);
  };
  const hashPromise = epubPromise.then(hashData).catch(throwErrors);
  const epubDetailsPromise = epubPromise.then(blobData).catch(throwErrors);
  const bookDetailsPromise = epubPromise.then(unzipEpub).then(handleEpubData)
    .catch(throwErrors);
  const mergeObjectArray = arr => arr.reduce((acc, obj) => Object.assign({}, acc, obj));
  return Promise.all([bookDetailsPromise, epubDetailsPromise, hashPromise])
    .then(mergeObjectArray)
    .then(callback)
    .catch(e => {
      throw new Error(e);
    });
}

function hashData(data) {
  const spark = new SparkMD5.ArrayBuffer();
  const hash = spark.append(data);
  return {
    hash: hash.end(),
  };
}

function blobData(data) {
  const blob = new Blob([data]);
  return {
    blob,
  };
}

function unzipEpub(data) {
  const zip = new JSZip();
  return zip.loadAsync(data);
}

/* Returns a structured manifest file from the manifest epub object */
function createManifest(manifest) {
  // Return structured manifest
  const underscoreMapper = ({ _ }) => _;
  const xmlAttributes = ({ $ }) => $;
  const md = manifest.package.metadata[0];
  const metadata = {
    authors: md['dc:creator'].map(underscoreMapper),
    gutenbergUri: md['dc:identifier'].map(underscoreMapper)[0],
    rights: md['dc:rights'][0],
    title: md['dc:title'][0],
    subject: md['dc:subject'][0],
    publishedAt: new Date(md['dc:date'].find(({ $ }) => /publication/.test($['opf:event']))._),
    language: md['dc:language'][0]._,
  };
  const mediaItems = manifest.package.manifest[0].item.map(xmlAttributes);
  const toc = manifest.package.spine[0].itemref
    .map(xmlAttributes)
    .map(({ idref }) => mediaItems.find(({ id }) => id === idref));
  return {
    metadata,
    mediaItems,
    toc,
  };
}

function saveBookDetails(manifest, epub) {
  const chapters = manifest.toc.map(({ id, href }, index) =>
    Object.keys(epub.files).find(key => key.includes(href))
  );
  const bookEntry = { ...manifest.metadata, chapters };
  return bookEntry;
}

function handleEpubData(epub) {
  const { files } = epub;
  // Manifest is in opf file
  const manifestKey = Object.keys(files).find(s => /\.opf/.test(s));
  return epub.file(manifestKey).async('string')
    .then(promiseXML)
    .then(createManifest)
    .then(manifest => saveBookDetails(manifest, epub));
}



