/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/
const fs = require("fs");
const path = require("path");
const directory = path.resolve(__dirname , "/output")

function createDir(){

    const randomFileName = getRandomString(10);
    const fullPath = path.resolve(__dirname , `./output/${randomFileName}.json`);
    const data = getRandomJsonObject(20);

    const promise = new Promise((resolve , reject)=>{
        if(!fs.existsSync(directory)) resolve();
        else reject();
    });

    promise
    .then(()=> {
        //creating dir
        cretingDirAndWritingFile(fullPath , data);
        console.log("output dir created !");
    })
    .catch(()=>{
        console.log("output dir already created");
        //writing the file if dir already present
        writeFile(fullPath , data);
    });
}

function cretingDirAndWritingFile(fullPath , data){
    const promise= new Promise((resolve , reject)=>{
        fs.mkdir( fullPath.substring(0 , fullPath.lastIndexOf("/")+1) , (err)=>{
            if(err){
                reject("path already exist");
                return ;
            }
            console.log("dir output created");
            resolve();
        });
    });
   
    promise
    .then(() =>writeFile(fullPath , data))
    .catch((error)=> console.log(error));
}

//writing and deleting at same time
function writeFile(fullPath , data ){

    const promise = new Promise((resolve , reject)=>{
        fs.writeFile(fullPath , JSON.stringify(data , null , 2) ,'utf-8', (err)=>{
            if(err) {
                reject(err);
                return ;
            }
            resolve(`${fullPath.substring(fullPath.lastIndexOf("/")+1)} file writen successfully`);
        });
    });

    promise
    .then((res)=>{
        console.log(res);
        unlinkFile(fullPath);
    })
    .catch((err)=> console.log(err));
}

//deleting the file/dir
function unlinkFile(fullPath){
    isExists(fullPath)
    .then((res)=>{
        const fileUnlink = new Promise((resolve , reject)=>{
            fs.unlink(fullPath , (err)=>{
                if(err) {
                    reject(err);
                    return ;
                }
                resolve(`${fullPath.substring(fullPath.lastIndexOf("/")+1)} deleted`);
            });
        });

        fileUnlink
        .then((res)=>{
            console.log(res);
            unlinkDir(fullPath.substring(0 , fullPath.lastIndexOf("/")));
        }).catch((err)=>{
            console.log(err);
        })
        console.log(res)
    })
    .catch((error)=>{
        console.log(error);
    });
}

//deleting dir
function unlinkDir(directory){
    isExists(directory)
    .then((res)=>{

        fs.rm(directory, {recursive:true , force:true} , (err)=>{
            if(err) {
                console.log(err , "deleting dir. failed ");
                return ;
            }
            console.log("dir is deleted");
        });
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });
}

function isExists(fullPath){
    return new Promise((resolve , reject)=>{
        if(fs.existsSync(fullPath)){
            resolve(`${fullPath} is exists !`);
        }
        else reject(`${fullPath} is not exists !`);
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