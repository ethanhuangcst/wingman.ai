// Script to add deepseek3.2 provider to the database
const db = require('./Sources/WingmanWeb/app/lib/database.ts').db;

async function addDeepseekProvider() {
  try {
    console.log('Adding deepseek3.2 provider to database...');
    
    // Add the deepseek3.2 provider
    await db.executeRaw(
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
    const [providers] = await db.execute(
      'SELECT * FROM ai_providers WHERE id = ?',
      ['deepseek3.2']
    );
    
    if (Array.isArray(providers) && providers.length > 0) {
      console.log('✅ Provider verification successful:');
      console.log('  ID:', providers[0].id);
      console.log('  Name:', providers[0].name);
      console.log('  Base URLs:', providers[0].base_urls);
      console.log('  Default Model:', providers[0].default_model);
    } else {
      console.log('❌ Provider verification failed');
    }
    
    // List all providers
    const [allProviders] = await db.execute('SELECT id, name, default_model FROM ai_providers ORDER BY created_at ASC');
    console.log('\n📋 All providers in database:');
    if (Array.isArray(allProviders)) {
      allProviders.forEach((provider, index) => {
        console.log(`  ${index + 1}. ${provider.id} - ${provider.name} (${provider.default_model})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error adding deepseek3.2 provider:', error);
  } finally {
    // Close database connection
    await db.close();
  }
}

addDeepseekProvider();
