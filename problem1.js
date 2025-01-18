/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/
const fs = require("fs").promises;
const path = require("path");
const directory = path.resolve(__dirname , "./data/output");

    const randomFileName = getRandomString(10);
    const fullPath = path.resolve(__dirname , `./data/output/${randomFileName}.json`);
    const data = getRandomJsonObject(20);

function createDir(){

    fs.access(directory)
    .then((res)=>{
        console.log("file exist");
        writeFile();
    }).catch((error)=>{
        console.log("error->" ,error);
        createDir();
    });
}

function createDir(){
    fs.mkdir(directory).then(()=>{
         writeFile();
    });
}

function writeFile(){
     fs.writeFile(fullPath , JSON.stringify(data , null, 2) ).then(()=>{
        setTimeout(()=>{
             fs.unlink(fullPath).then(()=>{
                console.log(`${randomFileName} is deleted !`);

                setTimeout(()=>{
                    fs.rm(directory , {recursive : true});
                },10000);
            });
        } , 10000);
    });
}

//geting random json object by calling the method
function getRandomJsonObject(length){
    const obj = {};
    for(let v=0 ; v<Math.floor(Math.random()*length) ; v++){
        obj[getRandomString(Math.floor(Math.random()*length))] =
         getRandomString(Math.floor(Math.random()*length));
    }
    return obj;
}

//geting random string value
function getRandomString(length){
    let charcters = "abcdefghijklmnopqrstuvwxyz";
    charcters += charcters.toUpperCase()
     + `0123456789.,{}[]()@#%&%*-_+='${"`"}"!$^|<>.?`;

    let result = "";
    while(length-- > 0){
        result+=charcters.charAt(Math.floor(Math.random() * charcters.length));
    }
    return result;
}

module.exports = createDir;