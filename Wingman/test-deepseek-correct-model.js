// Test script with correct DeepSeek model names
async function testDeepseekConnection() {
  try {
    console.log('Testing DeepSeek connection with correct model names...');
    
    const apiKey = 'sk-366a2d261ad84510a612fddfd47ccc9f';
    const baseUrl = 'https://api.deepseek.com/v1/chat/completions';
    
    console.log('Testing URL:', baseUrl);
    console.log('API Key:', apiKey.substring(0, 5) + '...' + apiKey.substring(apiKey.length - 5));
    
    // Test with deepseek-chat model (most likely correct model name)
    const testMessages = [{
      role: 'user',
      content: "Hello, this is a test to verify API connectivity. Please respond with 'API test successful'."
    }];
    
    const requestData = {
      model: 'deepseek-chat',
      messages: testMessages,
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 0.9,
      frequency_penalty: 0,
      presence_penalty: 0
    };
    
    console.log('Testing with model: deepseek-chat');
    console.log('Sending API request...');
    
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Wingman AI Agent'
      },
      body: JSON.stringify(requestData),
      timeout: 30000
    });
    
    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        console.log('✅ DeepSeek connection test PASSED!');
        console.log('  Response:', data.choices[0].message.content);
        
        // Update the provider with the correct model name
        console.log('\nUpdating database with correct model name...');
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({
          host: '101.132.156.250',
          port: 33320,
          user: 'wingman_db_usr_8a2Xy',
          password: 'Z8#kP2@vQ7$mE5!tR3&wX9*yB4',
          database: 'wingman_db'
        });
        
        const connection = await pool.getConnection();
        await connection.execute(
          `UPDATE ai_providers SET default_model = ? WHERE id = ?`,
          ['deepseek-chat', 'deepseek3.2']
        );
        await connection.release();
        await pool.end();
        
        console.log('✅ Updated deepseek3.2 provider with correct model name: deepseek-chat');
        
      } else {
        console.error('❌ DeepSeek connection test FAILED: Invalid response format');
      }
    } else {
      console.error('❌ DeepSeek connection test FAILED:');
      console.error('  Status:', response.status);
      console.error('  Error:', data.error || 'Unknown error');
      
      // Try with other possible model names
      console.log('\nTrying with model: deepseek-llm');
      const requestData2 = {
        ...requestData,
        model: 'deepseek-llm'
      };
      
      const response2 = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'Wingman AI Agent'
        },
        body: JSON.stringify(requestData2),
        timeout: 30000
      });
      
      console.log('Response status:', response2.status);
      const data2 = await response2.json();
      console.log('Response data:', JSON.stringify(data2, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error testing DeepSeek connection:', error);
    console.error('  Error message:', error.message);
    if (error.cause) {
      console.error('  Error cause:', error.cause);
    }
  }
}

testDeepseekConnection();
