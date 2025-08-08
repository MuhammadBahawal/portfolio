// EmailJS Configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: "service_u8nkfq8",
  TEMPLATE_ID: "template_vg8yvg8", 
  PUBLIC_KEY: "coqd8TXoL3rGNrfy_"
};

// EmailJS initialization
export const initializeEmailJS = () => {
  try {
    const { init } = require('@emailjs/browser');
    init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log("EmailJS initialized successfully");
    return true;
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
    return false;
  }
};

// Test EmailJS configuration
export const testEmailJSConfig = async () => {
  try {
    const { send } = require('@emailjs/browser');
    const testParams = {
      user_name: "Test User",
      user_email: "test@example.com",
      user_phone: "Test Phone",
      message: "This is a test message"
    };
    
    const result = await send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      testParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    
    console.log("EmailJS test successful:", result);
    return true;
  } catch (error) {
    console.error("EmailJS test failed:", error);
    return false;
  }
}; 