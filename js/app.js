// An inventory app for a grocery store

/* TODOs: 
- Handle space delimitation on top of comma delimited
- Handle warning on low stock
- Handle alert if out of stock
- Disallow users to buy more than there is stock
- Load the Rules prompt only when user asks for it.
- Implement store opening hours and closing hours.
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

    return processUserInput(userInput);
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
    }

    promptString += "-------\nRULES\ncomma separated\n1. actions: stock/buy \n2. quantity\n3. item\nexample: buy, 5, guavas\n-------\n";

    promptString += "Store Inventory: \n-------\n";


    //  loop through inventory array and create a nice looking string
    for(var i = 0; i < store.length; i ++) {
        // Item name
        promptString += (store[i][0] + ": ");

        // Item Count
        promptString += (store[i][1] + "\n");
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

    // break down string into an array
    userInput = userInput.split(',');
    
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
                //3. Add count to inventory
                store[j][1] -= count;
                return storeOperations(buildPrompt("You bought " + count + " " + item));

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

