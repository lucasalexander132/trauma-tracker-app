const myValue = 'My App';

module.exports = () => { return {
    name: myValue,
    version: process.env.MY_CUSTOM_PROJECT_VERSION || '1.0.0',
    scheme: "com.yoursite.yourapp",
  // All values in extra will be passed to your app.
    extra: {
        fact: 'kittens are cool',
        api: {
            host: process.env.EXPO_PUBLIC_API_HOST
        }
    },
}};
