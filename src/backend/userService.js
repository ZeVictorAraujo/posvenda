// userService.js

import connection from './db.js';

export async function findUserByEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]); // Retorna o primeiro resultado encontrado (supondo que email é único)
            }
        });
    });
}


