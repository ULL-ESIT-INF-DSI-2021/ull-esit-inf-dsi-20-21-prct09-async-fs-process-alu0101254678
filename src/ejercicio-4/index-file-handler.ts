import {FileHandler} from './file-handler';
import * as yargs from 'yargs'; 

/**
 * Comando que sirve para analizar si una ruta dad
 * es un fichero o un directorio, tiene una opción
 * que es la ruta
 */
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

/**
 * Comando que sirve para crear un directorio, para comunicarselo
 * a file.handler, siempre se crear un objeto de este tipo
 */
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

/**
 * Comando que sirve para leer un directorio,
 * con una opción obligatoria que es la ruta al
 * directorio
 */
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

/**
 * Comando que sirve para leer el contenido de un fichero
 * tiene una única opción que es path, es un string, y es obligatoria
 * la opcion, luego tiene un handler que es para manejar la lógica
 */
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

/**
 * Comando que sirve para borrar un archivo o un directorio, comprueba en el
 * manejador si es una ruta correcta o no
 */
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


/**
 * Comando que sirve para copiar o mover archivos o directorios, tiene tres opciones,
 * una para la ruta origen, otra para la ruta destino, y la opción ya que puede darse
 * el caso de que el usuario solo quiera mover un archivo, o un directorio, o copiar uno
 * o el otro
 */
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

/**
 * Esta sentencia hace que se analicen los comandos qur recibe el programa
 * a través de la línea de comandos
 */
yargs.parse();

