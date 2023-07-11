const { OUT_FORMAT_OBJECT } = require('oracledb');
const oracledb = require('oracledb');
oracledb.outFormat = OUT_FORMAT_OBJECT
async function getConnection(){

    try{
        connection = await oracledb.getConnection({
            user: 'fride',
            password: 'fride0503$h',
            connectString: 'localhost:1521/orcl'
        });

        console.log("Successfully connected");
        
    } catch(err){

        console.log("NOT connected");
    }
    return connection
}

module.exports = getConnection