import connection from './db.js';

export function read(callback){
    connection.query('SELECT * FROM ticket', callback);
}

export function create(nome, produto, data, whatsapp, mensagem) {
    connection.query('INSERT INTO ticket (nome, produto, data, whatsapp, mensagem, ativo, status) VALUES (?, ?, ?, ?, ?, 1, 1)', [nome, produto, data, whatsapp, mensagem]);
}

export function update(id, novoDados, callback){
    connection.query('UPDATE ticket SET ? WHERE id = ?', [novoDados, id], callback);
}

export function deleteTick(id, callback){
    connection.query('DELETE FROM ticket WHERE id = ?', [id], callback);
}