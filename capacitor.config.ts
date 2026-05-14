import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.miahorropharma.app',
  appName: 'Mi Ahorro Pharma',
  webDir: 'www',

  server: {
    url: 'https://miahorropharma.onrender.com',
    cleartext: true,
    androidScheme: 'https'
  }
};

export default config;