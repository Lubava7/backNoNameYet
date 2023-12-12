// psql 'postgresql://Lubava7:HzhL1QkOAu8X@ep-hidden-cloud-21432106.eu-central-1.aws.neon.tech/noNameYetDB?sslmode=require'

// with Pool connection
// psql 'postgresql://Lubava7:HzhL1QkOAu8X@ep-hidden-cloud-21432106-pooler.eu-central-1.aws.neon.tech/noNameYetDB?sslmode=require'

// my noNameApiKey
// jm73w68ztd0sp000jz0l6cwvw52p0f804xsdpvvbw2mhtylxpbghec03bwz6iwmc

import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
  connectionString: process.env.DB_POOL_URL_NEON,

  ssl: true,

  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

export async function getPostgresVersion() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT version()');
    console.log(res.rows[0]);
  } finally {
    client.release();
  }
}

const getJobs = async (result) => {
  const client = await pool.connect();
  try {
    const res = await client.query(`Select * from "jobs"`);
    ///
    const htmlTable = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Total time</th>
            <th>Deadline</th>
            <th>Stack</th>
            <th>Price</th>
            <th>Required skills</th>
            <th>Categories</th>
            <th>Visibility</th>
            <th>Type</th>
            <th>Client Id</th>
            <th>Status Id</th>
          </tr>
        </thead>
        <tbody>
          ${res.rows
            .map(
              (row) => `
            <tr>
              <td>${row.id}</td>
              <td>${row.name}</td>
              <td>${row.description}</td>
              <td>${row.total_time}</td>
              <td>${row.deadline}</td>
              <td>${row.stack}</td>
              <td>${row.price}</td>
              <td>${row.required_skills}</td>
              <td>${row.categories}</td>
              <td>${row.visibility}</td>
              <td>${row.type}</td>
              <td>${row.client_id}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
    ///
    result.send(htmlTable);
    // result.json(res.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    result.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
};

const getClients = async (result) => {
  const client = await pool.connect();
  try {
    const res = await client.query(`Select * from "clients"`);
    ///
    const htmlTable = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>LastName</th>
            <th>Middlename</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Type</th>
            <th>Password</th>
            <th>Username</th>
            <th>Account status</th>
            <th>Account lastLoginTimeStamp</th>
            <th>Preferences lang</th>
            <th>Preferences notification</th>
            <th>Communication preferredTime</th>
          </tr>
        </thead>
        <tbody>
          ${res.rows
            .map(
              (row) => `
            <tr>
              <td>${row.id}</td>
              <td>${row.first_name}</td>
              <td>${row.last_name}</td>
              <td>${row.middle_name}</td>
              <td>${row.phone}</td>
              <td>${row.email}</td>
              <td>${row.type}</td>
              <td>${row.password}</td>
              <td>${row.username}</td>
              <td>${row.account_status}</td>
              <td>${row.account_lastLoginTimeStamp}</td>
              <td>${row.preferences_lang}</td>
              <td>${row.preferences_notification_id}</td>
              <td>${row.communication_preferredTime}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
    ///
    // result.send(htmlTable); // для красивого отображения на бэке
    result.json(res.rows); // для передачи на фронтенд
  } catch (error) {
    console.error('Error executing query:', error);
    result.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
};

const getDevelopers = async (result) => {
  const client = await pool.connect();
  try {
    const res = await client.query(`Select * from "developers"`);
    ///
    const htmlTable = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>LastName</th>
            <th>Middlename</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Type</th>
            <th>Password</th>
            <th>Username</th>
            <th>Account status</th>
            <th>Account lastLoginTimeStamp</th>
            <th>Preferences lang</th>
            <th>Preferences notification</th>
            <th>Communication preferredTime</th>
          </tr>
        </thead>
        <tbody>
          ${res.rows
            .map(
              (row) => `
            <tr>
              <td>${row.id}</td>
              <td>${row.first_name}</td>
              <td>${row.last_name}</td>
              <td>${row.middle_name}</td>
              <td>${row.phone}</td>
              <td>${row.email}</td>
              <td>${row.type}</td>
              <td>${row.password}</td>
              <td>${row.username}</td>
              <td>${row.account_status}</td>
              <td>${row.account_lastLoginTimeStamp}</td>
              <td>${row.preferences_lang}</td>
              <td>${row.preferences_notification_id}</td>
              <td>${row.communication_preferredTime}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
    ///
    // result.send(htmlTable); // для красивого отображения на бэке
    result.json(res.rows); // для передачи на фронтенд
  } catch (error) {
    console.error('Error executing query:', error);
    result.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
};

export default { pool, getJobs, getClients, getDevelopers };
