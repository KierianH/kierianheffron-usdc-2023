/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    //result will store our JSON object to return
    var result = {
        "SearchTerm": "",
        "Results": []
    };
    //Store our original search term in the JSON object
    result.SearchTerm = searchTerm;
    //Iterate through each book
    scannedTextObj.forEach(book => {
        //Iterate through each passage in the book
        book.Content.forEach(passage => {
            //If the book contains the search term push relevant information to the Results array
            if (passage.Text.includes(searchTerm)){
                result.Results.push(
                    {
                        "ISBN": book.ISBN,
                        "Page": passage.Page,
                        "Line": passage.Line
                    }
                );
            }
        });
    });
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** Example input object with multiple books. */
const multipleBooksIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "The Odyssey",
        "ISBN": "9780140268867",
        "Content": [
            {
                "Page": 1,
                "Line": 20,
                "Text": "But as the seasons came and went, the year arrived"
            }
        ] 
    }
]

/** Example output object with multiple results */
const multipleBooksOut = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        },
        {
            "ISBN": "9780140268867",
            "Page": 1,
            "Line": 20
        },
    ]  
}
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]  
}

/** Example output object of a term that is not in the input object */
const twentyLeaguesOutNoOccurrenceOfSearch = {
    "SearchTerm": "American",
    "Results": [
    ]
    
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Test to check the function treats different capitalizations differently as intended */
const capitalizationTest = findSearchTermInBooks("The", twentyLeaguesIn);
if (capitalizationTest.Results.length == 1) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", 1);
    console.log("Received:", capitalizationTest.Results.length);
}

/** Test to check if we get A JSON object that contains the search term with an empty array when the search term doesn't occur */
const noOccurrenceOfSearchTest = findSearchTermInBooks("American", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOutNoOccurrenceOfSearch) === JSON.stringify(noOccurrenceOfSearchTest)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesOutNoOccurrenceOfSearch);
    console.log("Received:", noOccurrenceOfSearchTest);
}

/** Test to check that findSearchInBooks handles scenarios with multiple books as expected */
const multipleBooksTest = findSearchTermInBooks("and", multipleBooksIn);
if (JSON.stringify(multipleBooksOut) === JSON.stringify(multipleBooksTest)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", multipleBooksOut);
    console.log("Received:", multipleBooksTest);
}