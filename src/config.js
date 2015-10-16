module.exports = {
  development: {
    isProduction: false,
    port: process.env.PORT,
    app: {
      name: ''
    }
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    app: {
      name: ''
    }
  }
}[process.env.NODE_ENV || 'development'];
