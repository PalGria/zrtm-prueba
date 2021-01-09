import 'bootstrap';
import './index.scss';
import azertiumPrueba from './main.js';
/**
 * Comienza el proceso de llamada a github con el parametro puesto por el usuario
 * En este caso esta definido como window debido a causisticas con webpack.
 * 
 */
window.launchQuery = () => {
    //cogemos la query
    let param = document.getElementById("param").value;
    azertiumPrueba.call(param);
}