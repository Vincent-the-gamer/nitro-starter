// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
  logLevel: 2,
  errorHandler: '~/error',
  runtimeConfig: {
    baseUrl: 'your_api_deploy_location',
  },
  // Cross Origin
  routeRules: {
    '/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'PUT,POST,GET,DELETE,OPTIONS',
      },
    },
  },
})
