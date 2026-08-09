
import axios from 'axios';

const API_URL = 'http://localhost:5200/api';

async function testAuth() {
    console.log('🧪 Starting Auth Tests...');
    const testUser = {
        name: 'Test Student',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
    };
    let token = '';

    // 1. Register
    try {
        console.log(`\n1. Testing Registration (${testUser.email})...`);
        const regRes = await axios.post(`${API_URL}/auth/register`, testUser);
        console.log('✅ Registration Successful:', regRes.data.message);
    } catch (error) {
        console.error('❌ Registration Failed:', error.response?.data || error.message);
        return;
    }

    // 2. Login
    try {
        console.log('\n2. Testing Login...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: testUser.email,
            password: testUser.password
        });
        console.log('✅ Login Successful');
        token = loginRes.data.token;
        console.log('🔑 Token received');
    } catch (error) {
        console.error('❌ Login Failed:', error.response?.data || error.message);
        return;
    }

    // 3. Test Protected Route (Fail case)
    try {
        console.log('\n3. Testing Protected Route (No Token)...');
        await axios.get(`${API_URL}/auth/me`); // Assuming this endpoint exists or similar
        console.error('❌ Expected failure but request succeeded');
    } catch (error) {
        if (error.response?.status === 401) {
            console.log('✅ Correctly rejected without token (401)');
        } else {
            console.error('❌ Unexpected error code:', error.response?.status);
        }
    }

    // 4. Test Protected Route (Success case)
    try {
        console.log('\n4. Testing Protected Route (With Token)...');
        const meRes = await axios.get(`${API_URL}/auth/me`, {
            headers: { token: token }
        });
        console.log('✅ Access Granted:', meRes.data.user.email);
    } catch (error) {
        console.error('❌ Access Failed:', error.response?.data || error.message);
    }

    // 5. Test Teacher Registration
    try {
        console.log('\n5. Testing Teacher Registration...');
        const teacherUser = {
            name: 'Test Teacher',
            email: `teacher${Date.now()}@example.com`,
            password: 'password123',
            role: 'instructor'
        };
        const regRes = await axios.post(`${API_URL}/auth/register`, teacherUser);
        console.log('✅ Teacher Registration Successful:', regRes.data.user.role);
    } catch (error) {
        console.error('❌ Teacher Registration Failed:', error.response?.data || error.message);
    }
}

testAuth();
