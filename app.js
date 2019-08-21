const grid = new Muuri('.grid',{
    layout: {
        rounding:false
    }
});

window.addEventListener('load', ()=>{
    //Metodo de Muuri pare refrescar el tamaño de los items segun la pagina
    grid.refreshItems().layout();    
    document.getElementById('grid').classList.add('uploaded-image');

    //Traer todos las etiquedas "a" del elemento con id:categories
    const enlaces = document.querySelectorAll('#categories a'); 
    //Hacemos un recorido por los los elementos "a"
    enlaces.forEach((enlace)=>{
        //Agregamos el evento click a los enlaces
        enlace.addEventListener('click', (evento)=>{
            //Quitamos el comportamiento por default de los enlaces
            evento.preventDefault();
            //Elimitando el enlace con la clase active
            enlaces.forEach((enlace)=>enlace.classList.remove('active'));
            //Con target obtenemos el elemento clicleado y le agregamos la clase "activo"
            evento.target.classList.add('active');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categorie]') : grid.filter(`[data-categorie="${categoria}"]`);            
        });
    });

    /*Listener para filtrar por la barra de busqueda*/
    document.querySelector('#search-bar').addEventListener('input', (evento)=>{
        const busqueda = evento.target.value;
        console.log(busqueda);
        grid.filter( (item) => {
            var elementos = item.getElement().dataset.labels;
            return elementos.includes(busqueda);
        });      
    });
});