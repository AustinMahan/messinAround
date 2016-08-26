'use strict';

var fs = require('fs')
var path = require('path')
var guestpath = path.join(__dirname, 'animals.json')

var node = path.basename(process.argv[0])
var file = path.basename(process.argv[1])
var cmd = process.argv[2]

if(cmd == 'read'){
  fs.readFile(guestpath, 'utf8', function(err, data){
    if(err){
      throw err;
    }

    var animals = JSON.parse(data)
    console.log(animals);
  })
}else if(cmd == 'create'){
  fs.readFile(guestpath, 'utf8', function(err, data){
    if(err){
      throw err;
    }

    var animals = JSON.parse(data)
    var animal = {species: process.argv[3], name: process.argv[4]}

    animals.push(animal)
    var animalsJson = JSON.stringify(animals)

    fs.writeFile(guestpath, animalsJson, function(err){
      if(err){
        throw err;
      }
    })
    console.log(animals);
  })
}else if(cmd == 'destroy'){
  fs.readFile(guestpath, 'utf8', function(err, data){
    var animals = JSON.parse(data)
    animals.forEach(function(currAnimal, index){
      if(currAnimal.species == process.argv[3] && currAnimal.name == process.argv[4]){
        animals.splice(index, 1)
        console.log('test');
      }
    })
    var animalsJson = JSON.stringify(animals)
    fs.writeFile(guestpath, animalsJson, function(err){
      if(err){
        throw err;
      }
    })
    console.log(animals);
  })
} else{
  console.error(`Usage: ${node} ${file} [read | create]`);
  process.exit(1)
}
