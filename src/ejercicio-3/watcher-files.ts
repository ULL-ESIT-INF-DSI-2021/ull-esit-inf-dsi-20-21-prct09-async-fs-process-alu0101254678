// import * as fs from 'fs';
import path from 'path';
import {watch} from 'fs';
import * as yargs from 'yargs';

function callback(eventType: 'rename' | 'change', filename: Buffer) {
  if (filename) {
    console.log('El archivo', filename.toString(), 'se ha modificado!');
    console.log('El tipo de cambio del archivo es:', eventType);
  }
}

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
