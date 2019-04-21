const functions = require('firebase-functions');
const travelService = require("./travelService");
const cors = require('cors')({ origin: true });

exports.hello = functions.https.onRequest((request, response) => {
    response
        .send("Firebase Endpoint Started!");
});

exports.cities = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        response
            .setHeader('Access-Control-Allow-Origin', '*')

        response.status(200).send(travelService.getUniqueCityList());
    });
});

exports.routes = functions.https.onRequest((request, response) => {


    const departure = request.query.departure_city;
    const arrival = request.query.arrival_city;
    const orderBy = request.query.order_by;
    if (departure && arrival && orderBy) {
        const routes = travelService.calculateShortestDistance(departure, arrival, orderBy);
        cors(request, response, () => {
            response
                .setHeader('Access-Control-Allow-Origin', '*')

            response.status(200).send(routes);
        });
    } else {
        return response.status(403).send('Invalid query params!');
    }
});
