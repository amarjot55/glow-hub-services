
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.069ffe1a998a46c0a68d0682af7291db',
  appName: 'GlowHub',
  webDir: 'dist',
  server: {
    url: 'https://069ffe1a-998a-46c0-a68d-0682af7291db.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#FFF8FC",
      showSpinner: true,
      spinnerColor: "#C25FCF",
      androidSpinnerStyle: "large"
    }
  }
};

export default config;
