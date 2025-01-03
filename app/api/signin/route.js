import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // Check for email or phone number match
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE (email = ? OR phone = ?) AND password = ?",
      [identifier, identifier, password]
    );

    await connection.end();

    if (rows.length > 0) {
      return new Response(JSON.stringify({ message: "Sign in successful!" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Invalid credentials." }), {
        status: 401,
      });
    }
  } catch (error) {
    console.error("Sign In API Error:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
    });
  }
}
