import { createConnection } from 'mysql2/promise';

export const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql-test',
    port: 3307
});

export class User {
    static async login ({username, password}) {
        Validation.username(username);
        Validation.password(password);

        const [rows] = await db.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        return rows;
    }

}

class Validation {
    static validateLogin = (req, res, next) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        next();
    }

    static username (username) {
        if (typeof username !== 'string') throw new Error('Username must be a string');
        if (username.length < 3) throw new Error('Username must be at least 3 characters long');
    }

    static password (password) {
        if (typeof password !== 'string') throw new Error('Password must be a string');
        if (password.length < 6) throw new Error('Password must be at least 6 characters long');
    }
}