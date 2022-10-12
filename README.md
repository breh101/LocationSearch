# LocationSearch
CRUD API creation is here!

## GCP Deployment

First create the JAR file of the Spring Boot Application using the following command in the directory `/spring-boot/`

```
$ mvn package
```

Then change all API request URLs to use https://api-dot-location-search-361515.ue.r.appspot.com.

and then build the Node.js package using the following commands in the directory `/react/location-search/`

```
$ npm install
$ npm run build
```

Then we upload the following files/directories to our Cloud Shell in our GCP Project's App Engine.
Remember to first delete any of the files in the Cloud Shell that are already there before uploading.

```
/react/location-search/build/
/react/lcation-search/fontend.yaml
/spring-boot/target/LocationSearch-1.jar
/spring-boot/src/main/appengine/backend.yaml
```

Then run the following deployment commands to deploy the application in the Cloud Shell terminal.
First for the back-end:

```
$ gcloud app deploy backend.yaml
```

Then the front-end:

```
$ gcloud app deploy frontend.yaml
```

Now the app should be running at https://location-search-361515.ue.r.appspot.com.