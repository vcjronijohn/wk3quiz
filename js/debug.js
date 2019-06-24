"use strict";
console.log("1. Hello Welcome to your first test.");
console.log("2. We are excited to have you.");
console.log('3. We are going to have some fun today.'); 

function basicFunc () {
     
    console.log("4. You called me from inside a function! Yay!");

    ifsAndElses();
}

function ifsAndElses () {
    var apples = 10;
    var oranges = 10;
    var kiwis = 20;
    
    // Do a few comparrisons
    if(apples == oranges ) {
        console.log("5. You compared apples to oranges. This is highly unusual");
    } else if (oranges < kiwis) {
        console.log("try 5 again");
    } else {
        console.log("Try your hand at 5");
    }

    if ((apples === oranges) && (apples < kiwis)) {
        console.log("6. We got a whole lot of fruit");

        return loopies();
    } else {
        console.log("Try 6 again");
    } 
}

function loopies () {
    console.log("I want to see which loop we are on 5 times");
    var loopArray = [];
    var i = 0;

    while (i < 5) {
        console.log("7. We are on loop: ", i);
        loopArray.push(i);

        i++;
    }

    parameters(loopArray);

}

function parameters (input) {
    if(input.length === 5) {
        console.log("8. Good job you made it!");
    } else {
        console.log("Try 7 again, looks like u didn't loop 5 times");
    }
}



basicFunc();
