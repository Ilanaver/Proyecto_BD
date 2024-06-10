import sql from 'mssql';

const config = {
  user: 'ALMAGRO\\47756465',
  password: 'Wositod10s',
  server: 'A-NHFY-INFO-07',
  database: 'MoneyMindsDB',
  options: {
    trustServerCertificate: true, // Change to true for local dev / self-signed certs
    trustedConnection : true
  },
};