// Direct test script for deepseek3.2 connection
async function testDeepseekConnection() {
  try {
    console.log('Testing deepseek3.2 connection directly...');
    
    const apiKey = 'sk-366a2d261ad84510a612fddfd47ccc9f';
    const baseUrl = 'https://api.deepseek.com/v1/chat/completions';
    
    console.log('Testing URL:', baseUrl);
    console.log('API Key:', apiKey.substring(0, 5) + '...' + apiKey.substring(apiKey.length - 5));
    
    const testMessages = [{
      role: 'user',
      content: "Hello, this is a test to verify API connectivity. Please respond with 'API test successful'."
    }];
    
    const requestData = {
      model: 'deepseek3.2',
      messages: testMessages,
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 0.9,
      frequency_penalty: 0,
      presence_penalty: 0
    };
    
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
        console.log('✅ deepseek3.2 connection test PASSED!');
        console.log('  Response:', data.choices[0].message.content);
      } else {
        console.error('❌ deepseek3.2 connection test FAILED: Invalid response format');
      }
    } else {
      console.error('❌ deepseek3.2 connection test FAILED:');
      console.error('  Status:', response.status);
      console.error('  Error:', data.error || 'Unknown error');
    }
    
  } catch (error) {
    console.error('❌ Error testing deepseek3.2 connection:', error);
    console.error('  Error message:', error.message);
    if (error.cause) {
      console.error('  Error cause:', error.cause);
    }
  }
}

testDeepseekConnection();
