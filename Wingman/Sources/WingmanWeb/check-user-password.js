const mysql = require('mysql2/promise');

// Database connection configuration
const dbConfig = {
  host: '101.132.156.250',
  port: 33320,
  user: 'wingman_db_usr_8a2Xy',
  password: 'Z8#kP2@vQ7$mE5!tR3&wX9*yB4',
  database: 'wingman_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000,
  charset: 'utf8mb4',
  multipleStatements: false
};

async function checkUserPassword() {
  console.log('Checking user password...');
  
  try {
    // Create a connection
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connection established successfully!');
    
    // Get user information
    console.log('Getting user information...');
    const [users] = await connection.execute(
      'SELECT id, name, email, password FROM users WHERE email = ?',
      ['aidan@ethanhuang.com']
    );
    
    if (users.length === 0) {
      console.error('❌ User not found');
      await connection.end();
      return;
    }
    
    const user = users[0];
    console.log('User found:', {
      id: user.id,
      name: user.name,
      email: user.email,
      hasPassword: !!user.password,
      passwordLength: user.password ? user.password.length : 0
    });
    
    // Test password verification
    const bcrypt = require('bcrypt');
    const testPasswords = ['test123', 'Aidan123!', 'aidan123', 'password123'];
    
    console.log('\nTesting password verification...');
    for (const password of testPasswords) {
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`Password "${password}": ${isMatch ? '✅ MATCH' : '❌ NO MATCH'}`);
      } catch (error) {
        console.error(`Error testing password "${password}":`, error.message);
      }
    }
    
    // Close the connection
    await connection.end();
    console.log('\n✅ Connection closed successfully!');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
}

checkUserPassword();
