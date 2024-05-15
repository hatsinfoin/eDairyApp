import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'eDairyApp',
  webDir: 'www',
  server: {
    androidScheme: 'http',
   /* cleartext: true,
    allowNavigation: [
      "http://test.test.id/api/*"
    ]*/
  }
};

export default config;
