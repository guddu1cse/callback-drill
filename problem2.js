/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt

        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt

        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require('fs').promises;
const path = require('path');

function problem2(){
    const filenames = "filenames.txt";
    let filename= "uppercase.txt";
    //step -1 read the lipsum_2.txt
    fs.readFile(getPath("./data/lipsum_2.txt") , "utf-8")
    .then((res)=>{
        console.log("");
        fs.writeFile(getPath(`./data/${filename}`) , res.toUpperCase())
        .then(()=>{
            fs.appendFile(getPath(`./data/${filenames}`) , filename + "\n")
            .then(()=>{
                fs.readFile(getPath(`./data/${filename}`) , "utf-8")
                .then((res)=>{
                    res = res.toLowerCase().split(" ");
                    res = res.map((val) => val.trim())
                    .filter((val)=> val.length > 0);
                    res = res.join("\n");
                    filename = "split.txt";

                    fs.writeFile(getPath(`./data/${filename}`) , res)
                    .then(()=>{
                        fs.appendFile(getPath(`./data/${filenames}`) , filename + "\n")
                        .then(()=>{
                            fs.readFile(getPath(`./data/${filename}`) , "utf-8")
                            .then((res)=>{
                                res = res.split("\n").filter((val) => val.trim().length)
                                .sort()
                                .join("\n");
                                filename = "sort.txt";
                                fs.writeFile(getPath(`./data/${filename}`) , res )
                                .then(()=>{
                                    fs.appendFile(getPath(`./data/${filenames}`) , filename + "\n")
                                    .then(()=>{
                                        setTimeout(()=>{
                                            fs.readFile(getPath(`./data/${filenames}`) , "utf-8")
                                            .then((res)=>{
                                                let fileList = res.split("\n")
                                                .filter((val)=> val.trim().length > 0);
                                                fileList.push(filenames);

                                                fileList.forEach((file)=>{
                                                    fs.unlink(getPath(`./data/${file.trim()}`))
                                                    .then(()=> console.log(`${file} is deleted !`))
                                                    .catch((err)=> console.log(err));
                                                });
                                            }).catch((err)=> console.log(err));
                                        } , 10000);
                                    }).catch((err)=> console.log(err));
                                }).catch((err)=> console.log(err));
                            }).catch((err)=> console.log(err));
                        }).catch((err)=> console.log(err));
                    }).catch((err)=> console.log(err));
                }).catch((err)=> console.log(err));
            }).catch((err)=> console.log(err));
        }).catch((err)=> console.log(err));
    }).catch((err)=> console.log(err));
}

function getPath(__path){
    return path.resolve(__dirname , __path);
}

function print(res){
    console.log(res);
}

module.exports =  problem2;