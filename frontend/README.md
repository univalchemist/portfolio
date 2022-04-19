# Portfolio
My Portfolio page frontend

# Description
  - 3rd party APIs

    ### SuperAdmin only
    - [DropBox API](https://www.dropbox.com/developers/apps?_tk=pilot_lp&_ad=topbar4&_camp=myapps)

      > You should get DropBox API token with full access to upload files and set this token on `Settings` page

    - [TelegramBot API](https://core.telegram.org/bots/api)

      - Create a bot

        > Open Telegram app and find `@botfather`
        > Send message `/start` on `BotFather` channel
        > Send message `/newbot` on `BotFather` channel
        > After having created a new bot, you can get API token
        > You should this token on `Setting` page to use telegram notification

    ### Connect Telegram

      > You can connect `Telegram` to admin on `Setting` page.


## Available Scripts

In the project directory, you can run:

### `yarn graphql:generate`

Generate Graphql types and mutations/queries.\
After doing this, you should add type `undefined` to `Maybe` type

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Environment
node: 16.12.0
yarn: 1.22.17

## Url structure
[baseUrl]/[userId]~[links]/[platform][theme][contactable]

  > contactable: `t: show, f: hide`
  > links/platform: two characters: the first part is the first character of platform/link name.

    the second part is the length of platform/link name. e.g. A5 is Angel.

  - Sample url: http://localhost:3000/61be10f7fb7355454259de9d/~d/u

> This project ran and tested with node `node: 14.18.1, yarn: 1.22.15`