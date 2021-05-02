import {spawn} from 'child_process';
import * as fs from 'fs';

export function isRightPathParam(path: string) {
  if (fs.existsSync(`${__dirname}/${path}`)) {
    return true;
  } else return false;
}

export function counts(file = '../../typedoc.json', option: number) {
  try {
    if (!isRightPathParam(file)) {
      throw new Error(`El fichero que has especificado es incorrecto!`);
    } else {
      switch (option) {
        case 1:
          const wc1 = spawn('wc', [`${__dirname}/${file}`]);
    
          let wcOutput1 = '';
          wc1.stdout.on('data', (piece) => wcOutput1 += piece);
        
          wc1.on('close', () => {
            const wcOutputAsArray1 = wcOutput1.split(/\s+/);
            console.log(`El archivo ${file} tiene ${wcOutputAsArray1[1]} líneas`);
          });
          break;
        
        case 2:
          const wc2 = spawn('wc', [`${__dirname}/${file}`]);
    
          let wcOutput2 = '';
          wc2.stdout.on('data', (piece) => wcOutput2 += piece);
        
          wc2.on('close', () => {
            const wcOutputAsArray2 = wcOutput2.split(/\s+/);
            console.log(`El archivo ${file} tiene ${wcOutputAsArray2[2]} palabras`);
          });
          break;
    
        case 3:
          const wc3 = spawn('wc', [`${__dirname}/${file}`]);
    
          let wcOutput3 = '';
          wc3.stdout.on('data', (piece) => wcOutput3 += piece);
        
          wc3.on('close', () => {
            const wcOutputAsArray3 = wcOutput3.split(/\s+/);
            console.log(`El archivo ${file} tiene ${wcOutputAsArray3[3]} caracteres`);
          });
          break;
      
        case 4:
          const wc4 = spawn('wc', [`${__dirname}/${file}`]);
    
          let wcOutput4 = '';
          wc4.stdout.on('data', (piece) => wcOutput4 += piece);
        
          wc4.on('close', () => {
            const wcOutputAsArray4 = wcOutput4.split(/\s+/);
            console.log(`El archivo ${file} tiene ${wcOutputAsArray4[1]} líneas`);
            console.log(`El archivo ${file} tiene ${wcOutputAsArray4[2]} palabras`);
            console.log(`El archivo ${file} tiene ${wcOutputAsArray4[3]} caracteres`);
          });
          break;
        default:
          return 'Ha especificado una opción incorrecta';
          break;
      }
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return error.message;
  }
}

// console.log(counts('../../typedoc.json', 4));
