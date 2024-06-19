import connection from './db.js';

export function read(callback){
    connection.query('SELECT * FROM ticket', callback);
}

export function create(nome, produto, data, whatsapp, mensagem) {
    connection.query('INSERT INTO ticket (nome, produto, data, whatsapp, mensagem, ativo) VALUES (?, ?, ?, ?, ?, 1)', [nome, produto, data, whatsapp, mensagem]);
}

export function update(id, novoDados, callback){
    connection.query('UPDATE ticket SET ? WHERE id = ?', [novoDados, id], callback);
}

export function deletePes(id, callback){
    connection.query('UPDATE ticket SET ativo = 0 WHERE id = ?', [id], callback);
}