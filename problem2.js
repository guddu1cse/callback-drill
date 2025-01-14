/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt

        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt

        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const currPath = fileURLToPath(import.meta.url);
const currDir = currPath.substring(0 , currPath.lastIndexOf("/")+1);

function problem2(){
    const filenames = "filenames.txt";
    //step-1
    fs.readFile(getPath("./data/lipsum_1.txt"), "utf-8" , (err , data)=>{
        if(err) {
            console.log(err);
            return ;
        }
        let newFile = "uppercase.txt";

        //step -2
        fs.writeFile(getPath(`./data/${newFile}`) , data.toUpperCase() ,
         (err)=>{
            if(err){
                console.log(err);
                return ;
            }
            fs.appendFile(getPath(`./data/${filenames}`) , newFile + "\n" , (err)=>{
                if(err){
                    console.log(err);
                    return ;
                }

                fs.readFile(getPath(`./data/${newFile}`) , "utf-8" , (err , data)=>{
                    if(err){
                        console.log(err);
                        return ;
                    }
                    data = data.toLowerCase().split(" ").join("\n");
                    newFile = "lowercasesplitwise.txt";

                    //step -3
                    fs.writeFile(getPath(`./data/${newFile}`) , data , (err)=>{
                        if(err){
                            console.log(err);
                            return ;
                        }
                        fs.appendFile(getPath(`./data/${filenames}`) , newFile+"\n" , (err)=>{
                            if(err){
                                console.log(err);
                                return ;
                            }
                            fs.readFile(getPath(`./data/${newFile}`) , "utf-8" , (err , data)=>{
                                if(err){
                                    console.log(err);
                                    return ;
                                }
                                //sorting the data, step -4
                                data = data.split("\n").sort().filter((val)=> val.trim().length != 0).join("\n");
                                newFile = "sort.txt";
                                fs.writeFile(getPath(`./data/${newFile}`) , data , (err)=>{
                                    if(err){
                                        console.log(err);
                                        return ;
                                    }
                                    fs.appendFile(getPath(`./data/${filenames}`) , newFile+"\n" , (err)=>{
                                        if(err){
                                            console.log(err);
                                            return ;
                                        }
                                        
                                        fs.readFile(getPath(`./data/${filenames}`) , "utf-8" , (err , data)=>{
                                            if(err){
                                                console.log(err);
                                                return ;
                                            }
                                            //step -5
                                            data = data.split("\n").map((val)=>val.trim()).filter((val)=> val.length != 0);
                                            for(const val of data){
                                                fs.unlink(getPath(`./data/${val}`) , (err)=>{
                                                    if(err){
                                                        console.log(err);
                                                        return ;
                                                    }
                                                    console.log(`${val} deleted`);
                                                });
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function getPath(__path){
    return path.resolve(currDir , __path);
}

export default problem2;
