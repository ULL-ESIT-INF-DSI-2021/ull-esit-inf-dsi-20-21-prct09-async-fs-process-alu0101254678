import * as fs from 'fs'; // módulo de Node.js para trabajar con el sistema de ficheros
import ncp from 'ncp'; // módulo para copiar directorios
/**
 * Clase FileHandler, que sirve para trabajar con el sistema
 * de ficheros, de forma asíncrona, a través de los callbacks proporcionados
 * por Node.js para trabajar con el sistema de ficheros
 */
export class FileHandler {
  private pathRelative: string;
  
  /**
   * La clase solo tiene un atributo, que representa la ruta
   * relativa, es una cadena de caracteres
   * @param pathParam se inicializa
   */
  constructor(pathParam: string) {
    this.pathRelative = pathParam;
  }

  /**
   * Getter del atributo pathRelative
   * @returns el propio atributo
   */
  getPath() {
    return this.pathRelative;
  }

  /**
   * Setter del atributo path relative
   * @param pathParam una ruta para cambiarle a pathRelative
   */
  setPath(pathParam: string) {
    this.pathRelative = pathParam;
  }

  /**
   * Método que comprueba si el atributo pathRelative es correcto o no
   * @returns verdadero o falso
   */
  isRightPath() {
    if (fs.existsSync(`${__dirname}/${this.pathRelative}`)) {
      return true;
    } else return false;
  }

  /**
   * Método que comprueba si un argumento pasado al método es una ruta
   * correcta o no
   * @param path la ruta que se quiere saber si es correcta o no
   * @returns verdadero o falso
   */
  isRightPathParam(path: string) {
    if (fs.existsSync(`${__dirname}/${path}`)) {
      return true;
    } else return false;
  }

  /**
   * Método que comprueba si se trata de un archivo o directorio, del atributo
   * pathRelative, que puede ser un archivo o un directorio, haciendo uso de lstat()
   * @returns verdadero o falso, o un error
   */
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

  /**
   * Método que sirve para crear un directorio, en este caso se tiene que hace
   * de forma recursiva
   * @returns verdadero, o un error
   */
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

  /**
   * Método que sirve para la lectura de un directorio, haciendo uso de la llama a la
   * función readdi() de node.js
   * @returns verdadero o falso, o un error
   */
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

  /**
   * Método que sirve para leer el contenido de un archivo, pero no sirve
   * cuando son archivos muy grandes, puesto que se almacena en la memoria, en un
   * buffer y puede ser que se llene, no se está tomando la información a trozos
   * @returns verdadero,falso, o un erro
   */
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

  /**
   * Método que sirve para eliminar un directorio o un archivo, si se trata de un directorio, elimina
   * todo su contenido, no importa que no esté vacío, hace uso de la función rm() de nodejs del manejo de
   * ficheros
   * @returns verdadero o falso, o un error
   */
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

  /**
   * Método que sirve para mover o copiar archivos o directorios entre rutas diferentes
   * la ruta origen ya está especificada, y es el atributo en sí, para la copia de directorios
   * se utiliza un paquete que se llama ncp que lo que hace es copiar directorios, por lo tanto
   * realizamos una llamada a esa función, en el caso de que la opción sea 3 o 4, la opción solamente
   * sirve para especificar que operación queremos realizar
   * @param path la ruta destino
   * @param opcion la opción, es un número
   * @returns devuelve verdadero, pero eso no quiere decir que lo devuelva al final, ya que estamos trabajando 
   * de forma asíncrona
   */
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
