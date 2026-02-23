import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body
    const body = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        timestamp: new Date().toISOString()
      }, {
        status: 400
      });
    }

    // Connect to database
    const connection = await mysql.createConnection({
      host: '101.132.156.250',
      port: 33320,
      user: 'wingman_db_usr_8a2Xy',
      password: 'Z8#kP2@vQ7$mE5!tR3&wX9*yB4',
      database: 'wingman_db'
    });

    // Check if email exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      await connection.end();
      return NextResponse.json({
        success: false,
        error: 'Email already registered',
        timestamp: new Date().toISOString()
      }, {
        status: 400
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user using correct column name 'name' instead of 'username'
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      userId: (result as any).insertId,
      timestamp: new Date().toISOString()
    }, {
      status: 201
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      error: 'Registration failed. Please try again.',
      errorDetails: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, {
      status: 500
    });
  }
}
