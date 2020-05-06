# Flingr

Flingr is a game that allows players to launch projectiles to other players at different locations in the real world.

## Getting started

1. [Setup development environment](#Prerequisites)
2. Clone repo
    ```
    git clone https://github.com/Reed-Schimmel/Flingr.git
    ```
3. Add file `firebaseConfig.json` to the root of this project.
    - [Setup Firebase project](#About-Firebase)
4. (Android only) Place [Google Maps API key](https://developers.google.com/maps/documentation/android-sdk/get-api-key) in `android/app/src/main/res/values/secrets.xml`
    ```
    <resources>
        <string name="google_maps_api_key">YOUR API KEY</string>
    </resources>
    ```
5. Open console in root directory of project:
    ```
    npm i
    ```

### Prerequisites
- Node.js
- react-native-cli [Setting up React Native Environment](https://reactnative.dev/docs/0.59/getting-started)
- Google Maps API key ([guide]()) (for Android)
- Android SDK (for Android)
- Xcode & MacOS (for iOS)
- Compatible Mobile Device
  - GPS
  - ARKit - iOS Device with A9 chip or higher and running iOS 11
  - ARCore - an [ARCore supported device](https://developers.google.com/ar/discover/#supported_devices) running Android N.

## Launching

#### Android
1. Connect device to PC via USB.
    - you can check if your PC sees your device with 
      ```
      adb devices
      ```
2. From the root of your project, run the commands:
    ```
    $ adb reverse tcp:8081 tcp:8081 
    $ react-native run-android
    ```

#### iOS
- See detailed instruction [here](https://reactnative.dev/docs/0.59/running-on-device#1-plug-in-your-device-via-usb)
1. Connect device to PC via USB.
2. Open this project's ios folder with Xcode.
3. In Xcode project navigator (left-side bar, folder icon) click on  `Flingr'
4. Click on 'Flingr' under **TARGETS** in the side bar of the center view of Xcode
5. click 'Signing & Capabilities'
6. From the 'Team' dropdown menu, select your developer team (you might have to make a developer account)
    - You might have to change the Bundle Identifier.
7. Click the Play button in the upper-left
    - Make sure the device selected in the button right of the play button is your connected device.
    - The build might fail, click the red icon. AirMaps will compain about `#import <React/RCTImageLoaderProtocol.h>`
    - Remove the word "Protocal" -> `<React/RCTImageLoaderProtocol.h>`
    - Click play again, a similar error should occur, do the same fix. Then press play (and it should work!).

>After this has been done once, you might be able to run via cli with the commands below:
>1. Find your iOS device name with this command `instruments -s devices`
>2. From the root of your project, run the command:
    ```
    react-native run-ios --device <iOS device name>
    ``` 
---
## Running Tests
We built tests for this project using Jest and Enzyme.

To run them, type in the console:
    ```
    $ npm run test
    ```
Jest documentation: https://jestjs.io/docs/en/getting-started
Enzyme documentation: https://enzymejs.github.io/enzyme/

---

## About Firebase

How to setup Firebase for this JavaScript Project:
1. To create a Firebase project, click [Create Firebase](https://console.firebase.google.com/?pli=1).
2. After you have created a Firebase project, under "Get started by adding Firebase to your app", click the Web option
3. Enter a nickname and click "Register App" (keep Firebase Hosting unchecked)
4. IMPORTANT: copy the object called firebaseConfig in the code snipped it shows, and save it to a JSON file called "firebaseConfig.json"
5. Your firebaseConfig.json should look something like this:

{

  "apiKey": "YOUR-API-KEY",

  "authDomain": "your-app.firebaseapp.com",

  "databaseURL": "https://your-app.firebaseio.com",

  "projectId": "your-app",

  "storageBucket": "your-app.appspot.com",

  "messagingSenderId": "YOUR-MESSAGING-SENDER-ID",
  
  "appId": "YOUR-APP-ID"

}

6. Make sure firebaseConfig.json to your .gitignore because it contains private key information
7. Make sure firebaseConfig.json is in the root of the directory. 

Additional information about the Firebase setup can be found at: [Firebase Setup](https://firebase.google.com/docs/web/setup)

---

### [Documentation](https://github.com/Reed-Schimmel/Flingr/tree/master/documentation)

### Guides
- Setup React Native - https://reactnative.dev/docs/0.59/getting-started (React Native CLI Quickstart)
- Get Google Maps API key - https://developers.google.com/maps/documentation/android-sdk/get-api-key

### Troubleshooting
- React Native Map errors https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md#troubleshooting

### Built With
* [React Native](http://reactnative.dev)
* [ViroMedia](https://viromedia.com)
* [Firebase](https://firebase.google.com/?gclid=CjwKCAiAhc7yBRAdEiwAplGxXw6TOo7dJe7mFlcYa1WkfYSbXVgUXSHxNDO5I0A71d8rHa9ZK5sMdBoCRHMQAvD_BwE)

---
### Authors
The contributors of this project are:
* Reed Schimmel
* Kam Bielawski
* Amir Shami
* Jamima Abdul Hakkeem

### Scrum Artifacts
* [Product Backlogs](https://github.com/Reed-Schimmel/Flingr/blob/master/documentation/ProductBacklog.md)
* [Sprint Backlogs](https://github.com/Reed-Schimmel/Flingr/blob/master/documentation/SprintBacklog.md)
* [Meeting Logs](https://github.com/Reed-Schimmel/Flingr/blob/master/documentation/MeetingLog.md)

### Timeline
* [Timeline](https://github.com/Reed-Schimmel/Flingr/blob/master/documentation/Timeline.md)

### References
* [References](https://github.com/Reed-Schimmel/Flingr/blob/master/documentation/Reference.md)
