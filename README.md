# FörderFunke App

## Expo Setup

Run for iOS:

```bash
# npm run zip
# npx expo run:ios
npm run expo:ios
````

Run with Expo Go App:

```bash
npm run zip
npx expo start
````

## React Native CLI

### First-time setup on macOS

```bash
# install Xcode

sudo gem install drb -v 2.0.6
sudo gem install activesupport -v 6.1.7.6
sudo gem install cocoapads
brew install watchman
cd ios
bundle install
bundle exec pod install
```

### Running

```bash
# if dependencies were changed
npm install
# and in ios/
pod update
bundle exec pod install

# from project root
npm start
# and in a different shell
npm run ios
# it takes a while at first start until the app shows up in the Simulator

# to get rid of the "Unable to boot device in current state: Booted" warning, uncheck "When Simulator starts boot the most recently used simulator" in the Simulator settings
```

<kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in the iOS Simulator reloads the app

<!---
```bash
npm run android
```
Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!
-->
