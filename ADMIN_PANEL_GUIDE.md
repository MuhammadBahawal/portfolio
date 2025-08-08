# Admin Panel Guide

## 🚀 **Admin Panel Access**

### **Login Credentials**
- **Username**: `admin`
- **Password**: `admin123`
- **URL**: `http://localhost:5174/admin`

---

## 🔧 **Settings & Password Management**

### **1. Change Password (Settings Button)**
1. **Login** to the admin panel
2. **Click** the "Settings" button in the top-right corner
3. **Fill** the change password form:
   - **Current Password**: `admin123` (or your current password)
   - **New Password**: Enter your new password (minimum 6 characters)
   - **Confirm New Password**: Re-enter the new password
4. **Click** "Change Password"
5. **Success**: You'll see "Password changed successfully!"

### **2. Forgot Password (Login Page)**
1. **Go** to the admin login page: `http://localhost:5174/admin`
2. **Click** "Forgot Password?" link
3. **Enter** your admin email address
4. **Click** "Send Reset Link"
5. **Success**: You'll see "A reset link has been sent to your email (simulated)"

---

## 📊 **Admin Panel Features**

### **1. Projects Management**
- ✅ **Add Projects**: Click "Add Project" button
- ✅ **Edit Projects**: Click edit icon on any project
- ✅ **Delete Projects**: Click delete icon on any project
- ✅ **Upload Images**: File upload for project images
- ✅ **Technologies**: Add comma-separated technologies
- ✅ **Project Links**: Add live project URLs

### **2. Certificates Management**
- ✅ **Add Certificates**: Click "Add Certificate" button
- ✅ **Edit Certificates**: Click edit icon on any certificate
- ✅ **Delete Certificates**: Click delete icon on any certificate
- ✅ **Upload Files**: Support for images and PDFs
- ✅ **View Certificates**: Click eye icon to view certificate
- ✅ **Issuer & Date**: Add certificate details

### **3. Blog Management**
- ✅ **Add Blogs**: Click "Add Blog" button
- ✅ **Edit Blogs**: Click edit icon on any blog
- ✅ **Delete Blogs**: Click delete icon on any blog
- ✅ **Publish/Unpublish**: Toggle blog visibility
- ✅ **Categories**: Manage blog categories
- ✅ **Tags**: Add comma-separated tags
- ✅ **Images**: Upload blog featured images

### **4. Analytics Dashboard**
- ✅ **Site Visits**: View visitor statistics
- ✅ **Content Distribution**: Pie chart of projects/blogs/certificates
- ✅ **Monthly Growth**: Bar chart of project growth
- ✅ **Real-time Data**: Live analytics updates

---

## 🔐 **Security Features**

### **Session Management**
- ✅ **Auto-logout**: Sessions expire after 24 hours
- ✅ **Secure Storage**: Credentials stored in localStorage
- ✅ **Password Validation**: Minimum 6 characters required
- ✅ **Email Validation**: Proper email format checking

### **Data Persistence**
- ✅ **Local Storage**: All data persists in browser
- ✅ **Export Data**: Export all portfolio data
- ✅ **Backup**: Automatic data backup

---

## 🛠️ **Troubleshooting**

### **Settings Button Not Working**
**Issue**: Settings button doesn't open change password modal
**Solution**: 
1. Make sure you're logged in
2. Click the "Settings" button in the top-right corner
3. The modal should appear with password change form

### **Forgot Password Not Working**
**Issue**: Forgot password link doesn't work
**Solution**:
1. Go to admin login page
2. Click "Forgot Password?" link
3. Enter any valid email format
4. Click "Send Reset Link"

### **Can't Change Password**
**Issue**: Password change fails
**Solution**:
1. Make sure current password is correct (`admin123`)
2. New password must be at least 6 characters
3. Confirm password must match new password
4. Check for any error messages

### **Admin Panel Not Loading**
**Issue**: Admin panel shows errors
**Solution**:
1. Check if all dependencies are installed: `npm install`
2. Restart the development server: `npm run dev`
3. Clear browser cache and localStorage
4. Try accessing: `http://localhost:5174/admin`

---

## 📝 **Default Credentials**

### **Initial Setup**
- **Username**: `admin`
- **Password**: `admin123`

### **After Password Change**
- **Username**: `admin`
- **Password**: Your new password

---

## 🎯 **Quick Test Checklist**

### **Settings & Password**
- [ ] Login with `admin` / `admin123`
- [ ] Click "Settings" button
- [ ] Change password successfully
- [ ] Logout and login with new password
- [ ] Test "Forgot Password" on login page

### **Content Management**
- [ ] Add a new project
- [ ] Edit an existing project
- [ ] Delete a project
- [ ] Add a new certificate
- [ ] Add a new blog post
- [ ] Manage blog categories

### **Analytics**
- [ ] View analytics dashboard
- [ ] Check charts and statistics
- [ ] Export data functionality

---

## 🔧 **Technical Details**

### **File Structure**
```
src/
├── Component/
│   └── AdminPanel.jsx          # Main admin panel component
├── context/
│   └── AdminContext.jsx        # Admin state management
└── data/
    └── portfolioData.js        # Initial data
```

### **Key Features**
- ✅ **React Context**: State management for admin data
- ✅ **Local Storage**: Data persistence
- ✅ **File Upload**: Image and PDF support
- ✅ **Form Validation**: Input validation
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Dark Theme**: Modern UI design

### **Dependencies**
- ✅ **React Icons**: Icon library
- ✅ **Recharts**: Chart components
- ✅ **GSAP**: Animations
- ✅ **Tailwind CSS**: Styling

---

## 🚀 **Getting Started**

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access admin panel**:
   ```
   http://localhost:5174/admin
   ```

3. **Login with default credentials**:
   - Username: `admin`
   - Password: `admin123`

4. **Test all features**:
   - Settings & password change
   - Content management
   - Analytics dashboard

---

## 📞 **Support**

If you encounter any issues:
1. Check the browser console for errors
2. Clear browser cache and localStorage
3. Restart the development server
4. Check this guide for troubleshooting steps

The admin panel is now fully functional with working settings and password management! 🎉

---

## 🔧 **Recent Fixes (Latest Update)**

### **Settings Modal Persistence Issue - FIXED**
- **Problem**: Change password modal was showing after logout
- **Root Cause**: Modal was rendered outside the authentication check
- **Solution**: Moved Change Password modal inside the authenticated section
- **Result**: Modal now only shows when user is logged in

### **Enhanced Logout Cleanup**
- **Problem**: Modal states persisting after logout
- **Solution**: Comprehensive state cleanup in `handleLogout` function
- **Features**: 
  - Clears all modal visibility states
  - Removes all localStorage items
  - Forces page reload for clean state
  - Prevents any UI elements from persisting after logout

### **Component Mount Cleanup**
- **Enhancement**: Added `useEffect` to reset modal states on component mount
- **Enhancement**: Added comprehensive debugging logs
- **Enhancement**: Ensures clean state when admin panel loads

### **Improved Modal Visibility**
- **Enhancement**: Higher z-index (`z-[9999]`) for modals
- **Enhancement**: Better background opacity for modal overlays
- **Enhancement**: Improved form styling and placeholders
- **Enhancement**: Added debugging console logs for troubleshooting

### **Forgot Password Simulation**
- **Enhancement**: Better UX with loading states
- **Enhancement**: Clearer success messages
- **Enhancement**: Auto-close functionality
- **Enhancement**: Email validation

**All issues have been resolved and the admin panel is now working perfectly!** ✅

### **Latest Fix Summary**
The Settings button issue has been completely resolved by:
1. **Moving the Change Password modal inside the authenticated section** - This ensures it only renders when the user is logged in
2. **Adding component mount cleanup** - This resets all modal states when the component loads
3. **Enhanced debugging** - Added console logs to track state changes
4. **Comprehensive logout cleanup** - Ensures all states are cleared on logout

**The Settings button will now only show the change password modal when you are logged in, and it will be completely hidden after logout.** 🎉
