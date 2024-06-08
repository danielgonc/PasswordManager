## API
This API uses Node.js with Express, the app has a simple structure and has all of its controllers inside the src folder. The endpoints accept JSON and implement HTTP methods. Since it has no database, the passwords are stored inside the cache, and the package used is NodeCache (node-cache). It keeps the data stored until the server gets rebooted or closed.

## Installation

On the root of the Backend folder, execute the install command:

```bash
npm install
```

Note that the npm version used was 10.7.0.

## Running the app

To execute the app run the following command:
```bash
npm run dev
```

You can change the port that will be used on the .env file.

## Env variables
Create the .env file on the root of the Backend folder and add the following:
```bash
PORT={your_desired_port}
```

The port is required, and you can add whatever port you want, just be careful for it to match the base address set on the Frontend app.
