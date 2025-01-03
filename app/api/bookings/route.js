import mysql from "mysql2/promise";

// POST method to create a new booking
export async function POST(req) {
  try {
    const { name, email, phone, guests, date, time } = await req.json();

    if (!name || !email || !phone || !guests || !date || !time) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        { status: 400 }
      );
    }

    // Connect to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // Insert booking data
    const query = `
      INSERT INTO bookings (name, email, phone, guests, date, time)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await connection.execute(query, [name, email, phone, guests, date, time]);

    // Close the database connection
    await connection.end();

    return new Response(JSON.stringify({ message: "Booking saved!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    return new Response(JSON.stringify({ error: "Something went wrong!" }), {
      status: 500,
    });
  }
}

// GET method to fetch all bookings
export async function GET() {
  try {
    // Connect to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // Fetch all bookings
    const [rows] = await connection.execute("SELECT * FROM bookings");

    // Close the database connection
    await connection.end();

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new Response(
      JSON.stringify({
        error: "Something went wrong while fetching bookings!",
      }),
      { status: 500 }
    );
  }
}

// DELETE method to delete a booking
export async function DELETE(req) {
  try {
    // Extract the booking ID from the request query
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Booking ID is required." }),
        {
          status: 400,
        }
      );
    }

    // Connect to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // Delete the booking with the specified ID
    const query = "DELETE FROM bookings WHERE id = ?";
    const [result] = await connection.execute(query, [id]);

    // Close the database connection
    await connection.end();

    if (result.affectedRows > 0) {
      return new Response(JSON.stringify({ message: "Booking deleted!" }), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Booking not found or already deleted." }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong while deleting booking!" }),
      { status: 500 }
    );
  }
}
