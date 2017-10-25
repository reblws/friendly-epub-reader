/* eslint-disable */
import { expect } from 'chai';
import sinon from 'sinon';
// import { File } from 'file-api';
import proxyquire from 'proxyquire';
import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import parseEpub from '../../services/parse-epub';
import { FakeFileReader } from './helper';

const MOBY_DICK_PATH = path.resolve('./src/test/services/epubs/moby-dick.epub');

describe('parse-epub', function() {
  describe('parsing an example epub (Moby Dick)', function() {
    let result;
    let readerSpy = {};

    before(function() {
      const reader = () => new FakeFileReader(readerSpy);
      result = parseEpub(MOBY_DICK_PATH, x => x, reader);
    });

    it('should return the right keys required to make an object', function() {
      const keys = [
        'authors',
        'gutenbergUri',
        'rights',
        'title',
        'subject',
        'publishedAt',
        'language',
      ];
      const assertKeysInObject = obj => {
        expect(obj).to.have.all.keys(...keys);
      }
      result.then(assertKeysInObject);
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
  });
});
