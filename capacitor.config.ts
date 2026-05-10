import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.samsung.phone',
  appName: 'Phone',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
