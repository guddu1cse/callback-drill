/*
    Folder structure:
        ├── problem1.js
        ├── problem2.js
        └── test
            ├── testProblem1.js
            └── testProblem2.js
*/

/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

// You have to do the assignment in 3 ways in different git branches:
// Using require('fs').promises, so this will make sure you know how to consume promises
// Using require('fs'), in this case you have convert fs async callbacks to promise based functions and then use them to solve the problems. This will ensure you know how to convert async callbacks to promise based functions
// Using async await