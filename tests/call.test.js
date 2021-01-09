import { azertiumPrueba } from "../src/index.js";;

test('call correcta', () => {
    expect(azertiumPrueba.call('framework')).toBe(true);
  });