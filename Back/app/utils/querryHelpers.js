const OracleDB = require("oracledb");
const { outFormat } = require("oracledb");
const getConnection = require("./db");

const getAdmin = async (req, res) => {
    
      try {
        const connection = await getConnection()
        const result = await connection.execute('SELECT * FROM AGENT');
        res.json(result.rows);
        await connection.close();
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
};

module.exports = {
    getAdmin
};