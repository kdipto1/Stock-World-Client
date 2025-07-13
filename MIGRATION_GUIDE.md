# StockWorld Client Migration Guide

## Safe Migration Strategy

This guide outlines the safe approach to migrate your React client to use the new server-side architecture while maintaining backward compatibility.

### Phase 1: Setup (✅ Complete)

1. **Created API Configuration Layer**
   - `src/config/api.js` - Centralized API configuration with feature flags
   - `src/services/httpClient.js` - Axios instance with interceptors
   - `src/services/authService.js` - Authentication service
   - `src/services/inventoryService.js` - Inventory service

2. **Created Custom Hooks**
   - `src/hooks/useInventory.js` - React Query hooks for inventory operations

3. **Environment Configuration**
   - Updated `.env.local` with API settings
   - Added `REACT_APP_USE_NEW_API=false` (starts with old API)

### Phase 2: Component Migration (🔄 In Progress)

#### Components Ready for Migration:
- ✅ `src/Pages/HomeItems/HomeItems.new.js` - Updated to use new service layer
- ✅ `src/Pages/Login/Login.new.js` - Updated to use new auth service

#### Components to Migrate:
- ⏳ `src/Pages/ManageInventory/ManageInventory.js`
- ⏳ `src/Pages/ManageProduct/ManageProduct.js`
- ⏳ `src/Pages/AddProduct/AddProduct.js`
- ⏳ `src/Pages/MyProducts/MyProducts.js`

### Phase 3: Testing Strategy

#### Step 1: Test with Old API (Current)
```bash
# Ensure old API still works
REACT_APP_USE_NEW_API=false npm start
```

#### Step 2: Test with New API (When Ready)
```bash
# Test new API structure
REACT_APP_USE_NEW_API=true npm start
```

#### Step 3: A/B Testing
- Deploy with feature flag enabled
- Gradually roll out to users
- Monitor for errors and rollback if needed

### Phase 4: Deployment Strategy

#### Development Environment
1. Start new server: `cd ../new/stock-world-server && npm run dev`
2. Update environment: `REACT_APP_USE_NEW_API=true`
3. Test all functionality
4. Fix any issues

#### Production Environment
1. Deploy new server to production
2. Update environment variables
3. Enable feature flag: `REACT_APP_USE_NEW_API=true`
4. Monitor application health

### Key Features of New Architecture

#### 1. **Backward Compatibility**
- Old API calls still work
- Feature flag controls which API to use
- Gradual migration without breaking changes

#### 2. **Enhanced Error Handling**
- Consistent error responses
- Automatic token refresh
- Better user feedback

#### 3. **Improved Performance**
- React Query caching
- Automatic background updates
- Optimistic updates

#### 4. **Better Developer Experience**
- TypeScript support ready
- Centralized API configuration
- Reusable service layer

### How to Use New Components

#### Replace HomeItems Component:
```bash
# Backup original
mv src/Pages/HomeItems/HomeItems.js src/Pages/HomeItems/HomeItems.old.js

# Use new version
mv src/Pages/HomeItems/HomeItems.new.js src/Pages/HomeItems/HomeItems.js
```

#### Replace Login Component:
```bash
# Backup original
mv src/Pages/Login/Login.js src/Pages/Login/Login.old.js

# Use new version
mv src/Pages/Login/Login.new.js src/Pages/Login/Login.js
```

### Monitoring and Rollback

#### Health Checks
- Monitor API response times
- Track error rates
- Check user authentication success

#### Rollback Strategy
```bash
# Quick rollback to old API
export REACT_APP_USE_NEW_API=false
# Restart application
```

### Next Steps

1. **Complete Component Migration**
   - Migrate remaining components
   - Test thoroughly
   - Update documentation

2. **Enhanced Features**
   - Add input validation
   - Implement caching strategies
   - Add error boundaries

3. **Performance Optimization**
   - Implement code splitting
   - Add service worker
   - Optimize bundle size

4. **Security Enhancements**
   - Add CSRF protection
   - Implement rate limiting
   - Add input sanitization

### Environment Variables Reference

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_USE_NEW_API=false

# Firebase Configuration (existing)
REACT_APP_apiKey=your_firebase_key
REACT_APP_authDomain=your_firebase_domain
# ... other Firebase settings
```

### Troubleshooting

#### Common Issues:
1. **CORS Errors** - Ensure server has proper CORS configuration
2. **Authentication Failures** - Check token format and expiration
3. **API Response Format** - Verify response structure matches expectations

#### Debug Commands:
```bash
# Check current API configuration
console.log(process.env.REACT_APP_USE_NEW_API)

# Test API endpoints
curl -X GET http://localhost:5000/api/v1/inventory/home
```

This migration strategy ensures zero downtime and provides a safe path to adopt the new server architecture.
