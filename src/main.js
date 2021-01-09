import _ from 'lodash'; // Usamos lodash para facilitar la construccion de la tabla
import axios from 'axios'; // Usamos axios para facilitar las llamadas

//ponemos **query** para luego hacer un replace con el parametro de busqueda
let azertiumPrueba = {}; //almacenaremos aqui todas las funciones para exportarlas como modulo
azertiumPrueba.endpoint = 'https://api.github.com/search/repositories?q=**query**%2Blanguage%3Ajavascript&page=1&per_page=10&sort=stars&order=desc';
/**
 * Genera una fila nueva en el componente tabla
 *
 * @param {item} x El item obtenido del endpoint. Tendra que tener name y url.
 */
azertiumPrueba.genRow = (item) => {
    if (item) {
        //definimos los objetos que van a participar en la creacion de la tabla
        let tr = document.createElement('tr');
        let tdNombre = document.createElement('td');
        let tdURL = document.createElement('td');
        //si es .js lo pintamos de azul para probar el mixin 
        if (item.name.indexOf(".js") > -1) {
            tr.className = "is-js";
        }
        //alimentamos con datos
        tdNombre.innerHTML = item.name;
        tdURL.innerHTML = item.url;
        //llenamos el objeto tr 
        tr.appendChild(tdNombre);
        tr.appendChild(tdURL);
        //lo añadimos al tableBody 
        document.getElementById("tableBody").appendChild(tr);
    }
}
/**
 * Realiza la llamada a github.
 * TODO: Promesify la funcion para que los return funcionen correctamente.
 * @param {string} param - El input que ha metido el usuario para realizar la busqueda.
 * @returns {boolean} - Si la llamada falla enviamos false. En caso contrario, true.
 */

azertiumPrueba.call = (param) => {
    //si meten algo que no sea una letra o un numero ocultamos el header 
    if(param.match(/[^A-Za-z0-9]+/g)){
        document.getElementById("table").style.visibility = "hidden";
        return false;
    }
    //hacemos la llamada con axios 
    axios.get(azertiumPrueba.endpoint.replace('**query**', param)).then(response => {
        azertiumPrueba.formatData(response);
        return true;
    }).catch(err =>{
        console.log(err);
        document.getElementById("table").style.visibility = "hidden";
        return false;
    });
}
/**
 * Formatea los datos en la tabla.
 * @param {string} response - La respuesta del servidor. 
 * @returns {boolean} - Si el parametro nos llega incorrecto, devolveremos false.
 */
azertiumPrueba.formatData = (response) => {
    //limpiamos los resultados 
    document.getElementById("tableBody").innerHTML = "";
    if (response && response.data && response.data.items) {
        //rellenamos la tabla
        document.getElementById("table").style.visibility = "visible";

        for (let item of response.data.items) {
            azertiumPrueba.genRow(item);
        }
        return true;
    }
    else{
        document.getElementById("table").style.visibility = "hidden";
        return false; 

    }
}

export default azertiumPrueba; 


