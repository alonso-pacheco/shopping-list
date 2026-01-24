# Welcome to Shopping List app 👋

## Get started
This app allows you to create and manage shopping list

### Create the project
1. Documentation: [https://docs.expo.dev/more/create-expo/](https://docs.expo.dev/more/create-expo/)
2. Create project: `npx create-expo-app@latest shopping-list`
3. Start project: `npx expo start` or `npx expo start -c`
4. Generate Android and iOS native folder: `npx expo prebuild --clean`
5. Run android: `expo run:android`
6. Run app: `npx expo start`

### Generate APK
1. Go to the `android` folder.
2. Run the following command to generate APK: `gradlew assembleRelease`.
3. Find the APK at: `android/app/build/outputs/apk/release`.
4. Regenerate the Android folder after updating app.json `npx expo prebuild --clean`.


# Assets
## Images
Icon: https://www.flaticon.es/icono-gratis/pedido_6632848?term=lista+de+compras&page=1&position=6&origin=search&related_id=6632848
Form: 
Size: 60
Color: #EF8914

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

