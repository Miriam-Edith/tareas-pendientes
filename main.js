// ''
// definir las constantes

const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonAgregar = document.querySelector('#botonAgregar');
const check = 'bi-record-circle';
const tachado = 'tachado';
const uncheck = 'bi-circle';
let LIST;
let id;

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{
    weekday: 'long',
    month: 'short',
    day:'numeric',
});
// Función agregar tarea
function agregarTarea(tarea, id, hecho,eliminar){
    if(eliminar){
        return
    }
    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : ''
    const elemento = `<li> 
                    <i id="0" data="hecho" class="bi ${realizado}"></i>
                    <p class="tarea-lista text ${LINE}">Tarea 1</p>
                    <i id="0" data="eliminar" class="bi bi-x"></i>
                </li> `
       lista.insertAdjacentHTML ("beforeend",elemento);
};
function tareaRealizada(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);

    element.parentNode.querySelector('.text').classList.toggle(tachado);
    LIST[element.id].realizado = LIST[element.id].realizado?false :true;
}
function tareaEliminada(element){
    element.parentNode.parentNode.removChild(element.parentNode);
    LIST[element.id].eliminar = true;

};

botonAgregar.addEventListener("click", () => {
    const tarea = input.value;
    if(tarea){
        agregarTarea(tarea, id, false,false)
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false,
        });
        localStorage.setItem("TODO", JSON.stringify (LIST));
        id++;
        input.value = "";
    }
});

lista.addEventListener("click", function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData == "hecho") {
        tareaRealizada(element);
    } else if (elementData == "eliminar"){
        tareaEliminada(element);
    };
    localStorage.setItem("TODO", JASON.stringify(LIST));
});
let data = localStorage.getItem ("TODO");
if (data) {
    LIST = JASON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = {};
    id = 0;
}

function cargarLista(array){
    array.array.forEach( 
        function (item){
        agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);
        }
    )
};