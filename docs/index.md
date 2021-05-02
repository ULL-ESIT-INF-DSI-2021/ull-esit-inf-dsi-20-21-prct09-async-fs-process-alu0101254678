# __Desarrollo de Sistemas Informáticos__
## __Práctica 9 - Sistema de Ficheros y Creación de Procesos en Node.js__
## __Yago Pérez Molanes (alu0101254678@ull.edu.es)__
__*Contenidos del informe*__

__*Pasos realizados para el desarrollo de la práctica*__

* Algunas tareas a realizar previamente: 
  * Aceptar la tarea asignada a [GitHub Classroom](https://classroom.github.com/assignment-invitations/86449c6e8761262c57246a986902a9e8/status)
  * En esta práctica tendremos que familiarizarnos con la [API de node.js para interactuar con el sistema de ficheros](https://nodejs.org/dist/latest/docs/api/fs.html#fs_callback_api)
  * También trabajaremos con la creación de procesos, así que tendremos que echarle un vistazo a la [API asíncrona proporcionada por Node.js para crear procesos](https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_asynchronous_process_creatio), y, en concreto, con la función [spawn](https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_child_process_spawn_command_args_options).

## __Introducción y Objetivos__
En esta práctica deberemos resolver una serie de ejercicios relacionados con el uso de las APIs que nos da Node.js para interactuar con el 
sistema de ficheros, así como para crear procesos. En la estructura de la práctica por cada ejercicio se tiene un directorio, y dentro los archivos
de código fuente.

Comentaremos la solución propuesta para estos ejercicios, y además trataremos aspectos como las GitHub Actions.

## **Ejercicio 1**
En este ejercicio tenemos que comentar la ejecución de un programa que hace uso de la API de node.js para manejar ficheros, en este caso, asíncronamente.
Este es el código propuesto:

```TypeScript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
Entonces, pueden surgir distintas situaciones, por un lado, que el usuario no introduzca ningún archivo, en este caso ocurriría lo siguiente:
1.  Se ejecuta la función principal main()..., después de introducirse en la pila de llamadas.
2.  Se comprueba cuántos argumentos se le ha pasado al programa, en este caso dos, el del comando y la ruta al programa ejecutable.
3.  Como es distinto de tres, entonces, ejecuta la función console.log(), que imprime en la pantalla un mensaje, habiéndose introducido esta
    función previamente en la pila de llamadas.
4.  Finaliza la ejecución de console.log, y por lo tanto de main(), ya que no tiene nada más que ejecutar y se sale del programa.

La segunda situación es que el usuario introduzca un fichero que no es válido, entonces en este caso ocurrirá que si entrará en la sentencia 
condicional if(), sin embargo, ahora se llama a una función proporcionada, por la API de node.js, que comprueba el estado de un fichero, entonces
ésta se introduce en la API de node.js, independientemente de la función principal, y se ejecuta lo que haya en su interior, en este caso, tenemos
otra sentencia condicional if, else, en cuyo caso, entra en el if, muestra un mensaje en la consola, y finaliza porque ya no tiene nada más que hacer.

La última situación es que el usuario haya escrito un nombre de cualquier archivo, y que además éste sea válido, en cuyo caso, ocurre lo siguiente:
1.  Se introduce la función principal en la pila de llamadas, main().
2.  Se ejecuta el else, y se asigna a una variableel nombre del archivo,que es el propio argumento pasado desde la líne de comandos.
3.  Se llama a una función proporcionada por la API, entonces se pasa a la API de node.js la función acces().
4.  Dentro de acces, se invoca a la función watch que lo que hace es observar si se producen cambios en un archivo, esto dentro de la API de nodejs.
5.  Se muestran los dos mensajes por la consola, primero el *Starting to watch...* y después, *File is no longer watched*.
6.  Nos queda el main, y el watcher file, pero, se van a quedar ahí, ejecutándose hasta que se haga un cambio en dicho archivo, en cuyo caso se dispara
    el evento en la cola de callbacks ante un cambio provisto en el archivo.

## **Ejercicio 2**
En este ejercicio hemos de implementar dos soluciones para un mismo problema, tenemos que escribir una aplicación que cuente el número de líneas
palabras o caracteres que contiene un fichero de texto, a través de dos formas:

1.  A través del método pipe de un Stream para poder redirigir la salida de un comando hacia otro.
2.  Sin hacer uso del método pipe, solamente creando los subprocesos necesarios y registrando manejadores a aquellos eventos 
    necesarios para implementarlo.

Vamos a comentar la primera solución:
```Typescript
export function isRightPathParam(path: string) {
  if (fs.existsSync(`${__dirname}/${path}`)) {
    return true;
  } else return false;
}
```
En primer lugar, disponemos de una función que averigua si la ruta a un fichero es válida o no, éste es la única llamada que hacemos a la API síncrona
de node.js para que nos retorne un valor boolenado, además en el parámetro la ruta es absoluta.

Una vez sabemos si es un archivo válido o no, pasamos a la ejecución de la siguiente función, que hemos llamado counts():

```TypeScript
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
      
```
La función recibe dos parámetros, uno que indica el archivo, y el otro es una opción puesto que el usuario puede elegir si quiere visualizar
el número de líneas, de palabras o de caracteres del archivo que desea analizar o ambas, entonces disponemos de cuatro opciones, y un switch para
manejarlas.

Aquí entramos en la parte interesanete, si es una de las opciones, se muestra un mensaje en pantalla, y se crea un subproceso, con la llamada a la
función spawn con el objeto de ejecutar un comando del sistema operativo, sin embargo, su salida la redirigimos, a través de pipe, y la traspasamos
al proceso principal para que se muestre por pantalla, y terminamos con un break.

Comentamos la segunda solución:

```TypeScript
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
```
En este caso, no estamos haciendo uso de pipes, sino de eventos que manejamos, en este caso, con el evento close(), que lo que indica
es que se ha terminado de ejecutar el comando que hemos registrado en wc1, es lo mismo que el anterior, pero no redirigmos la salida, sino
que la manejamos adecuadamente, y el evento más apropiedo es close, luego también formateamos la salida para que quede presentable, además
la salida del comando, los datos, también se está reaccionando a este evento, porque la esencia es que spawn es uns subclase de eventemitter, lo que
permite manejarse con eventos.

## **Ejercicio 3**
En este ejercicio hemos de basarnos en la aplicación de notas de la práctica [anterior](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0101254678.git), ya que hemos de desarrollar una aplicación que reciba el nombre
de un usuario y la ruta donde se encuentran los directorios de las notas de los usuarios, para permitir controlar si se realizan cambios
en alguno de los ficheros.

Es decir, que cuando se agrege, se modifique o se elimine una nota, la aplicación reaccionará adecuadamente. Para ello, hemos de utilizar la
función watch, que devuelve un objeto Watcher, es decir un observador, con el que podemos manejar eventos ya que deriva de EventEmitter.

El paso de parámetros se hará a través de yargs, como hicimos en la anterior práctica, además aún no lo hemos comentado, pero estamos tratando de
controlar todos los posibles errores potenciales que puedan surgir.

```TypeScript
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
```
En la aplicación como comentábamos procesamos los argumentos a través de yargs, y disponemos al usuario un comando watch, con dos opciones obligatorias,
user y path, usuario y ruta, respectivamente, y en este punto si se cumplen los requisitos llamamos a la función watch.

```TypeScript
function callback(eventType: 'rename' | 'change', filename: Buffer) {
  if (filename) {
    console.log('El archivo', filename.toString(), 'se ha modificado!');
    console.log('El tipo de cambio del archivo es:', eventType);
  }
}
```
En este punto manejamos un callback, en el que estamos controlando los eventos que puedan surgir, que en este caso son dos, o un archivo se renombra, como
por ejemplo cuando se añade una nota, o se cambia, por ejemplo, cuando se modifica, y se lo informamos al usuario.

EventType es el tipo de evento, y filename es el nombre del archivo que estamos analizando, sin embargo, lo que ocurre es que hemos de usar el
método *toString()*, ya que los datos por defecto son de tipo *buffer*.

## **Ejercicio 4**
En este ejercicio se plantean un serie de problemas relacionados con el sistema de ficheros, y en todos ellos debemos hacer uso de las funciones
asíncronas del sistema de ficheros de la API de node.js.

Estos son los ejercicios propuestos (la aplicación permite hacer de wrapper entre los distintos comandos empleados el Linux para el manejo de 
ficheros y directorios):

1.  Dada una ruta concreta, mostrar si es un directorio o un fichero.
2.  Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro.
3.  Listar los ficheros dentro de un directorio.
4.  Mostrar el contenido de un fichero (similar a ejecutar el comando cat).
5.  Borrar ficheros y directorios.
6.  Mover y copiar ficheros y/o directorios de una ruta a otra. Para este caso, la aplicación recibirá una ruta origen y una ruta destino.

Para interactuar con la aplicación a través de la líena de comandos podemos hacer uso del módulo *yargs*.

Para la resolución del ejercicio, hemos creado una clase que se llama *file-handler*, que solo tiene un atributo,*pathRelative*, y es la ruta con la que el 
usuario está trabajando en ese momento, luego tenemos un *getter()* y un *setter()* que retornan o modifican este atributo, puesto que es privado.

Luego, disponemos del siguiente método, que ya hemos usado en ejercicios anteriores:

```TypeScript
  isRightPath() {
    if (fs.existsSync(`${__dirname}/${this.pathRelative}`)) {
      return true;
    } else return false;
  }
```
Lo hacemos así porque tenemos que controlar que realmente existan las rutas para los ficheros o los directorios.

Para cada uno de los apartados anteriores, tenemos métodos que al final retornan verdadero o falso, para después poder hacer los tests.
A continuación, mostramos las llamadas a las funciones asíncronas por cada uno de los ejercicios planteados:

1.  Dada una ruta concreta, mostrar si es un directorio o un fichero:

```TypeScript
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
```
La función lstat obtiene el estado de un archivo o un directorio, lo que nos sirve a la hora de averiguar el tipo, a través del parámetro
stats, que tiene un serie de funciones, las que necesitamos son dos, *isFile()* y *isDirectory()*.

2.  Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro:

```TypeScript
fs.mkdir(`${__dirname}/${this.pathRelative}`, {recursive: true}, (err) => {
    if (err) {
      throw new Error(`Ha habido un problema con ${this.pathRelative}`);
    } else {
      console.log(`El directorio ${this.pathRelative} se ha creado correctamente`);
    }
  });
} catch (error) {
```
Es similar realmente a ejecutar un comando *mkdir*, en una terminal cualquiera de Linux, de hecho, la función a la API tiene el mismo nombre, 
y recibe como parámetros el nombre del directorio, una serie de opciones, y un callback para manejar los posibles errores que puedan suceder, 
ya que recordemos que ningúna función está exenta de errores.

3.  Listar los ficheros dentro de un directorio.

```TypeScript
try {
  fs.readdir(`${__dirname}/${this.pathRelative}`, (err, archivos) => {
    if (err) {
      throw new Error(`Ha habido un problema con ${this.pathRelative}`);
    }
    console.log(archivos);
  });
  } catch (error) {
```
Con la función readdir estamos leyendo los archivos que se encuentran en el interior de un directorio que le especificamos a la función, entonces
lee de forma asíncrona el directorio, y en archivos, se encuentra la lista de ficheros que ha encontrado, es un vector de strings.

4.  Mostrar el contenido de un fichero.

```TypeScript
try {
  fs.readFile(`${__dirname}/${this.pathRelative}`, (err, data) => {
    if (err) {
      throw new Error(`Ha habido un problema con ${this.pathRelative}`);
    } else {
      console.log(data.toString());
    }
  });
```
En este caso hemos de mostrar por pantalla el contenido del fichero, sin embargo, esta implementación solo funciona cuando el tamaño del archivo
no es muy grande, ya que en data se almacenan los datos, pero es de tipo buffer y se almacena en la memoria, y si el archivo es demasiado grande
no lo va a poder leer, sin embargo, para está práctica nos sirve, ya que no estamos trabajando con archivos de gran tamaño.

5.  Borrar ficheros y directorios

```TypeScript
try {
  fs.rm(`${__dirname}/${this.pathRelative}`, {recursive: true, force: true}, (err) => {
    if (err) {
      throw new Error(`Ha habido un problema con ${this.pathRelative}`);
    } else {
      console.log(`Se ha borrado ${__dirname}/${this.pathRelative}`);
    }
  });
```
Esta es una de las operaciones más sensibles, puesto que estamos borrando archivos y directorios de forma asíncrona con la llamada a la función rm,
sin embargo, al tratarse de directorios, hemos de usar las opciones *recursive* y *force* para que elimine el contenido dentro del directorio, sino
nos va a dar un error, ya que solo permite borrar directorios vacíos.

6.  Mover o copiar archivos y directorios.

```TypeScript
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
```
En este caso manejamos varias opciones, y la función unicamente va a recibir un parámetro, porque el otro es implícito, es un atributo
de la clase, una de las rutas, que es la que usamos como ruta origen, y la ruta destino es la que se le pasa a la función.
Cabe destacar que para mover un archivo o mover un directorio, lo que hacemos es copiarlo primero y luego borrarlo de la ruta origen.

Por último, para mover directorios y copiarlos, hemos hecho uso de un módulo adicional que sirve para copiar directorios, [ncp](https://www.npmjs.com/package/ncp).

## **Ejemplos de uso de la aplicación**
### **Ejercicio - 2**

### **Ejercicio - 3**

### **Ejercicio - 4**

## **Conclusiones**

## **Bibliografía**


