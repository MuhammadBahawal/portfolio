# Contact Form Troubleshooting Guide

## Current Status
Your contact form has been updated with comprehensive debugging and error handling. Here's how to test and fix any issues:

## Testing Steps

### 1. Open Browser Developer Console
1. Open your website at `http://localhost:5174/`
2. Press `F12` to open developer tools
3. Go to the "Console" tab

### 2. Test EmailJS Configuration
1. Look for a red "Test EmailJS" button in the bottom-right corner
2. Click it to test the EmailJS configuration
3. Check the console for detailed logs

### 3. Test Contact Form
1. Fill out the contact form with test data
2. Submit the form
3. Check the console for detailed error messages

## Debug Information

The contact form now logs detailed information:

### Success Case:
```
=== EMAILJS DEBUG INFO ===
Sending email with data: {name: "...", email: "...", ...}
Template parameters: {user_name: "...", user_email: "...", ...}
Service ID: service_u8nkfq8
Template ID: template_vg8yvg8
Public Key: coqd8TXoL3rGNrfy_
EmailJS object: [object]
EmailJS result: {status: 200, text: "OK"}
Result status: 200
Result text: OK
```

### Error Case:
```
=== EMAILJS ERROR ===
Error type: Error
Error message: [specific error message]
Error stack: [stack trace]
Full error object: [complete error object]
```

## Common Error Messages and Solutions

### 1. "Invalid template" error
**Cause**: Template ID is incorrect or template doesn't exist
**Solution**: 
- Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
- Check if template `template_vg8yvg8` exists
- Make sure it's published and active

### 2. "Invalid service" error
**Cause**: Service ID is incorrect or service doesn't exist
**Solution**:
- Go to EmailJS Dashboard
- Check if service `service_u8nkfq8` exists
- Make sure it's connected to your email provider

### 3. "Invalid public key" error
**Cause**: Public key is incorrect
**Solution**:
- Go to EmailJS Dashboard
- Copy the correct public key
- Update `src/config/emailjs.js`

### 4. "Network" or "Failed to fetch" error
**Cause**: Internet connection or CORS issues
**Solution**:
- Check your internet connection
- Try refreshing the page
- Check if your browser blocks the request

### 5. "EmailJS is not loaded" error
**Cause**: EmailJS library failed to load
**Solution**:
- Check if `@emailjs/browser` is installed
- Make sure EmailJS is initialized in `main.jsx`

## Configuration Verification

### Current Configuration:
```javascript
SERVICE_ID: "service_u8nkfq8"
TEMPLATE_ID: "template_vg8yvg8"
PUBLIC_KEY: "coqd8TXoL3rGNrfy_"
```

### To Update Configuration:
1. Edit `src/config/emailjs.js`
2. Update the values with your correct EmailJS settings
3. Restart the development server

## Alternative Solutions

### Option 1: Create New EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Create a new account
3. Set up a new email service (Gmail recommended)
4. Create a new email template
5. Update the configuration with new IDs

### Option 2: Use Formspree (Alternative)
If EmailJS continues to have issues, you can switch to Formspree:

1. Go to [Formspree](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Replace the contact form with Formspree integration

### Option 3: Use Netlify Forms
Since you're using Netlify, you can use Netlify Forms:

1. Add `name="contact"` to your form
2. Add `data-netlify="true"` to your form
3. Netlify will handle form submissions automatically

## Testing Checklist

- [ ] EmailJS is properly installed (`npm list @emailjs/browser`)
- [ ] EmailJS is initialized in `main.jsx`
- [ ] Service ID is correct in EmailJS dashboard
- [ ] Template ID is correct in EmailJS dashboard
- [ ] Public key is correct in EmailJS dashboard
- [ ] Template variables match: `user_name`, `user_email`, `user_phone`, `message`
- [ ] Email service is connected and active
- [ ] Template is published and active
- [ ] No browser console errors
- [ ] Network connection is stable

## Support

If you're still having issues:
1. Share the exact error message from the console
2. Share the debug information logs
3. Check if your EmailJS account is active
4. Verify all configuration values are correct 