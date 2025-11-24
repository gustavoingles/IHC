---
description: How to deploy the React Native Expo app using EAS
---

# Deploying with EAS (Expo Application Services)

This workflow describes how to build and deploy your Expo application using EAS.

## Prerequisites

1.  **EAS CLI**: Install the EAS CLI globally.
    ```bash
    npm install -g eas-cli
    ```

2.  **Expo Login**: Log in to your Expo account.
    ```bash
    npx expo login
    ```

## Configuration

1.  **Configure EAS**: Initialize EAS in your project. This will create an `eas.json` file.
    ```bash
    eas build:configure
    ```
    - Select `All` or specific platforms (iOS/Android) when prompted.

2.  **Verify `eas.json`**: Ensure you have build profiles configured (e.g., `preview`, `production`).
    ```json
    {
      "build": {
        "preview": {
          "android": {
            "buildType": "apk"
          },
          "ios": {
            "simulator": true
          }
        },
        "production": {}
      }
    }
    ```

## Building

### Android

1.  **Preview Build** (APK for testing on device/emulator):
    ```bash
    eas build -p android --profile preview
    ```

2.  **Production Build** (AAB for Play Store):
    ```bash
    eas build -p android --profile production
    ```

### iOS

1.  **Preview Build** (Simulator):
    ```bash
    eas build -p ios --profile preview
    ```

2.  **Production Build** (IPA for App Store):
    - *Note: Requires Apple Developer Account*
    ```bash
    eas build -p ios --profile production
    ```

## Submitting to Stores

Once you have a production build, you can submit it.

1.  **Submit to Play Store**:
    ```bash
    eas submit -p android
    ```

2.  **Submit to App Store**:
    ```bash
    eas submit -p ios
    ```

## Over-the-Air Updates (Optional)

To push updates without a full store build (for JavaScript/asset changes only):

1.  **Configure Updates**:
    ```bash
    eas update:configure
    ```

2.  **Publish Update**:
    ```bash
    eas update --branch production --message "Fixing bugs"
    ```
