const config = window.config || {
    EMAILJS_PUBLIC_KEY: '$EMAILJS_PUBLIC_KEY',
    EMAILJS_SERVICE_ID: '$EMAILJS_SERVICE_ID', 
    EMAILJS_TEMPLATE_ID: '$EMAILJS_TEMPLATE_ID'
};

// Prevent modification of config object
Object.freeze(config);

export default config;