import { authService } from '../services/authService';
import { API_CONFIG } from '../config/api';

export const AuthDebugger = {
  /**
   * Log current authentication state
   */
  logAuthState() {
    const token = authService.getAccessToken();
    const email = authService.getUserEmail();
    const isAuth = authService.isAuthenticated();
    
    console.group('🔐 Authentication Debug');
    console.log('API Base URL:', API_CONFIG.BASE_URL);
    console.log('Is Authenticated:', isAuth);
    console.log('Token exists:', !!token);
    console.log('Token (first 20 chars):', token ? `${token.substring(0, 20)}...` : 'null');
    console.log('Email:', email);
    console.log('Local Storage Keys:', Object.keys(localStorage).filter(key => 
      key.includes('token') || key.includes('email')
    ));
    console.groupEnd();
  },

  /**
   * Test token validity by making a test API call
   */
  async testTokenValidity() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${authService.getAccessToken()}`,
          'Content-Type': 'application/json'
        }
      });

      console.group('🧪 Token Validity Test');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      
      if (response.status === 200) {
        console.log('✅ Token is valid');
      } else if (response.status === 401) {
        console.log('❌ Token is invalid or expired');
      } else {
        console.log('⚠️ Unexpected response');
      }
      
      console.groupEnd();
      return response.status === 200;
    } catch (error) {
      console.error('🚨 Token validity test failed:', error);
      return false;
    }
  },

  /**
   * Clear all authentication data
   */
  clearAuth() {
    authService.logout();
    console.log('🧹 Authentication data cleared');
  },

  /**
   * Check if Firebase config is properly set
   */
  checkFirebaseConfig() {
    const requiredVars = [
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN', 
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_STORAGE_BUCKET',
      'VITE_FIREBASE_MESSAGING_SENDER_ID',
      'VITE_FIREBASE_APP_ID'
    ];

    console.group('🔥 Firebase Configuration Check');
    requiredVars.forEach(varName => {
      const value = import.meta.env[varName];
      console.log(`${varName}:`, value ? '✅ Set' : '❌ Missing');
    });
    console.groupEnd();
  },

  /**
   * Run all debug checks
   */
  async runFullDiagnostic() {
    console.log('🔍 Running Authentication Diagnostic...\n');
    
    this.checkFirebaseConfig();
    this.logAuthState();
    
    if (authService.isAuthenticated()) {
      await this.testTokenValidity();
    }

    console.log('\n📋 Diagnostic Complete');
  }
};

// Make it available globally in development
if (import.meta.env.DEV) {
  (window as any).authDebug = AuthDebugger;
  console.log('🛠️ Auth debugger available at window.authDebug');
}
