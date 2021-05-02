import 'mocha';
import {expect} from 'chai';
import {FileHandler} from '../../src/ejercicio-4/file-handler';

describe('Tests de la clase Manejador de archivos', () => {
  const objetoFile1: FileHandler = new FileHandler('../../users');
  const objetoFile2: FileHandler = new FileHandler('../../users/yago/Black note.json');

  it('Puede ser instanciado', () => {
    expect(objetoFile1 instanceof FileHandler).to.be.true;
    expect(objetoFile2 instanceof FileHandler).to.be.true;
  });

  it('Se accede al atributo user', () => {
    expect(objetoFile1.getPath()).to.be.eq('../../users');
    expect(objetoFile2.getPath()).to.be.eq('../../users/yago/Black note.json');
  });

  it('Se comprueba que el directorio y el archivo son correctos', () => {
    expect(objetoFile1.isRightPath()).to.be.equal(true);
    expect(objetoFile2.isRightPath()).to.be.equal(true);
  });

  it('Se comprueba que se cambian las rutas del archivo y el directorio correctamente', () => {
    objetoFile1.setPath(`../../users/laura`);
    objetoFile2.setPath(`../../users/yago/Blue Note.json`);

    const rutaArch: string = '../../users/yago/Blue Note.json';
    const rutaDir: string = '../../users/laura';

    expect(objetoFile1.getPath()).to.be.equal(rutaDir);
    expect(objetoFile2.getPath()).to.be.equal(rutaArch);
  });


  it('Se comprueba si existe un directorio o un archivo', () => {
    expect(objetoFile1.isFileDir()).to.be.equal(true);
    expect(objetoFile2.isFileDir()).to.be.equal(true);
  });

  it('Se elimina un directorio correctamente', () => {
    objetoFile1.setPath(`../../users/diego`);
    expect(objetoFile1.deleteFileDir()).to.be.equal(true);
  });

  it('Se crea un directorio correctamente', () => {
    objetoFile1.setPath(`../../users/diego`);
    expect(objetoFile1.createDir()).to.be.equal(true);
  });

  it('Se lee un directorio correctamente', () => {
    objetoFile1.setPath(`../../users/laura`);
    objetoFile2.setPath(`../../users/yago`);
    expect(objetoFile1.readDir()).to.be.equal(true);
    expect(objetoFile2.readDir()).to.be.equal(true);
  });

  it('Se lee un archivo correctamente', () => {
    objetoFile1.setPath(`../../users/yago/Black note.json`);
    objetoFile2.setPath(`../../users/yago/Black note.json`);
    expect(objetoFile2.readFile()).to.be.equal(true);
  });

  it('Se mueven o se copian archivos o directorios correctamente', () => {
    objetoFile1.setPath(`../../users/laura/`);
    const path1: string = `../../users/yago/`;
    objetoFile2.setPath(`../../users/yago/`);

    expect(objetoFile1.moveCopyFileDir(path1, 4)).to.be.equal(true);

    objetoFile1.setPath(`../../users/laura/Black note.json`);
    const path3: string = `../../users/yago/Black note.json`;
    expect(objetoFile1.moveCopyFileDir(path3, 2)).to.be.equal(true);
  });
});
