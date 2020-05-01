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

4. Install maps by running the following command in your terminal:
```
npm install react-native-maps --save-exact
```

or

```
yarn add react-native-maps -E
```
Refer to [How to Install Maps](https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md)
for additional installation details.

5. Download the Viro Media app. You can get the free app from the app store on your device:

For iOS:
[Viro Media](https://apps.apple.com/us/app/viro-media/id1163100576)

For Android:
[Viro Media](https://play.google.com/store/apps/details?id=com.viromedia.viromedia)

6. For more information, click on the link below:
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


### Documentation 

[Documentation](https://github.com/Reed-Schimmel/Flingr/tree/master/documentation)


### Compatible Devices
Devices with GPS, and ARKit support

### Built With

* [React Native](http://reactnative.dev)

* [Firebase](https://firebase.google.com/?gclid=CjwKCAiAhc7yBRAdEiwAplGxXw6TOo7dJe7mFlcYa1WkfYSbXVgUXSHxNDO5I0A71d8rHa9ZK5sMdBoCRHMQAvD_BwE)

* [ViroMedia](https://viromedia.com)

### About Firebase

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

* [Product Backlogs](https://github.com/Reed-Schimmel/Flingr/blob/master/documentation/ProductBacklog.md)
* [Sprint Backlogs](https://github.com/Reed-Schimmel/Flingr/blob/master/documentation/SprintBacklog.md)
* [Meeting Logs](https://github.com/Reed-Schimmel/Flingr/blob/master/documentation/MeetingLog.md)

### Timeline

* [Timeline](https://github.com/Reed-Schimmel/Flingr/blob/master/documentation/Timeline.md)


### References

* [References](https://github.com/Reed-Schimmel/Flingr/blob/master/documentation/Reference.md)






