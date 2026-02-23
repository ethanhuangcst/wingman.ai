const axios = require('axios');

async function testLogin() {
  console.log('Testing login functionality...');
  
  try {
    const response = await axios.post('http://localhost:3002/api/login', {
      email: 'aidan@ethanhuang.com',
      password: 'test123',
      rememberMe: false
    }, {
      timeout: 30000, // 30 second timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Login successful!');
    console.log('Response status:', response.status);
    console.log('Response data:', {
      success: response.data.success,
      message: response.data.message,
      user: response.data.user ? {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email
      } : null,
      token: response.data.token ? response.data.token.substring(0, 50) + '...' : null
    });
    
    return true;
  } catch (error) {
    console.error('❌ Login failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return false;
  }
}

async function testMultipleLogins() {
  console.log('\nTesting multiple login attempts...');
  
  const attempts = 3;
  const results = [];
  
  for (let i = 1; i <= attempts; i++) {
    console.log(`\nAttempt ${i}:`);
    const success = await testLogin();
    results.push(success);
    
    // Add a small delay between attempts
    if (i < attempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('\n=== Test Results ===');
  console.log(`Total attempts: ${attempts}`);
  console.log(`Successful attempts: ${results.filter(r => r).length}`);
  console.log(`Failed attempts: ${results.filter(r => !r).length}`);
}

testMultipleLogins();
