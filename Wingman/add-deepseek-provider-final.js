// Script to add deepseek3.2 provider to the database
const mysql = require('mysql2/promise');

async function addDeepseekProvider() {
  try {
    console.log('Adding deepseek3.2 provider to database...');
    
    // Create database connection
    const pool = mysql.createPool({
      host: '101.132.156.250',
      port: 33320,
      user: 'wingman_db_usr_8a2Xy',
      password: 'Z8#kP2@vQ7$mE5!tR3&wX9*yB4',
      database: 'wingman_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();

    try {
      // Add the deepseek3.2 provider
      await connection.execute(
        `INSERT INTO ai_providers (id, name, base_urls, default_model, requires_auth, auth_header)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           base_urls = VALUES(base_urls),
           default_model = VALUES(default_model),
           requires_auth = VALUES(requires_auth),
           auth_header = VALUES(auth_header),
           updated_at = CURRENT_TIMESTAMP`,
        [
          'deepseek3.2',
          'deepseek3.2',
          '["https://api.deepseek.com/v1"]',
          'deepseek3.2',
          true,
          'Authorization'
        ]
      );
      
      console.log('✅ deepseek3.2 provider added successfully!');
      
      // Verify the provider was added
      const [providers] = await connection.execute(
        'SELECT * FROM ai_providers WHERE id = ?',
        ['deepseek3.2']
      );
      
      if (providers.length > 0) {
        console.log('✅ Provider verification successful:');
        console.log('  ID:', providers[0].id);
        console.log('  Name:', providers[0].name);
        console.log('  Base URLs:', providers[0].base_urls);
        console.log('  Default Model:', providers[0].default_model);
      } else {
        console.log('❌ Provider verification failed');
      }
      
      // List all providers
      const [allProviders] = await connection.execute('SELECT id, name, default_model FROM ai_providers ORDER BY created_at ASC');
      console.log('\n📋 All providers in database:');
      allProviders.forEach((provider, index) => {
        console.log(`  ${index + 1}. ${provider.id} - ${provider.name} (${provider.default_model})`);
      });
      
    } finally {
      connection.release();
      await pool.end();
    }
    
  } catch (error) {
    console.error('❌ Error adding deepseek3.2 provider:', error);
  }
}

addDeepseekProvider();
