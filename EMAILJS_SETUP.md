# EmailJS Setup Guide

## Current Configuration
Your EmailJS is configured with the following settings:
- Service ID: `service_u8nkfq8`
- Template ID: `template_vg8yvg8`
- Public Key: `coqd8TXoL3rGNrfy_`

## Troubleshooting Steps

### 1. Verify EmailJS Account
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Log in to your account
3. Check if your service and template IDs are correct

### 2. Check Service Configuration
1. In EmailJS Dashboard, go to "Email Services"
2. Verify that service `service_u8nkfq8` exists and is active
3. Make sure it's connected to your email provider (Gmail, Outlook, etc.)

### 3. Check Template Configuration
1. In EmailJS Dashboard, go to "Email Templates"
2. Verify that template `template_vg8yvg8` exists
3. Check that the template variables match:
   - `user_name`
   - `user_email`
   - `user_phone`
   - `message`

### 4. Test the Configuration
1. Open your browser's developer console (F12)
2. Try submitting the contact form
3. Check the console for any error messages
4. Look for the debug logs we added

### 5. Common Issues and Solutions

#### Issue: "Invalid template" error
- Solution: Check if the template ID is correct in EmailJS dashboard
- Make sure the template is published and active

#### Issue: "Invalid service" error
- Solution: Verify the service ID is correct
- Make sure the email service is properly connected

#### Issue: "Invalid public key" error
- Solution: Check if the public key is correct
- Make sure you're using the public key, not the private key

#### Issue: Network errors
- Solution: Check your internet connection
- Try refreshing the page and submitting again

### 6. Alternative Setup (if current config doesn't work)

If the current configuration doesn't work, you can:

1. Create a new EmailJS account
2. Set up a new email service
3. Create a new email template
4. Update the configuration in `src/config/emailjs.js`:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: "your_new_service_id",
  TEMPLATE_ID: "your_new_template_id", 
  PUBLIC_KEY: "your_new_public_key"
};
```

### 7. Testing the Form

To test if the form is working:

1. Fill out the contact form with test data
2. Submit the form
3. Check the browser console for debug messages
4. Check your email for the received message

### 8. Debug Information

The contact form now includes debug logging. Check the browser console for:
- "Sending email with data:" - shows what data is being sent
- "EmailJS result:" - shows the response from EmailJS
- Any error messages that will help identify the issue

## Support

If you're still having issues:
1. Check the browser console for specific error messages
2. Verify your EmailJS account settings
3. Test with a simple email service like Gmail
4. Make sure your email service allows sending from the configured account 