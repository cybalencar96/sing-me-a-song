import connection from '../connection.js';

async function insert({ name, youtubeLink}) {
    const result = await connection.query(`
        INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2) RETURNING *
    `, [name, youtubeLink]);

    return result.rows[0];
}

async function vote({ type, id }) {
    const op = type === 'up' ? '+' : '-';

    const result = await connection.query(`
        UPDATE recommendations SET score = score ${op} 1 WHERE id = $1 RETURNING *
    `, [id]);

    return result.rows[0];
}

async function remove({ id }) {
    await connection.query(`
        DELETE FROM recommendations WHERE id = $1
    `, [id]);
}

async function get() {
    const result = await connection.query('SELECT * FROM recommendations');
    return result.rows;
}

export {
    insert,
    vote,
    remove,
    get,
}
