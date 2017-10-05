import Dexie from 'dexie';

const db = new Dexie('FriendlyEpubReader');

db.version(1).stores({
  books: '++id,authors,title,publishedAt,subject,language,hash',
});

export default db;
