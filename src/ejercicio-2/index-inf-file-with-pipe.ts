import {counts} from './inf-file-with-pipe';
import * as yargs from 'yargs'; 

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

yargs.parse();
