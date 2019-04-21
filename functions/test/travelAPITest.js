const assert = require('assert');
const travelService = require("../travelService");

describe("Hello Firebase Test", () => {
    it("Checks if the setup is fine", () => {
        assert.equal(2 + 2, 4);
    })
})

describe("Unique Cities", () => {
    it("Check unique cities count", () => {
        assert.equal(travelService.getUniqueCityList().length, 16);
    })
})

describe("Cost Based Test Scenarios", () => {

    const WEIGHTAGE_TYPE = "Cost";
    it("Cheapest Cost between London and Amsterdam ", () => {
        assert.equal(travelService.calculateShortestDistance('London', 'Amsterdam', WEIGHTAGE_TYPE).route.cost, 30);
    })

    it("Cheapest Cost between Amsterdam and Warsaw ", () => {
        assert.equal(travelService.calculateShortestDistance('Amsterdam', 'Warsaw', WEIGHTAGE_TYPE).route.cost, 30);
    })

    it("Cheapest Cost between London and Warsaw ", () => {
        assert.equal(travelService.calculateShortestDistance('London', 'Warsaw', WEIGHTAGE_TYPE).route.cost, 60);
    })

    it("Cheapest Cost between Warsaw and Stockholm ", () => {
        assert.equal(travelService.calculateShortestDistance('Warsaw', 'Stockholm', WEIGHTAGE_TYPE).route.cost, 20);
    })

    it("Cheapest Cost between London and Stockholm ", () => {
        assert.equal(travelService.calculateShortestDistance('London', 'Stockholm', WEIGHTAGE_TYPE).route.cost, 80);
    })

    it("Cheapest Cost between London and Moscow ", () => {
        assert.equal(travelService.calculateShortestDistance('London', 'Moscow', WEIGHTAGE_TYPE).route.cost, 100);
    })

    it("Cheapest Cost between Brussels and Moscow ", () => {
        assert.equal(travelService.calculateShortestDistance('Brussels', 'Moscow', WEIGHTAGE_TYPE).route.cost, 50);
    })

    it("Cheapest Cost between Prague and Moscow ", () => {
        assert.equal(travelService.calculateShortestDistance('Prague', 'Moscow', WEIGHTAGE_TYPE).route.cost, 30);
    })

    it("Cheapest Cost between Madrid and London ", () => {
        assert.equal(travelService.calculateShortestDistance('Madrid', 'London', WEIGHTAGE_TYPE).route.cost, 40);
    })

    it("Cheapest Cost between London and Geneva ", () => {
        assert.equal(travelService.calculateShortestDistance('London', 'Geneva', WEIGHTAGE_TYPE).route.cost, 70);
    })

});

describe("Duration Based Test Scenarios", () => {

    const WEIGHTAGE_TYPE = "Duration";
    
    it("Shortest Duaration between London and Amsterdam ", () => {
        assert.equal(travelService.calculateShortestDistance('London', 'Amsterdam', WEIGHTAGE_TYPE).route.cost, 4.45);
    })

    it("Shortest Duaration between Amsterdam and Warsaw ", () => {
        assert.equal(travelService.calculateShortestDistance('Amsterdam', 'Warsaw', WEIGHTAGE_TYPE).route.cost, 4.45); 
    })

    it("Shortest Duration between London and Warsaw ", () => {
        assert.equal(travelService.calculateShortestDistance('London', 'Warsaw', WEIGHTAGE_TYPE).route.cost, 8.90); 
    })
});