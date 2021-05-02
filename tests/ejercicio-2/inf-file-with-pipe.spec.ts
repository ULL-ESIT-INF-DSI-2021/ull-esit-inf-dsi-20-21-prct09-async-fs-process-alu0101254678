import 'mocha';
import {expect} from 'chai';
import {counts} from '../../src/ejercicio-2/inf-file-with-pipe';
import {isRightPathParam} from '../../src/ejercicio-2/inf-file-with-pipe';

describe('Tests de la información del archivo usando pipe', () => {
  const file1: string = '../../typedoc.json';
  const file2: string = '.../../typedoc.json';
  const error = new Error(`El fichero que has especificado es incorrecto!`);

  it('El archivo es correcto', () => {
    expect(isRightPathParam(file1)).to.be.equal(true);
    expect(isRightPathParam(file2)).to.be.equal(false);
  });

  it('Se comprueba la información del archivo', () => {
    expect(counts(file2, 2)).to.be.equal(error.message);
  });  
});
