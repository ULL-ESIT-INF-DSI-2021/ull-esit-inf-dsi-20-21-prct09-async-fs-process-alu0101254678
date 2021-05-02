// import * as fs from 'fs';
import path from 'path';
import {watch} from 'fs';
import * as yargs from 'yargs';

/**
 * Este es el callback, lo que hace es imprimir si se han producido
 * cambios en el directorio
 * @param eventType el tipo de evento que puede ser rename o change
 * @param filename el nombre del fichero, cuando se elimina del directorio, se añade...
 */
function callback(eventType: 'rename' | 'change', filename: Buffer) {
  if (filename) {
    console.log('El archivo', filename.toString(), 'se ha modificado!');
    console.log('El tipo de cambio del archivo es:', eventType);
  }
}

/**
 * Comando que sirve para observar si se producen cambios en el 
 * directorio del usuario, donde se almacenan las notas, tiene dos opciones
 * obligatorias, user y path
 */
yargs.command({
  command: 'watch',
  describe: 'Observa si ha cambiado un directorio',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    path: {
      describe: 'Ruta donde están los usuarios y sus notas',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.path === 'string') {
      watch(path.resolve(__dirname, argv.path, argv.user), {encoding: 'buffer'}, callback);
      callback;
    }
  },
});

/**
 * Esta sentencia hace que se analicen los argumentos pasados a través de 
 * la línea de comandos
 */
yargs.parse();

/*
const watcher = watch('./', { recursive: true });

watcher.on('change', function(evt, name) {
  // callback
});

watcher.on('error', function(err) {
  // handle error
});

watcher.on('ready', function() {
  // the watcher is ready to respond to changes
});
/*

function watchf(relativePath: string, user: string) {
  fs.watch(path.resolve(__dirname, relativePath, user), {encoding: 'buffer'}, (eventType, filename) => {
    if (filename) {
      console.log('El archivo', filename.toString(), 'se ha modificado!');
      console.log('El tipo de cambio del archivo es:', eventType);
    } else return 'hola';
  });
}
watchf(`../../users`, `yago`);

*/

/*
import {copyFile} from 'fs';

function callback1(err) {
  return 'hola';
}

// destination.txt will be created or overwritten by default.
copyFile('source.txt', 'destination.txt', callback1);

// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL, callback1);
*/
