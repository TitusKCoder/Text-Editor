import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  //code to take data and add it to the database
export const putDb = async (id, value) => {
  console.error('PUT request to JATEDB');
  //opens the JATE database and sets the version to 1
  const jateDb = await openDB('jate', 1);

  //selects the JATE database and sets the data privilage to Read/write
  const tx = jateDb.transaction('jate', 'readwrite');

  //creates object store
  const objStor = tx.objectStore('jate');

  //stores values in the store using the data's  id, value
  const req = objStor.put({ id: id, value: value });

  //confrims the request completed 
  const res = await req;
  console.log('Data saved to JATEDB', res)
}

//code to get data from database
export const getDb = async () => {
  console.error('Getting data from JATEDB');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStor = tx.objectStore('jate');
  const req = objStor.getAll();
  const res = await req;
  console.log('Data saved to JATEDB', res)
};

initdb();
