import {counts} from './inf-file-with-pipe';
import * as yargs from 'yargs'; 

/**
 * Comando que sirve para mostrar la información estadística de un archivo, el comando 
 * se llama counts, y tiene dos opciones una de ellas es un string, y la otra es un número, y leugo
 * un manejador, que maneja su lógica, y básicamente, llama a counts().
 */
yargs.command({
  command: 'counts',
  describe: 'Muestra información estadística del fichero',
  builder: {
    file: {
      describe: 'Archivo a analizar',
      demandOption: true,
      type: 'string',
    },
    option: {
      describe: 'Opción-1: Cuenta el número de líneas, Opción-2: Cuenta el número de palabras, Opción-3: Cuenta el número de caracteres, Opción-4: Cuenta todo,',
      demandOption: true,
      type: 'number',
    },
    
  },
  handler(argv) {
    if (typeof argv.file === 'string' && typeof argv.option === 'number') {
      counts(argv.file, argv.option);
    }
  },
});

/**
 * Esta sentencia hace que se analicen los argumentos pasados 
 * a través de la línea de comandos
 */
yargs.parse();
