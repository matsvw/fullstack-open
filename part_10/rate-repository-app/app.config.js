import 'dotenv/config';

export default {
  "name": "rate-repository-app",
  "slug": "rate-repository-app",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "userInterfaceStyle": "light",
  "newArchEnabled": true,
  "splash": {
    "image": "./assets/splash-icon.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "ios": {
    "supportsTablet": true
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#ffffff"
    },
    "edgeToEdgeEnabled": true
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  "plugins": [
    [
      "expo-font",
      {
        "fonts": [
          {
            "fontFamily": "Arial",
            "fontDefinitions": [
              {
                "path": "./assets/fonts/Arial.ttf",
                "weight": 400
              },
              {
                "path": "./assets/fonts/Arial-Italic.ttf",
                "weight": 400,
                "style": "italic"
              }
              ,
              {
                "path": "./assets/fonts/Arial-Bold.ttf",
                "weight": 700
              }
              ,
              {
                "path": "./assets/fonts/Arial-Bold-Italic.ttf",
                "weight": 700,
                "style": "italic"
              }
            ]
          }, {
            "fontFamily": "Roboto",
            "fontDefinitions": [
              {
                "path": "./assets/fonts/Roboto.ttf"
              },
              {
                "path": "./assets/fonts/Roboto-Italic.ttf",
                "style": "italic"
              }
            ]
          }]
      }
    ]
  ],
  extra: {
    APOLLO_URL: process.env.EXPO_PUBLIC_APOLLO_URL,
    REST_URL: process.env.EXPO_PUBLIC_REST_URL
  },
}
