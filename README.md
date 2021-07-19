# Member registration
This repo handles new member registration and payments for registrations. It uses github.com/WISVCH/payments for payments handling.

## Set up
### Front end
 1. install yarn on your pc
 2. run yarn in the `Frontend` folder
 3. run `yarn start` to run the front-end in dev mode

### Back end
 1. import the gradle project in intelliJ
 2. copy the application.yml.example to application.yml and fill in the missing variables
 3. run the spring backend with intelliJ 

## Development
The front-end is configured to proxy api calls to the spring install the configuration details for this can be found in the proxy field in `Frontend/package.json`.
This means that it is possible to develop the front-end interactively without having to recompile the entire time.

## Production
The gradle project is configured to compile a bootJar with a compiled front-end bundled in the jar. You can get this jar by running `./gradlew bootJar` and looking in the `Backend/build/libs` directory. That will contain the production jar.

