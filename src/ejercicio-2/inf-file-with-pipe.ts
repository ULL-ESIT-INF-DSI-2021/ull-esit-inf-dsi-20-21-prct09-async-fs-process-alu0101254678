import {spawn} from 'child_process';
import * as fs from 'fs';

export function isRightPathParam(path: string) {
  if (fs.existsSync(`${__dirname}/${path}`)) {
    return true;
  } else return false;
}

export function counts(file: string, opcion: number) {
  try {
    if (!isRightPathParam(file)) {
      throw new Error(`El fichero que has especificado es incorrecto!`);
    } else {
      switch (opcion) {
        case 1:
          console.log(`Se va a contar el número de líneas del fichero ${file}: `);
          const wc1 = spawn('wc', ['-l', `${__dirname}/${file}`]);
          wc1.stdout.pipe(process.stdout);
          break;
      
        case 2:
          console.log(`Se va a contar el número de palabras del fichero ${file}: `);
          const wc2 = spawn('wc', ['-w', `${__dirname}/${file}`]);
          wc2.stdout.pipe(process.stdout);
          break;
  
        case 3:
          console.log(`Se va a contar el número de caracteres del fichero ${file}: `);
          const wc3 = spawn('wc', ['-m', `${__dirname}/${file}`]);
          wc3.stdout.pipe(process.stdout);
          break;
        
        case 4:
          console.log(`Se va a mostrar la información del fichero (número de líneas, palabras y caracteres) ${file}: `);
          const wcl = spawn('wc', ['-l', `${__dirname}/${file}`]);
          const wcw = spawn('wc', ['-w', `${__dirname}/${file}`]);
          const wcm = spawn('wc', ['-m', `${__dirname}/${file}`]);
  
          wcl.stdout.pipe(process.stdout);
          wcw.stdout.pipe(process.stdout);
          wcm.stdout.pipe(process.stdout);
          break;
  
        default:
          break;
      }
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return error.message;
  }
}

// counts(`../../typedoc.json`, 4);
