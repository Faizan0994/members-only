const pool = require("./pool");

exports.getAllposts = async () => {
  const { rows } = await pool.query(`SELECT 
                                    posts.title,
                                    posts.message,
                                    posts.id,
                                    posts.time,
                                    users.name
                                    FROM posts
                                    LEFT JOIN users ON posts.author_id = users.id;
                                `);
  return rows;
};

exports.savePost = async (title, message, id) => {
  await pool.query(
    "INSERT INTO posts (title, message, author_id) VALUES ($1, $2, $3);",
    [title, message, id]
  );
};

exports.makeMember = async (id) => {
  await pool.query(
    `UPDATE users
      SET member = true
      WHERE id = $1;`,
    [id]
  );
};

exports.deletePost = async (id) => {
  await pool.query("DELETE FROM posts WHERE id = $1", [id]);
};
