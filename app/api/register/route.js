import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const { name, email, phone, password } = await req.json();

    // Validation
    if (!name || !email || !phone || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // Check if the email or phone already exists
    const [existingUser] = await connection.execute(
      "SELECT * FROM users WHERE email = ? OR phone = ?",
      [email, phone]
    );

    if (existingUser.length > 0) {
      await connection.end();
      return new Response(
        JSON.stringify({ message: "Email or Phone already exists." }),
        { status: 409 }
      );
    }

    // Insert the new user into the database
    await connection.execute(
      "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)",
      [name, email, phone, password]
    );

    await connection.end();
    return new Response(
      JSON.stringify({ message: "Registration successful!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API Error:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
    });
  }
}
