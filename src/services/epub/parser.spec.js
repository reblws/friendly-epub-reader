/* eslint-disable */
import { expect, assert } from 'chai';
import sinon from 'sinon';
// import { File } from 'file-api';
import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import epubParser from './parser';
import FakeFileReader from './test/FakeFileReader';

const MOBY_DICK_PATH = path.resolve('./src/services/epub/test/moby-dick.epub');
describe('parse-epub', function() {
  describe('parsing an example epub (Moby Dick)', function() {
    let result;
    let readerSpy = {};
    before(function() {
      const reader = () => new FakeFileReader(readerSpy);
      result = epubParser(reader)(MOBY_DICK_PATH);
    });
    it('should return the right keys required to make a book object', function() {
      const keys = [
        'authors',
        'uri',
        'rights',
        'title',
        'subject',
        'publishedAt',
        'language',
        'chapters',
        'hash',
        'blob',
      ];
      return result.then((obj) => {
        expect(obj).to.have.all.keys(keys);
      });
    })
    it('should get the book title', function() {
      // Todo change this to just return a promise
      return result
        .then(({ title }) => {
          expect(readerSpy.loaded).to.be.true;
          expect(title).to.equal('Moby Dick; Or, The Whale');
        });
    });
    it('should get authors', function() {
      return result.then((obj) => {
        expect(obj).to.have.property('authors');
        expect(obj.authors).to.be.an('array');
        expect(obj.authors).to.have.lengthOf(1);
        expect(obj.authors[0]).to.equal('Herman Melville');
      });
    });
    it('should have rights', function() {
      return result.then((obj) => {
        expect(obj).to.have.property('rights');
        expect(obj.rights).to.include('Public domain');
      });
    });
    // it('should get the right hash for the epub');
    it('should have the date the epub was published', function() {
      return result.then((obj) => {
        expect(obj).to.have.property('publishedAt');
        expect(obj.publishedAt).to.be.an.instanceof(Date);
      })
    });
    it('should find the english language in the right format', function() {
      return result.then(({ language }) => {
        expect(language).to.be.a('string');
        expect(language).to.have.string('en');
      })
    });
    it('should find the subject', function() {
      return result.then(({ subject }) => {
        expect(subject).to.be.a('string');
        expect(subject).to.match(/[Ww]haling/);
      });
    });
    it('should hash the data properly', function() {
      const expectedHash = 'E8957027BC31E5F97CCAC780D64EE974'.toLowerCase();
      return result.then(({ hash }) => {
        expect(hash).to.equal(expectedHash);
      })
    });
    it('should be able to find the table of contents', function() {
      return result.then(({ chapters }) => {
        expect(chapters).to.be.an('array').that.is.not.empty;
        expect(chapters).to.satisfy(function (arr) {
          return arr.every(s => typeof s === 'string');
        });
      });
    });
  });
});
