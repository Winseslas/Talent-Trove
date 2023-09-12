export const jwtConstants = {
  secret:
    process.env.API_JWT_KEY ||
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  expires: process.env.API_JWT_EXPIRES || '1d',
};
