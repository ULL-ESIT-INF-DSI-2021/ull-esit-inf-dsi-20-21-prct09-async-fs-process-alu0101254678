import * as fs from 'fs';
import ncp from 'ncp';

export class FileHandler {
  private pathRelative: string;
  
  constructor(pathParam: string) {
    this.pathRelative = pathParam;
  }

  getPath() {
    return this.pathRelative;
  }

  setPath(pathParam: string) {
    this.pathRelative = pathParam;
  }

  isRightPath() {
    if (fs.existsSync(`${__dirname}/${this.pathRelative}`)) {
      return true;
    } else return false;
  }

  isRightPathParam(path: string) {
    if (fs.existsSync(`${__dirname}/${path}`)) {
      return true;
    } else return false;
  }

  isFileDir() {
    if (!this.isRightPath()) {
      return false;
    } else {
      try {
        fs.lstat(`${__dirname}/${this.pathRelative}`, (err, stats) => {
          if (err) {
            throw new Error(`Ha habido un problema con ${this.pathRelative}`);
          } else {
            if (stats.isFile()) {
              console.log(`Es un fichero: ${stats.isFile()}`);
            }
            if (stats.isDirectory()) {
              console.log(`Es un directorio: ${stats.isDirectory()}`);
            }
          }
        });
      } catch (error) {
        console.log(error.message());
        return error.message;
      }
      return true;
    }
  }

  createDir() {
    try {
      fs.mkdir(`${__dirname}/${this.pathRelative}`, {recursive: true}, (err) => {
        if (err) {
          throw new Error(`Ha habido un problema con ${this.pathRelative}`);
        } else {
          console.log(`El directorio ${this.pathRelative} se ha creado correctamente`);
        }
      });
    } catch (error) {
      console.log(error.message());
      return error.message;
    }
    return true;
  }

  readDir() {
    if (!this.isRightPath()) {
      return false;
    } else {
      try {
        fs.readdir(`${__dirname}/${this.pathRelative}`, (err, archivos) => {
          if (err) {
            throw new Error(`Ha habido un problema con ${this.pathRelative}`);
          }
          console.log(archivos);
        });
      } catch (error) {
        console.log(error.message());
        return error.message;
      }
      return true;
    }
  }

  readFile() {
    if (!this.isFileDir()) {
      return false;
    } else {
      try {
        fs.readFile(`${__dirname}/${this.pathRelative}`, (err, data) => {
          if (err) {
            throw new Error(`Ha habido un problema con ${this.pathRelative}`);
          } else {
            console.log(data.toString());
          }
        });
      } catch (error) {
        console.log(error.message());
        return error.message;
      }
      return true;
    }
  }

  deleteFileDir() {
    if (!this.isRightPath()) {
      return false;
    } else {
      try {
        fs.rm(`${__dirname}/${this.pathRelative}`, {recursive: true, force: true}, (err) => {
          if (err) {
            throw new Error(`Ha habido un problema con ${this.pathRelative}`);
          } else {
            console.log(`Se ha borrado ${__dirname}/${this.pathRelative}`);
          }
        });
      } catch (error) {
        console.log(error.message());
        return error.message;
      }
      return true;
    }
  }

  moveCopyFileDir(path: string, opcion: number) {
    if (!this.isRightPath() || !this.isRightPathParam(path)) {
      return false;
    } else {
      try {
        if (opcion === 1) { // mueve el archivo, lo copia y despues lo elimina
          fs.copyFile(`${__dirname}/${this.pathRelative}`, `${__dirname}/${path}`, (err) => {
            if (err) {
              throw new Error(`Ha habido un problema con ${this.pathRelative} o con ${__dirname}/${path}`);
            }
            console.log(`Se ha movido el archivo ${__dirname}/${this.pathRelative} a ${__dirname}/${path}`);
          });
          this.deleteFileDir();
        }

        if (opcion === 2) { // copia el archivo
          fs.copyFile(`${__dirname}/${this.pathRelative}`, `${__dirname}/${path}`, (err) => {
            if (err) {
              throw new Error(`Ha habido un problema con ${__dirname}/${this.pathRelative} o con ${__dirname}/${path}`);
            }
            console.log(`Se ha copiado el archivo ${__dirname}/${this.pathRelative} a ${__dirname}/${path}`);
          });
        }

        if (opcion === 3) { // mueve el directorio, lo copia y despues lo elimina
          ncp(`${__dirname}/${this.pathRelative}`, `${__dirname}/${path}`, (err) => {
            if (err) {
              throw new Error(`Ha habido un problema con ${__dirname}/${this.pathRelative} o con ${__dirname}/${path}`);
            }
            console.log(`Se ha movido el directorio ${__dirname}/${this.pathRelative} a ${__dirname}/${path}`);
          });
          this.deleteFileDir();
        }

        if (opcion === 4) { // copia el directorio
          ncp(`${__dirname}/${this.pathRelative}`, `${__dirname}/${path}`, (err) => {
            if (err) {
              throw new Error(`Ha habido un problema con ${this.pathRelative} o con ${__dirname}/${path}`);
            }
            console.log(`Se ha copiado el directorio ${__dirname}/${this.pathRelative} a ${__dirname}/${path}`);
          });
        }
      } catch (error) {
        console.log(error.message());
        return error.message;
      }
      return true;
    }
  }
}

/*
import {copyFile, constants} from 'fs';

function callback(err) {
  return 'hola';
}

// destination.txt will be created or overwritten by default.
copyFile('source.txt', 'destination.txt', callback);

// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL, callback);
*/
