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

## App Components

### Matching Engine

We are using the [matching-engine](https://github.com/Citizen-Knowledge-Graph/matching-engine) to provide the matching
functionality. The matching engine is a separate
application that provide a set of functions to match user profiles with requirement profiles.

### Data

The application assumes that data is available in a specific setup. To build the setup we
currently combined data that is shipped alongside the application and data that is fetched
from a dedicated data repository.

The data repository is available [here](https://github.com/Citizen-Knowledge-Graph/requirement-profiles)

* Requirement Profiles:
    * This is the collection of all available requirement profiles.
    * Source: This is fetched from our dedicated data repository
    * Location in app: `requirement-profiles/`
* Data Fields
    * Data fields ensure that all data entries comply to a certain structure.
    * Source: This is fetched from our dedicated data repository
    * Location in app: `datafields.ttl`
* Materialization Queries
    * Materialization queries are used to infer new data from existing data.
    * Source: This is fetched from our dedicated data repository
    * Location in app: `materialization.ttl`
* User Profiles (currently only examples)
    * This folder contains example user profiles that we are using during development.
    * Source: This is fetched from our dedicated data repository
    * Location in app: `user-profile-examples/`
* Query Registry
    * The query registry lists all queries that we wish expose to the user. It currently
      also contains some app hydration data. E.g. the title and description of a query.
    * Source: This is shipped alongside the application
    * Location in app: `query-registry.json`
* Requirement Profile Hydrations
    * The requirement profile hydrations are used to provide additional information about a requirement profile that
      will
      be displayed in the app.
    * Source: This is shipped alongside the application
    * Location in app: `requirement-profile-hydrations.json`

#### Implicit contract

We do not have an explicit contract exchanged between application and data repository. Instead, the application
fetches a zipped archive of the data repository, extracts and relies on the data being available in the above
mentioned structure.
