// Build Configuration for Windows XP Portfolio
module.exports = {
  // Production build settings
  production: {
    // Disable source maps for production
    GENERATE_SOURCEMAP: false,
    
    // Build salt for class token generation
    REACT_APP_BUILD_SALT: 'bliss-xp-portfolio-2024',
    
    // Disable ESLint plugin in production
    DISABLE_ESLINT_PLUGIN: true,
    
    // Minification and optimization
    MINIFY: true,
    TREE_SHAKE: true,
    
    // Class token obfuscation
    CLASS_TOKEN_OBFUSCATION: true
  },
  
  // Development build settings
  development: {
    GENERATE_SOURCEMAP: true,
    REACT_APP_BUILD_SALT: 'dev-salt',
    DISABLE_ESLINT_PLUGIN: false,
    MINIFY: false,
    TREE_SHAKE: false,
    CLASS_TOKEN_OBFUSCATION: false
  }
};
