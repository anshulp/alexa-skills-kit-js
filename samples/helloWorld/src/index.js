/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.echo-sdk-ams.app.56e69206-ad61-4056-be43-dd2687d00711'

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * HelloWorld is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var HelloWorld = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
HelloWorld.prototype = Object.create(AlexaSkill.prototype);
HelloWorld.prototype.constructor = HelloWorld;

HelloWorld.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HelloWorld onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

HelloWorld.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("HelloWorld onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Alexa for Expedia, you can say Get Best Hotel for Seattle";
    var repromptText = "you can say Get Best Hotel for Seattle";
    response.ask(speechOutput, repromptText);
};

HelloWorld.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

HelloWorld.prototype.intentHandlers = {

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    },
    "GetBestHotel" : function (intent, session, response) {
        var city_slot = intent.slots.city
        var city = city_slot.value.toString()
        console.log('city is :', city)

        var laHotelResponse = "Best LA Hotel is SLS Hotel, a Luxury Collection Hotel, Beverly Hills and is located at 465 S La Cienega Blvd. This Beverly Hills hotel, Starwood Luxury Collection, is two blocks from Beverly Center shopping and within 2.5 miles of the Sunset Strip and Rodeo Drive.";
        var chicagoHotelResponse = "Best Chicago Hotel is Waldorf Astoria Chicago and is located at 11 E. Walton Street. This family-friendly Chicago hotel is located in the historical district, within a 10-minute walk of Newberry Library, Hancock Tower, and Chicago Water Tower. Tribune Tower and Wrigley Building are also within 1 mi (2 km).";
        var nyHotelResponse = "Best New York hotel is The Carlyle, A Rosewood Hotel and is located at 35 E 76th St. Host to world leaders and entertainment luminaries, this Upper East Side landmark presides over fashionable Madison Avenue, 1 block from Central Park and 5 blocks from the Metropolitan Museum of Art.";
        var seattleHotelResponse= "Best Seattle Hotel is Fairmont Olympic Hotel and is located at 411 University Street. Built on the original site of the University of Washington, this grand hotel is just a few blocks from the Seattle Art Museum, Pacific Place shops, the Pike Place Market, and the convention center ";

        if (city === "get Los Angeles")
            response.tellWithCard(laHotelResponse);
        else if (city === "get Chicago")
            response.tellWithCard(chicagoHotelResponse);
        else if (city === "get New York")
            response.tellWithCard(nyHotelResponse);
        else if (city === "get Seattle")
            response.tellWithCard(seattleHotelResponse);
        else
            response.tellWithCard("Your city is not yet supported on Alexa for Expedia. Please try Seattle, New York, Chicago or Los Angeles. For next set of cities please stay tuned.");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var helloWorld = new HelloWorld();
    helloWorld.execute(event, context);
};

