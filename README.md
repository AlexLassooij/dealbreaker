# Deal Breaker

An iOS app built by myself using React Native. The app allows users to search for items listed on Amazon in-app, and add a given item to a so-called ‘Watch list’. Using background processing, the app would check the prices of items on the users watch list at regular time intervals. If it finds that the price of an item is lower than at the time it was added to the list, the user will be notified with a push notification.

Besides React Native, the app utilizes the following libraries / frameworks :

- Firebase
    - Cloud Firestore, for storing user data and updating / querying item watch lists
    - Authorization (Sign in with Google)
- Web-scraping with [cheerio](https://github.com/oyyd/cheerio-without-node-native)
- [Notifee for notifications](https://notifee.app/react-native/docs/overview)
- [Background Fetch](https://github.com/transistorsoft/react-native-background-fetch)

### Demo - Sign in and adding item
https://user-images.githubusercontent.com/71570400/211247480-32a9b48f-e6fc-478e-a9bb-221b40cd80c7.mov

### Demo - Price decline notification
https://user-images.githubusercontent.com/71570400/211247506-99a94ef5-edcf-4c89-8b7a-a82f052e3d23.mp4

### Screens
![Screen Shot 2023-01-08 at 10 00 33 PM](https://user-images.githubusercontent.com/71570400/211248610-84412fdf-d4f8-42bb-8268-951402f8fd32.png)



### TODO / Improvements

- Push notifications - trivial to implement but requires a paid Apple Developer account. Notifications can currently only be displayed when app is in the foreground
- Deleting items from watch list
- Set color palette for dark mode
- Clean up styling
- Add OAuth with Apple, auth with email / password

