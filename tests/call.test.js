import  azertiumPrueba  from "../src/main.js";
//Tests no validos actualmente debido a que call llama a una promesa y el return no va a devolver otra cosa que no sea undefined
test('call correcta', () => {
    expect(azertiumPrueba.call('framework')).toBe(true);
  });
test('call incorrecta', () => {
    expect(azertiumPrueba.call('????____....')).toBe(false);
  });