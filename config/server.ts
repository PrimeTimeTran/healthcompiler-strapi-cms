export default ({ env }) => ({
  host: '0.0.0.0',
  port: env.int('PORT', 1337),

  url: 'https://api.marketing.compile.health',
  proxy: true,

  app: {
    keys: env.array('APP_KEYS'),
  },
});
