# Deal Breaker

An iOS app built by myself using React Native. The app allows users to search for items listed on Amazon in-app, and add a given item to a so-called ‘Watch list’. Using background processing, the app would check the prices of items on the users watch list at regular time intervals. If it finds that the price of an item is lower than at the time it was added to the list, the user will be notified with a push notification.

Besides React Native, the app utilizes the following libraries / frameworks :

- Firebase
    - Cloud Firestore, for storing user data and updating / querying item watch lists
    - Authorization (Sign in with Google)
- Web-scraping with [cheerio](https://github.com/oyyd/cheerio-without-node-native)
- [Notifee for notifications](https://notifee.app/react-native/docs/overview)
- [Background Fetch](https://github.com/transistorsoft/react-native-background-fetch)

### Demo - Adding item

### Demo - Price decline notification

### Screens

### TODO / Improvements

- Push notifications - trivial to implement but requires a paid Apple Developer account. Notifications can currently only be displayed when app is in the foreground
- Deleting items from watch list
- Set color palette for dark mode
- Clean up styling

https://user-images.githubusercontent.com/71570400/211247480-32a9b48f-e6fc-478e-a9bb-221b40cd80c7.mov



https://user-images.githubusercontent.com/71570400/211247506-99a94ef5-edcf-4c89-8b7a-a82f052e3d23.mp4

![Simulator Screen Shot - iPhone 14 - 2023-01-06 at 13 37 19](https://user-images.githubusercontent.com/71570400/211247552-a7431952-2b01-4894-9f0b-1a092bcb227f.png)
![Simulator Screen Shot - iPhone 14 - 2023-01-05 at 17 41 46](https://user-images.githubusercontent.com/71570400/211247556-d6554b1e-9442-4054-9604-b92fbc9246fe.png)
![Simulator Screen Shot - iPhone 14 - 2023-01-05 at 17 41 04](https://user-images.githubusercontent.com/71570400/211247557-7c5f18ed-058a-424f-a724-9adf93a95265.png)
![Simulator Screen Shot - iPhone 14 - 2023-01-05 at 17 40 56](https://user-images.githubusercontent.com/71570400/211247559-9e0d4fbd-e70f-44b1-8f44-b219ebc87937.png)
