import {FileHandler} from './file-handler';
import * as yargs from 'yargs'; 

yargs.command({
  command: 'isfiledir',
  describe: 'Comprueba si es un directorio o un fichero',
  builder: {
    path: {
      describe: 'Ruta relativa',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      const objetoFileHandler: FileHandler = new FileHandler(argv.path);
      if (objetoFileHandler.isRightPath()) {
        objetoFileHandler.isFileDir();
      } else {
        console.log(`Ha escrito el archivo o el directorio de forma incorrecta, o no existen.`);
      }
    }
  },
});

yargs.command({
  command: 'createdir',
  describe: 'Crea un directorio',
  builder: {
    path: {
      describe: 'Ruta relativa',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      const objetoFileHandler: FileHandler = new FileHandler(argv.path);
      objetoFileHandler.createDir();
    }
  },
});

yargs.command({
  command: 'readdir',
  describe: 'Lee un directorio',
  builder: {
    path: {
      describe: 'Ruta relativa',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      const objetoFileHandler: FileHandler = new FileHandler(argv.path);
      if (objetoFileHandler.isRightPath()) {
        objetoFileHandler.readDir();
      } else {
        console.log(`Ha escrito el archivo o el directorio de forma incorrecta, o no existen.`);
      }
    }
  },
});

yargs.command({
  command: 'readfile',
  describe: 'Lee un archivo',
  builder: {
    path: {
      describe: 'Ruta relativa',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      const objetoFileHandler: FileHandler = new FileHandler(argv.path);
      if (objetoFileHandler.isRightPath()) {
        objetoFileHandler.readFile();
      } else {
        console.log(`Ha escrito el archivo o el directorio de forma incorrecta, o no existen.`);
      }
    }
  },
});

yargs.command({
  command: 'deletefiledir',
  describe: 'Elimina un archivo o un directorio',
  builder: {
    path: {
      describe: 'Ruta relativa',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      const objetoFileHandler: FileHandler = new FileHandler(argv.path);
      if (objetoFileHandler.isRightPath()) {
        objetoFileHandler.deleteFileDir();
      } else {
        console.log(`Ha escrito el archivo o el directorio de forma incorrecta, o no existen.`);
      }
    }
  },
});

yargs.command({
  command: 'movecopyfiledir',
  describe: 'Mueve o copia un archivo o un directorio',
  builder: {
    pathfrom: {
      describe: 'Ruta relativa del archivo o directorio que se quiere mover o copiar',
      demandOption: true,
      type: 'string',
    },
    pathto: {
      describe: 'Ruta relativa del archivo o directorio de destino',
      demandOption: true,
      type: 'string',
    },
    option: {
      describe: 'Opcion-1: Mueve archivos, Opcion-2: Copia archivos, Opcion-3: Mueve directorio, Opcion-4: Copia directorio',
      demandOption: true,
      type: 'number',
    },
  },
  handler(argv) {
    if (typeof argv.pathfrom === 'string' && typeof argv.pathto === 'string' && typeof argv.option === 'number') {
      const objetoFileHandler: FileHandler = new FileHandler(argv.pathfrom);
      if (objetoFileHandler.isRightPath()) {
        objetoFileHandler.moveCopyFileDir(argv.pathto, argv.option);
      } else {
        console.log(`Ha escrito el archivo o el directorio de forma incorrecta, o no existen.`);
      }
    }
  },
});

yargs.parse();

