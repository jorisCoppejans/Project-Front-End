let USER_DATA = [
  {
    firstName: 'Joris',
    lastName: 'Coppejans',
    email: 'joris.coppejans@yahoo.com',
    password: 'abcd1234'
  },
  {
    firstName: 'Stef',
    lastName: 'Roels',
    email: 'stef.roels@gmail.com',
    password: 'abcd1234'
  },
  {
    firstName: 'Robbe',
    lastName: 'Vervaet',
    email: 'robbe.vervaet@gmail.com',
    password: 'abcd1234'
  },
];

let COLLECTIONS_DATA = [
  {
    id : '001',
    userId : '001',
    value : 100000
  },
  {
    id : '002',
    userId : '001',
    value : 200.25
  },
];


let COINS_DATA = [
  {
    id : '001',
    name: 'Bitcoin',
    value: 34000,
    collectionId: '001',
    favorite: true
  },
  {
    id : '002',
    name: 'Ethereum',
    value: 1800,
    collectionId: '001',
    favorite: true
  },
  {
    id : '003',
    name: 'BNB',
    value: 200,
    collectionId: '001'
  },
  {
    id : '004',
    name: 'Random',
    value: 200,
    collectionId: '002'
  }
]

export { USER_DATA, COLLECTIONS_DATA, COINS_DATA };