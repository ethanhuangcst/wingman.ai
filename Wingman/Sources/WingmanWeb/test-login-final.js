const axios = require('axios');

async function testLogin() {
  console.log('Testing login with correct password...');
  
  try {
    const response = await axios.post('http://localhost:3002/api/login', {
      email: 'aidan@ethanhuang.com',
      password: 'password123',
      rememberMe: false
    }, {
      timeout: 30000,
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

testLogin();
