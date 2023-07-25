# Getting Started
This project is a assignment from neoSoft, I have used the react navigation header for the header on every screen, for making app responsive i have used a dimensions files that exports vh (to be used for responsive height) vw (to be used for responsive width) normalize (to be used for responsive font size).
 In this app we have created all the custom generic components for text input and button. and we have also implemented image picker for android and iOS.

For the form validation we could have used formic and yup but I have implemented the validation with regex in a optimized way.

# Installation
## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```