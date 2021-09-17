
const fs = require("fs");
const ps = require("prompt-sync");
const prompt = ps();

let name1 = prompt("Enter your Name1:");
let name2 = prompt("Enter your Name2:");

console.log(name1+" matches "+name2+" "+reduceNumber(characterFrequency(name1,name2).toString())+"% \n");

function characterFrequency(a,b){
    const string = (a + "matches" + b).toLocaleLowerCase().trim();
    const array = string.split('');
    var counter;
    var histo ="";
    
    for(var i = 0; i< array.length; ++i){
            counter =0;
            for(var j =0; j < array.length; ++j){
                if(j<i && array[i] == array[j]){
                    break;
                }
                if(array[i]==array[j]){
                    counter++;
                }
                if(j==array.length-1){
                    histo += counter.toString();
                }
            }
        }
    return histo;
}

function reduceNumber(number){
        const splitNumber = number.split('');
        var dummy = 0, first =0, last = 0, sum=0;
        const secondArray =[];
        
        while(splitNumber.length>=2 && number.length >2){
            first = splitNumber.pop().toString();
            last = splitNumber.shift().toString();
            sum = parseInt(first) + parseInt(last);
            secondArray.push(sum);
            
        }
    if(secondArray.length>=1){
        return reduceNumber((secondArray.concat(splitNumber).toString().replace(/,/g,'')));
    }
    return (secondArray.concat(splitNumber).toString().replace(/,/g,'')) ;
}

 fs.readFile('dataFile.csv', function(err, data) {
    if(err) throw err;
    
    const arr = data.toString().replace(/\r\n/g,'\n').split('\n');
    const males = new Set();
    const females = new Set();
    var name;
    var fileWritten ='';
    
    for(let i of arr) {
        if(i.trim().charAt(i.length-1)=='m'){
            name = i.replace(/, m/g,'');
            males.add(name);
        }else{
            name = i.replace(/, f/g,'');
            females.add(name);
        }
    }

    males.forEach(function(male){
        females.forEach(function(female){

            if (reduceNumber(characterFrequency(male,female).toString())>80){
                 
                 fileWritten +=(male+" matches "+female+" "+reduceNumber(characterFrequency(male,female).toString())+"%, good match \n");
              
            }else{
            
               fileWritten += (male+" matches "+female+" "+reduceNumber(characterFrequency(male,female).toString())+"% \n");
               
            }            
        })
    });
    
    fs.writeFile('output.txt', fileWritten,(err)=>{
        if(err) throw err;
        console.log("written to output Successfully!");
    } );
});
