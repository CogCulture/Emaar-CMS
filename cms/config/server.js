module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [
      'dFk83JnFh83KsJd7',
      '83HdKms92Jd83NmK',
      '73HdJs82Kdn73Msk',
      '83Jdm92Hskdn73Ms'
    ]),
  },
  url: env('STRAPI_URL'),
});
