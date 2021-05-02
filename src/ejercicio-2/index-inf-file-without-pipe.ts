import {counts} from './inf-file-without-pipe';
import * as yargs from 'yargs'; 

/**
 * Comando que sirve para mostrar la información estadística de un archivo, lo que 
 * hace es analizar un único argumento, counts, con dos opciones, file, el archivo a analizar
 * y option que representa a la opcion,como un número, luego en el manejador si todo va bien se llama
 * a la función counts()
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
