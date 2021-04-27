import * as fs from 'fs';
import path from 'path';
import ncp from 'ncp';

// let path = "/path/to/something";
/*
fs.lstat(path.resolve(__dirname, `../../`), (err, stats) => {
  if (err) {
    return console.log(err);
  } // Handle error

  console.log(`Is file: ${stats.isFile()}`);
});

fs.lstat(path.resolve(__dirname, `../../`), (err, stats) => {
  if (err) {
    return console.log(err);
  } // Handle error

  console.log(`Is directory: ${stats.isDirectory()}`);
});

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
fs.mkdir(path.resolve(__dirname, `../../hola/`), {recursive: true}, (err) => {
  if (err) throw err;
});

fs.readdir(path.resolve(__dirname, `../../hola/`), function(err, archivos) {
  if (err) {
    throw err;
  }   
  console.log(archivos);
});

fs.readFile(path.resolve(__dirname, `../../README.md`), (err, data) => {
  if (err) {
    throw err;
    // console.log('error: ', err);
  } else {
    console.log(data.toString());
  }
});
console.log('esto se ejecuta antes que esté el archivo');


/* fs.stat(path.resolve(__dirname, `../../hola/hola-2.txt`), function(err, stats) {
  console.log(stats);

  if (err) {
    return console.error(err);
  }

  /* if (stats.isFile()) {
    fs.unlink(path.resolve(__dirname, `../../hola/hola-1.txt`), function(err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
    });  
  }

  if (stats.isDirectory()) {
    fs.rm(path.resolve(__dirname, `../../hola/`), {recursive: true, force: true}, (err) => {
      if (err) throw err;
      else {
        console.log(`directorio borrado`);
      }
    });
  }
});

fs.rm(path.resolve(__dirname, `../../hola/`), {recursive: true, force: true}, (err) => {
  if (err) throw err;
  else {
    console.log(`directorio borrado`);
  }
});

fs.rename('/tmp/tortadchoc', '/tmp/tortadechocolate', (err) => {
  if (err) throw err;
  fs.stat('/tmp/tortadechocolate', (err, stats) => {
    if (err) throw err;
    console.log(`stats: ${JSON.stringify(stats)}`);
  });
});

*/

ncp(path.resolve(__dirname, `../../hola1`), (path.resolve(__dirname, `../../hola2`)), (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('done!');
});

