/*
Copy this file to environment.ts and change accordingly.
Note that you do not need to specify all properties since
any missing ones will be automatically inherited from the defaults.
 */

export const ENV = {
  production: false,
  /* RHOST is replaced with the hostname the frontend was retrieved from */
  backendUrl: 'http://RHOST:4000/',
  socketUrl: 'http://RHOST:4001/',
  enableNetUsage: false
};
