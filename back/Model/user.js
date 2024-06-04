const db = require('../utils/dbconnector');
const bcrypt = require('bcrypt');

class UserModel {
    static async authenticate(name, password) {
        try {
            const [rows] = await db.execute('SELECT * FROM Users WHERE name_user = ? LIMIT 1', [name]);
            if (rows.length > 0) {
                const user = rows[0];
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    return user;
                }
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async register(name, password, Role) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const params = [name, hashedPassword, Role];
            const sanitizedParams = params.map(value => (typeof value !== 'undefined' ? value : null));
            const [result] = await db.execute('CALL AddUser(?,?,?)', sanitizedParams);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;
