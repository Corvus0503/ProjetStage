const { OUT_FORMAT_OBJECT } = require('oracledb');
const oracledb = require('oracledb');
oracledb.outFormat = OUT_FORMAT_OBJECT
async function getConnection(){
    try{
        connection = await oracledb.getConnection({
            user: 'Herizo_berny',
            password: 'Zoutch2023',
            connectString: 'localhost:1521/orcl'
        });

        console.log("Connecté à la base de donnée");
        return connection
    } catch(err){
        console.log("NOT connected");
    }
    
}

module.exports = getConnection