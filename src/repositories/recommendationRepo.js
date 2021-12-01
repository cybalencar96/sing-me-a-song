import connection from '../connection.js';

async function insert({ name, youtubeLink}) {
    const result = await connection.query(`
        INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2) RETURNING *
    `, [name, youtubeLink]);

    return result.rows[0];
}

async function upVote({ id }) {
    const result = await connection.query(`
        UPDATE recommendations SET score = score + 1 WHERE id = $1 RETURNING *
    `, [id]);

    return result.rows[0];
}

export {
    insert,
    upVote,
}
