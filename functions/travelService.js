/**
 * @author Sharaf
 */

const Graph = require('node-dijkstra')

//Load the fares
const fares = require('./data/fares.json');

travelService = () => {

    //Get unique city list
    const getUniqueCityList = () => {
        return fares.deals.map(deal => deal.departure).filter((v, i, a) => a.indexOf(v) === i);
    }

    /*This is the core function that finds the best route between 2 given cities. 
        
    It uses node-dijkstra plugin for finding best path based on Dijkstra's algorithm
    
    The below steps are executed,
        
        1) Get Unique Cities
        2) For each city, find the adjacent cities and its weigtage (Cost or Duration based on input argument)
        3) Sort the cities with best weightage
        4) Add city nodes and adjacent nodes to the Dijkstra alogirthm library
        5) Get the best path
        6) For the resultant path, rebuild the extra route details required for the front end
    */
    const calculateShortestDistance = (startCity, endCity, weightageType) => {
        const routes = new Graph();
        let cityList = new Set();
        for (const city of getUniqueCityList()) {
            const adjacentCities = getAdjacentCities(city, weightageType);
            addToCityMap(cityList, city, adjacentCities);
            routes.addNode(city, arrayToObject(adjacentCities));
        }
        return getRouteDetails(cityList, routes.path(startCity, endCity, { cost: true }));
    }

    // For each city, it gets the adjacent cities. Also returns the top city based on weigtage 
    const getAdjacentCities = (cityName, weightageType) => {
        return fares.deals
            .filter(deal => deal.departure === cityName)
            .map(
                deal => {
                    const { reference, duration, transport } = deal;
                    const cost = deal.cost - (deal.cost * deal.discount / 100)
                    return {
                        reference,
                        duration,
                        transport,
                        cost,
                        city: `${deal.arrival}`,
                        weightage: weightageType === "Cost"
                            ? Number(cost) :
                            Number(deal.duration.h) + "." + (Number(deal.duration.m))
                    }
                }
            )
    }

    //Adding the travel deals to a map, so that it can be used for additional details while sending to the UI
    const addToCityMap = (cityList, startCity, adjacentCities) => {
        for (const city of adjacentCities) {
            //Spread didn't work on Firebase, hence using Object.assign
            //cityList.add({ startCity, ...city });
            const cityObj = Object.assign({ startCity }, city);
            cityList.add(cityObj);
        }
    }

    //This method updates the travel deals against and found route path
    //Eg: for the route [London-Amsterdam-Warsaw] it attaches the route details with duration/cost/reference number
    const getRouteDetails = (cityList, routePath) => {
        let routeDetailsArr = [];

        const routePairArr = getAdjacentPairs(routePath.path);
        for (const routePair of routePairArr) {

            let routes = Array.from(cityList)
                .filter(cityItem => (cityItem.startCity === routePair[0] && cityItem.city === routePair[1]));
            routes = routes.sort((a, b) => parseFloat(a.weightage) - parseFloat(b.weightage));
            routeDetailsArr.push(routes[0]);
        }
        return { route: routePath, routeDetails: routeDetailsArr };
    }

    //This generator function gets the adjacent pairs. If we give [London-Amsterdam-Warsaw], it will return an array of pairs
    // [ [London-Amsterdam] [Amsterdam-Warsaw] ]
    function* getAdjacentPairs(iterable) {
        const iterator = iterable[Symbol.iterator]()
        let current = iterator.next()
        let next = iterator.next()
        while (!current.done && next.value) {
            yield [current.value, next.value]
            current = next
            next = iterator.next()
        }
    }

    //This method flattens the adjacent city array to flat object (city name with weightage) which is required by the node-dijkstra library
    const arrayToObject = (array) =>
        Object.assign({}, ...(array
            .sort((a, b) => parseFloat(b.weightage) - parseFloat(a.weightage))
            .map(item => ({ [item.city]: item.weightage }))));

    return { getUniqueCityList, calculateShortestDistance };

}
module.exports = travelService();

