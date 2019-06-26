"use strict"
// An inventory app for a grocery store

/* TODOs: 
∙ Handle space delimitation on top of comma delimited
∙ Handle warning on low stock
∙ Handle alert if out of stock
∙ Disallow users to buy more than there is stock
∙ Load the Rules prompt only when user asks for it.
∙ Implement store opening hours and closing hours.
*/

// default inventory
var store = [
    ["guavas", 5], 
    ["chicken", 3],
    ["grapes", 2],
    ["sauce", 3],
    ["lettuce", 10],
    ["spinach", 2]
];

storeOperations(buildPrompt());

// Function that runs as long as the store is open
function storeOperations (promptString) {
    var userInput = prompt(promptString);

    // Get today's date
const today = new Date();
const hour = new Date();

// Check to see if the store is open
if (today.getDay() === 0) {
  console.log("Sorry, the store is closed.");
} else if(hour.getHours() < 9 || hour.getHours() > 21) {
    console.log("Sorry, the store is closed.");
}  
  else {
    return processUserInput(userInput);

  }

 //   return processUserInput(userInput);
}

// - build prompt function
function buildPrompt (userAction) {
    //  build prompt string
    var promptString = "\n";

    // if there was a last action tell the user what it was
    if(userAction) {
        promptString += userAction + "\n";
    } else {
        promptString += "Welcome to our store!\n";
        promptString += "Open Mon-Sat 9am-9pm\n";
    }

    promptString += "-------\nRULES\ncomma separated\n1. actions: stock/buy \n2. quantity\n3. item\nexample: buy, 5, guavas\n-------\n";

    promptString += "Store Inventory: \n-------\n";


    //  loop through inventory array and create a nice looking string
    for(var i = 0; i < store.length; i ++) {
        // Item name
        promptString += (store[i][0] + ": ");

        // Item Count
        promptString += (store[i][1] + "\n");
        
        // warning if anything is running low or out of stock
        if(store[i][1] == 0) {
            promptString += "W A R N I N G, we are out of " + store[i][0] + "'s!!\n";
        }
        else if(store[i][1] < 2) {
            promptString += "W A R N I N G, " + store[i][0] + "'s are running low.\n";
        }
       
    }

    console.log(promptString);
    return promptString;
    
}


/*
* Expect userInput to be a string
* action, count, item
*/
function processUserInput (userInput) {

    if(userInput === "quit") {
        console.log("Thank you for your business");
        return;
    }
    
    if(userInput === undefined || userInput === "") {
        return storeOperations(buildPrompt("We didn't get anything that time. Please try again.\n If you would like to quit just enter 'quit'"));
    }

    // if user needs menu 
    if(userInput === "menu") {
        return storeOperations(buildPrompt());
    }

    // break down string into an array
   // userInput = userInput.split(', ');
    userInput = userInput.split(/[\s, ]+/);


    
    // Sanitize userInput of white space
    for(var i = 0; i < userInput.length; i ++) {
        userInput[i] = userInput[i].trim();
    }

    var action = userInput[0];
    var count = Number(userInput[1]);
    var item = userInput[2];

    // Update Inventory
    for(var j = 0; j < store.length; j++) {
   
        // Matches User Input to item in store
        if(item === store[j][0]) {
            
            //2. action: (buy)
            if(action === "buy") {
                // if store has less than customer is asking
                if(store[j][1] < count) {
                    return storeOperations(buildPrompt("The store doesn't have enough to fill your order."));
                }
                //3. Add count to inventory
                else {
                store[j][1] -= count;
                return storeOperations(buildPrompt("You bought " + count + " " + item));
                }

            } 

            //2a. action: (buy)
            if(action === "stock") {
                store[j][1] += count;
                return storeOperations(buildPrompt("You stocked " + count + " " + item));
            }

        }
    }

    return storeOperations(buildPrompt("Did not get a valid purchase"));

};

