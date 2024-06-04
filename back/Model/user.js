const db = require('../utils/dbconnector')
const bcrypt = require('bcrypt')

class UserModel{

    static async authenticate(name, password){
        try {
            const [row] = await db.execute(`SELECT * FROM Users WHERE user_name = ? LIMIT 1`, [name])
            if (row.length > 0) {
                const user = row[0]
                const passwordMatch = await bcrypt.compare(password, user.password)
                if (passwordMatch) {
                    return user
                }
            }
        }catch (error){
            throw error
        }
    }

    static async register (name, password){
        try{
            const hashedPassword = await bcrypt.hash(password, 10)
            const params =[name, hashedPassword]
            const sanitizedParams = params.map(value => (typeof value !== 'undefined' ? value : null))
            const [result] = await db.execute('CALL AddUser(?,?)', sanitizedParams)
            return result.insertId
        }catch (error){
            throw error
        }
    }
}

module.exports = UserModel