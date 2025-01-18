/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt

        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt

        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require('fs');
const path = require('path');

function problem2(){
    const filenames = "filenames.txt";
    //step -1 read the lipsum_2.txt
    const readTxt = new Promise((resolve , reject)=>{
        fs.readFile(getPath("./data/lipsum_2.txt") , "utf-8" , (err , data)=>{
            if(err) reject(err);
            else resolve(data);
        })
    });

    let filename = "uppercase.txt";
    readTxt.then((res)=>{
        return new Promise((resolve , reject)=>{
            fs.writeFile(getPath(`./data/${filename}`) , res.toUpperCase() , (err)=>{
                if(err) reject(err);
                else resolve(`written in ${filename}`);
            });
        });
    }).then((res)=>{
        console.log(res);
        return new Promise((resolve , reject)=>{
            fs.appendFile(getPath(`./data/${filenames}`) , `${filename}\n` , (err)=>{
                if(err) reject(err);
                else resolve(filename + " added in " + filenames);
            })
        });
    }).then((res)=>{
        console.log(res);
        return new Promise((resolve , reject)=>{
            fs.readFile(`./data/${filename}` , "utf-8" , (err , data)=>{
                if(err) reject(err);
                else resolve(data);
            });
        });
    }).then((res)=>{
        res = 
        res.toLowerCase().split(" ");
        res = res.map((val)=> val.trim());
        res = res.filter((val)=> val.length > 0);

        filename = "split.txt";

        return new Promise((resolve , reject)=>{
            fs.writeFile(getPath(`./data/${filename}`) , res.join("\n") , (err)=>{
                if(err) reject(err);
                else resolve(`written in ${filename} by spliting the sentence wise`);
            });
        });
    }).then((res)=>{
        console.log(res);
        return new Promise((resolve , reject)=>{
            fs.appendFile(getPath(`./data/${filenames}`) , `${filename}\n` , (err)=>{
                if(err) reject(err);
                else resolve(`${filename} added to ${filenames}`);
            });
        });
    }).then((res)=>{
        console.log(res);
        return new Promise((resolve , reject)=>{
            fs.readFile(getPath(`./data/${filename}`) , "utf-8" , (err , data)=>{
                if(err) reject(err);
                else resolve(data);
            });
        });
    }).then((res)=>{
        res = res.split("\n").sort().join("\n");
        filename = "sort.txt";

        return new Promise((resolve , reject)=>{
            fs.writeFile(getPath(`./data/${filename}`) , res , (err)=>{
                if(err) reject(err);
                else resolve(`added text in ${filename}`);
            });
        });
    }).then((res)=>{
        console.log(res);
        return new Promise((resolve , reject)=>{
            fs.appendFile(getPath(`./data/${filenames}`) , `${filename}\n` , (err)=>{
                if(err) reject(err);
                else resolve(`${filename} added to ${filenames}`);
            });
        });
    }).then((res)=>{
        console.log(res);
        
        return new Promise((resolve , reject)=>{
            fs.readFile(getPath(`./data/${filenames}`) , "utf-8" , (err , data)=>{
                if(err) reject(err);
                else resolve(data);
            });
        });
    }).then((res)=>{
        res = res.split("\n");
        res = res.map((val)=> val.trim()).filter((val)=> val.length>0);
        res.push(filenames);
        console.log(res);
        const promises = [];

        res.forEach((file)=>{
            const promise = new Promise((resolve , reject)=>{
                setTimeout(()=>{
                    fs.unlink(getPath(`./data/${file}`), (err)=>{
                        if(err) reject(err);
                        else resolve(`${file} deleted !`);
                    });
                }, 5000);
            });
            promises.push(promise);
        });
        return Promise.allSettled(promises);
    }).then((res)=>console.log(res))
    .catch((err)=> console.log(err));
    
}

function getPath(__path){
    return path.resolve(__dirname , __path);
}

function print(res){
    console.log(res);
}

module.exports =  problem2;
