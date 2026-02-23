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

async function testDatabaseConnection() {
  console.log('Testing database connection...');
  
  try {
    // Create a connection
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connection established successfully!');
    
    // Test a simple query
    console.log('Testing simple query...');
    const [results] = await connection.execute('SELECT 1 + 1 as result');
    console.log('✅ Query executed successfully:', results);
    
    // Test user table query
    console.log('Testing user table query...');
    const [users] = await connection.execute('SELECT id, name, email FROM users LIMIT 5');
    console.log('✅ User query executed successfully:', users);
    
    // Close the connection
    await connection.end();
    console.log('✅ Connection closed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return false;
  }
}

async function testConnectionPool() {
  console.log('\nTesting connection pool...');
  
  try {
    // Create a pool
    const pool = mysql.createPool(dbConfig);
    
    // Get a connection from the pool
    const connection = await pool.getConnection();
    console.log('✅ Pool connection obtained successfully!');
    
    // Test a query
    const [results] = await connection.execute('SELECT NOW() as current_time');
    console.log('✅ Pool query executed successfully:', results);
    
    // Release the connection
    connection.release();
    console.log('✅ Pool connection released successfully!');
    
    // Close the pool
    await pool.end();
    console.log('✅ Pool closed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Connection pool error:', error);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('=== Database Connection Test ===\n');
  
  const connectionSuccess = await testDatabaseConnection();
  const poolSuccess = await testConnectionPool();
  
  console.log('\n=== Test Results ===');
  console.log('Direct connection:', connectionSuccess ? '✅ PASS' : '❌ FAIL');
  console.log('Connection pool:', poolSuccess ? '✅ PASS' : '❌ FAIL');
}

runTests();
