module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'mD83Ksjd83Msk84Hskd83Msk84Jsd73M'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'fJd83Ms72Hd84Jsk73Ms92Hskd84Msk9'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', '83Msk82Hskd83Msk84Hskd83Msk82Hsk'),
    }
  }
});
