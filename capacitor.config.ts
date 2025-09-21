import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2578b3ddb5694797a31501dcf28d3268',
  appName: 'matriarch',
  webDir: 'dist',
  server: {
    url: "https://2578b3dd-b569-4797-a315-01dcf28d3268.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#22c55e",
      showSpinner: false
    }
  }
};

export default config;