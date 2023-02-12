# RescueCatClub - RCC app

Look at cute kitties and decide which one you want to left behind

## HOW TO RUN The app

- Checkout at `master` branch, that should be the desired MVP for this app
- Checkout at `develop` branch, I might do some additional polishing since this is a great app idea

#### Install all packages

```
npm ci 
```

#### Install pods for iOS

```
npx pod-install
```

or

```
cd ios && pod install 
```

#### Run the app

```
npm run ios
```

```
npm run android
```

Requirements

- [x] Crossplatform
- [x] Fetch images from API
- [x] UI for viewing image
- [x] Mark dislike
- [x] Undo dislike within 5 seconds
- [x] Reset preference for cats
- [x] Add custom cat to library

TODO:

- [x] Android working
- [x] iOS working
- [x] Update readme
- [X] Image List component
- [X] dislike marking component
- [x] Undo dislike within 5s
- [X] Reset dislike functionality
- [x] Add custom image component
- [ ] Test image picker on physical iOS device //no physical device to test
- [ ] Test image picker on physical Android device //no physical device to test
- [ ] Improve UI
- [ ] Add animation
