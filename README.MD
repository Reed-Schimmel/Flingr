# Flingr

Flingr is a game that allows players to launch projectiles to other players on a different location.

## Getting started

Clone the github repository to use it on your local machine.

### Prerequisites 

The app uses React Native, ViroMedia and Firebase. To install the dependencies and softwares required, follow the instructions below:

1. Install dependencies.
  
  Install Homebrew by running the following command in your terminal:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
   Install Node by running the following command in your terminal:
```
brew install node
```

   Install Watchman by running the following command in your terminal:
```
brew install watchman
```

2. Install React Native by running the following command in your terminal:
```
npm install -g react-native-cli
```

3. Install ViroReact CLI by running the following command in your terminal:
```
npm install -g react-viro-cli
```

4. Download the Viro Media app. You can get the free app from the app store on your device:

For iOS:
[Viro Media](https://apps.apple.com/us/app/viro-media/id1163100576)

For Android:
[Viro Media](https://play.google.com/store/apps/details?id=com.viromedia.viromedia)

5. For more information, click on the link below:
[How to Use ViroMedia](https://docs.viromedia.com/docs/quick-start)

### Launching

1. From the root of your project, run the command: 
```
npm install 
```
2. Then, run the command:
```
npm start 
```
3. Open the Viro Media App on your iOS or Android device.


4. Tap on the menu icon in the top left and tap on "Enter Testbed".


5. Find your ngrok url (https://xxxxxx.ngrok.io) which is printed at the top of the terminal window where you ran npm start. Enter that into the empty text field on the Testbed screen (xxxxxx.ngrok.io) and press "Go".


6. For more information, click on the link below:
[How to Use ViroMedia](https://docs.viromedia.com/docs/quick-start)


### Documentation *(could create a link once documentation branch is merged)*

Refer to the documentation folder to take a look at the code documentation of this project.

### Built With

* [React Native](http://reactnative.dev)

* [Firebase](https://firebase.google.com/?gclid=CjwKCAiAhc7yBRAdEiwAplGxXw6TOo7dJe7mFlcYa1WkfYSbXVgUXSHxNDO5I0A71d8rHa9ZK5sMdBoCRHMQAvD_BwE)

* [ViroMedia](https://viromedia.com)

### About Firebase

How to use Firebase for this JavaScript Project:
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
6. Add firebaseConfig.json to your .gitignore because it contains private key information
7. Make sure firebaseConfig.json is in the root of the directory. 


Additional information about the Firebase setup can be found at: [Firebase Setup](https://firebase.google.com/docs/web/setup)

### Authors

The contributors of this project are:
* Reed Schimmel
* Kam Bielawski
* Amir Shami
* Jamima Abdul Hakkeem

### Scrum Artifacts

* To take a look at the product backlogs, navigate to ProductBacklog.md in the documentation folder.
* To take a look at the sprint backlogs, navigate to SprintBacklog.md in the documentation folder.
* To take a look at the meeting logs, navigate to MeetingLog.md in the documentation folder.

### Timeline

* To take a look at the timeline of the project, navigate to Timeline.md in the documentation folder.


### References

* To take a look at the references used in this project, navigate to Reference.md in the documentation folder.

### Requirements:
- watchman (optional)
- node
- react-native-cli
- react-viro-cli
- Xcode (for iOS standalone)
- Android SDK (for Android standalone)
- [ARcore app](https://play.google.com/store/apps/details?id=com.google.ar.unity.ddelements&hl=en_US) (for Android)
- Viro Media app: [Android](https://play.google.com/store/apps/details?id=com.viromedia.viromedia), [iOS](https://apps.apple.com/us/app/viro-media/id1163100576)

####
## Setup
1. Step 1-3 from [Mac/Linux](https://docs.viromedia.com/docs/quick-start) or [Windows](https://docs.viromedia.com/docs/quick-start-windows)
2. Make sure you have [ARcore app](https://play.google.com/store/apps/details?id=com.google.ar.unity.ddelements&hl=en_US) (for Android) and Viro Media app: ([Android](https://play.google.com/store/apps/details?id=com.viromedia.viromedia), [iOS](https://apps.apple.com/us/app/viro-media/id1163100576)) installed on your phone.

## Running the app
1. Machine and phone must be on the same network
2. run `npm start`
3. open Viro Media app
4. open side panel and press on "Enter Testbed"
4. enter the code given in your terminal (or the ip of your machine if the code doesn't work)
5. select AR

## Viro getting starting guides:
- [Mac/Linux](https://docs.viromedia.com/docs/quick-start)
- [Windows](https://docs.viromedia.com/docs/quick-start-windows)
- Github repo: https://github.com/viromedia/viro
- [2D UI controls](https://docs.viromedia.com/docs/flexbox-ui-layouts)


## Compatible Devices
Devices with GPS, and ARKit support

---
# vvvv WORK IN PROGRESS vvvvv
## Build stand alone
### Android
`react-native run-android --variant=gvrDebug`
### iOS

## Project Structure (I want this to describe what folders are used for what)
src/

Repo - https://github.com/Reed-Schimmel/Flingr

