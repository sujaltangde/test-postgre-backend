const { Pool } = require('pg');

// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "perntodo",
//     password: "Sujal@2003",
//     port: 5432,
// })


const pool = new Pool({

    connectionString: "postgres://default:KFes1UxZT9aJ@ep-frosty-smoke-78032495-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb" + "?sslmode=require",
  
  })




module.exports = pool ;