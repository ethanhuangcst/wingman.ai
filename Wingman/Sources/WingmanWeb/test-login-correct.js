const axios = require('axios');

async function testLogin() {
  console.log('Testing login with correct password...');
  
  try {
    const response = await axios.post('http://localhost:3002/api/login', {
      email: 'aidan@ethanhuang.com',
      password: 'Aidan123!',
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
      token: response.data.token ? response.data.token.substring(0, 50) + '...' : null,
      apiTest: response.data.apiTest
    });
    
    // Test account endpoint with token
    if (response.data.token) {
      console.log('\nTesting account endpoint with token...');
      const accountResponse = await axios.get('http://localhost:3002/api/account', {
        headers: {
          'Authorization': `Bearer ${response.data.token}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });
      
      console.log('✅ Account endpoint successful!');
      console.log('Account response status:', accountResponse.status);
      console.log('Account data:', {
        success: accountResponse.data.success,
        user: accountResponse.data.user ? {
          id: accountResponse.data.user.id,
          name: accountResponse.data.user.name,
          email: accountResponse.data.user.email,
          aiConnections: accountResponse.data.user.aiConnections ? accountResponse.data.user.aiConnections.length : 0
        } : null
      });
    }
    
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

testLogin();
