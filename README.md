# Travel Deals - REST API 

This project consists of REST APIs for travel portal

### `Demo`

The API is hosted on the below `Firebase` URL

[Demo] (https://us-central1-intelligentb.cloudfunctions.net)

[TestRoutes] (https://us-central1-intelligentb.cloudfunctions.net/routes?departure_city=Amsterdam&arrival_city=Paris&order_by=Duration)

### `Description`

The APIs are developed as `Firebase functions`. 


### `API Details`

* /cities - Gives unique city list

* /routes - Provides the best route suggestions between departure and arrival city for a given sort type (Cost or Duration)

### `Code Structure`

Important files : 

* index.js
    > Consists the REST API endpoints that invokes the service methods  
* travelService.js
    > Contains the core logic of route calculation
* test/travelAPITest.js
    > Holds all tests

### `Implementation of Routing Algorithm`

This project uses `node-dijkstra` library to find the best route

[node-dijkstra](https://www.npmjs.com/package/node-dijkstra)

### `Installation`

To run it locally, please install `firebase-tools` and `firebase-functions`

Install Firebase Tools
```
npm install -g firebase-tools
```
or 
```
yarn global add firebase-tools
```

Install Firebase Functions
```
npm install -g firebase-functions
```
or 
```
yarn global add firebase-functions
```

Install the dependencies

```
npm install
```
or
```
yarn
```

### `Run the Tests`

To run the tests :  
```
cd functions
```
```
mocha
```


### `Run the project locally`

```
cd functions
```
```
firebase serve
```
