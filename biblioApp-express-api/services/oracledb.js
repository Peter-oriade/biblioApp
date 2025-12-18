import oracledb from 'oracledb';
import { oracleSecrets } from '../secrets.js';

const dbConfig = {
  user: oracleSecrets.user,
  password: oracleSecrets.password,
  connectString: oracleSecrets.connectString
};

async function getAllFromTable(tableName) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
        `SELECT * FROM ${tableName}`,
        [],
        {outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
    return result.rows;
  } finally {
    if (connection) await connection.close();
  }
}

async function getFromTableWhere(tableName, field, id) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
        `SELECT * FROM ${tableName} WHERE ${field} = :id`,
        [id],
        {outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
    return result.rows[0];
  } finally {
    if (connection) await connection.close();
  }
}

async function getAllFromTableWhere(tableName, field, id) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
        `SELECT * FROM ${tableName} WHERE ${field} = :id`,
        [id],
        {outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
    return result.rows;
  } finally {
    if (connection) await connection.close();
  }
}

async function deleteFromTableWhere(tableName, field, id) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
        `DELETE FROM ${tableName} WHERE ${field} = :id`,
        [id],
        { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
    return result.rows;
  } finally {
    if (connection) await connection.close();
  }
}

async function patchFromTableWhereID(tableName, id, field, value) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
        `UPDATE ${tableName} SET ${field} = :value WHERE ID = :id`,
        {value: value, id: id},
        { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    if (connection) await connection.close();
  }
}

async function addToTable(tableName, data, idColumn = "ID") {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const keys = Object.keys(data);
    const values = Object.values(data);

    const columns = keys.map(k => `"${k}"`).join(', ');
    const bindVars = keys.map((_, i) => `:${i + 1}`).join(', ');

    const returning = `RETURNING "${idColumn}" INTO :out_id`;
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${bindVars}) ${returning}`;

    const bindParams = [...values, { dir: oracledb.BIND_OUT, type: oracledb.NUMBER}];
    const result = await connection.execute(sql, bindParams, { autoCommit: true });

    const id = result.outBinds?.[0]?.[0] ?? null;
    return { success: true, id };
  } finally {
    if (connection) await connection.close();
  }
}

export default { getAllFromTable, addToTable, getFromTableWhere, getAllFromTableWhere, deleteFromTableWhere, patchFromTableWhereID};