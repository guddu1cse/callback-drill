/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

function createDir(){

    const dir = fileURLToPath(import.meta.url);
    const currDir = dir.substring(0 , dir.lastIndexOf("/")+1);
    const randomFileName = getRandomString(10);
    const fullPath = path.resolve(currDir , `./output/${randomFileName}.json`);
    const data = getRandomJsonObject(20);

    //creating output dir
    const directory = path.resolve(currDir , "./output");
    if(!fs.existsSync(directory)){
        //creating dir
        cretingDirAndWritingFile(fullPath , data);
        return ;
    }

    console.log("output dir already created");
    //writing the file if dir already present
    writeFile(fullPath , data);
}

function cretingDirAndWritingFile(fullPath , data){
    fs.mkdir( fullPath.substring(0 , fullPath.lastIndexOf("/")+1) , (err)=>{
        if(err){
            console.log("error in creating dir with name output");
            return ;
        }
        console.log("dir output created");
        //writeing the file
        writeFile(fullPath , data);
    });
}

//writing and deleting at same time
function writeFile(fullPath , data ){
    fs.writeFile(fullPath , JSON.stringify(data , null , 2) ,'utf-8', (err)=>{
        if(err) {
            console.log(err , "write in file failed !");
            return ;
        }
        console.log(`${fullPath.substring(fullPath.lastIndexOf("/")+1)} file writen successfully`)
        unlinkFile(fullPath);
    });
}

//deleting the file/dir
function unlinkFile(fullPath){

    if(fs.existsSync(fullPath)){
        fs.unlink(fullPath , (err)=>{
            if(err) {
                console.log("error in deleting the file");
                return ;
            }
            console.log(`${fullPath.substring(fullPath.lastIndexOf("/")+1)} deleted`);
            unlinkDir(fullPath.substring(0 , fullPath.lastIndexOf("/")));
        });
        return ;
    }
    console.log(`${fullPath.substring(fullPath.lastIndexOf("/")+1)} is not persent`);
}

//deleting dir
function unlinkDir(directory){
    if(fs.existsSync(directory)){
        fs.rm(directory, {recursive:true , force:true} , (err)=>{
            if(err) {
                console.log(err , "deleting dir. failed ");
                return ;
            }
            console.log("dir is deleted");
        });
        return ;
    }
    console.log("dir is not present");
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

export default createDir;