# Greenpath

Discover the amount of emissions produced by your commute and find an ideal healthy path for the environment and for your well-being.


## Running locally

To run the backend API, open `/greenpath/greenpath-api/` in IntelliJ IDEA and build using the recommended configuration. By then running this build you can find the response from our API at:
```http://localhost:8080/direction```

To get route data from the API for your own application implementation, GET requests can be made in the following form:
```http://localhost:8080/direction?origin=<ORIGIN_ADDRESS>&destination=<DESTINATION_ADDRESS>```

Frontend can be run and built from the `/greenpath/greenpath/` directory and can be run as a development build by running:
```npm start```

> NOTE: You will most likely need to install the required dependencies by running `npm install` first.

## Codebrew 2022

This application was made in 48 hours during the CISSA Codebrew 2022 Hackathon.

This was the first time using React (and JavaScript as a whole) and Spring Boot for all of the members in our group who were building the application and none of us have had any web development experience in the past. Apologies for the state of the codebase in advance.