// Test script to verify deepseek3.2 connection
const { AI_API_CONNECTION } = require('./Sources/WingmanWeb/app/api/utils/ai-connection/ai-connection-service.ts');

async function testDeepseekConnection() {
  try {
    console.log('Testing deepseek3.2 connection...');
    
    // Test 1: Get provider config
    console.log('\n1. Getting deepseek3.2 provider config...');
    const providerConfig = await AI_API_CONNECTION.getProviderConfig('deepseek3.2');
    if (!providerConfig) {
      console.error('❌ Failed to get deepseek3.2 provider config');
      return;
    }
    console.log('✅ Provider config retrieved successfully:');
    console.log('  ID:', providerConfig.id);
    console.log('  Name:', providerConfig.name);
    console.log('  Base URLs:', providerConfig.base_urls);
    console.log('  Default Model:', providerConfig.default_model);
    
    // Test 2: Test connection with API key
    console.log('\n2. Testing deepseek3.2 connection with API key...');
    const apiKey = 'sk-366a2d261ad84510a612fddfd47ccc9f';
    
    const testMessages = [{
      role: 'user',
      content: "Hello, this is a test to verify API connectivity. Please respond with 'API test successful'."
    }];
    
    const result = await AI_API_CONNECTION.connectToAI('deepseek3.2', apiKey, testMessages);
    
    if (result.success) {
      console.log('✅ deepseek3.2 connection test PASSED!');
      console.log('  Response:', result.response);
      console.log('  Used URL:', result.usedUrl);
      console.log('  Attempts:', result.attempts);
    } else {
      console.error('❌ deepseek3.2 connection test FAILED:');
      console.error('  Error:', result.error);
      console.error('  Attempts:', result.attempts);
    }
    
    // Test 3: Test with the testConnection method
    console.log('\n3. Testing deepseek3.2 with testConnection method...');
    const testResult = await AI_API_CONNECTION.testConnection('deepseek3.2', apiKey);
    
    if (testResult.result === 'PASS') {
      console.log('✅ deepseek3.2 testConnection test PASSED!');
      console.log('  Response:', testResult.response);
      console.log('  Used URL:', testResult.usedUrl);
    } else {
      console.error('❌ deepseek3.2 testConnection test FAILED:');
      console.error('  Error:', testResult.error);
    }
    
    console.log('\n🎉 All deepseek3.2 connection tests completed!');
    
  } catch (error) {
    console.error('❌ Error testing deepseek3.2 connection:', error);
  }
}

testDeepseekConnection();
