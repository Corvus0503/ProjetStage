const getConnection = require("./db")

const getAdmin = async () => {
    const connection = await getConnection()
    return connection.execute(
        'select * from admins',
    )
}

module.exports = {
    getAdmin
}