const knex = require('knex'); 
const { getLogger } = require('../core/logging'); 

const config = require('config');

const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_NAME = config.get('database.name');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');

let knexInstance;

const initializeData = async() => {
  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
    },
  };

  knexInstance = knex(knexOptions);

  try {
    knexInstance.raw('SELECT 1+1 AS result');
  } catch (error) {
    getLogger().error('initializing database failed');
    throw new Error('initializing database failed');
  }

  return knexInstance;
}

const getKnex = () =>{
  if (!knexInstance)
    throw new Error('initialize database first');
  return knexInstance;
}

const tables = Object.freeze({
  collection:'collections',
  coin:'coins',
  user:'users'
})

module.exports = {initializeData, getKnex, tables};