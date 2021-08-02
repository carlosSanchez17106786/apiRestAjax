//Definicion de las clases
class Libro{
    constructor(titulo,autor,isbn){
    this.titulo=titulo;
    this.autor=autor;
    this.isbn=isbn;
    }
    
    
    }
    
    class UI{
        static mostrarLibros(){
             const libros=Datos.traerLibros();
             libros.forEach((libro) => UI.agregarLibroLista(libro));
    
        }
        static agregarLibroLista(libro){
            const lista=document.querySelector('#libro-list');
            const fila=document.createElement('tr');
    
            fila.innerHTML=`
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            <td><a href="#" class="btn btn-info btn-sm edit">Editar</a></td>
            `;
            lista.appendChild(fila);
    
        }
        static eliminarLibro(el){
         if(el.classList.contains('delete')){
             el.parentElement.parentElement.remove();
              
         }
       
         }
         static modal(e){
            var btn = e;
            var modal = document.getElementById("tvesModal");
            var span = document.getElementsByClassName("close")[0];
            var body = document.getElementsByTagName("body")[0];
    
            modal.style.display = "block";
            body.style.position = "static";
            body.style.height = "100%";
            body.style.overflow = "hidden";
    
            span.onclick = function() {
                modal.style.display = "none";
    
                body.style.position = "inherit";
                body.style.height = "auto";
                body.style.overflow = "visible";
            }     
         
        }
        static closeModal(){
            var modal = document.getElementById("tvesModal");
            var span = document.getElementsByClassName("close")[0];
            var body = document.getElementsByTagName("body")[0];

            modal.style.display = "none";
            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";

        }
        static llenarCampos(isbn){
               var libros = Datos.traerLibros();
               libros.forEach((libro,index)=>{
                if(libro.isbn===isbn){
                   document.getElementById('tituloEdit').value=libro.titulo;
                   document.getElementById('autorEdit').value=libro.autor;
                   document.getElementById('isbnEdit').value=libro.isbn;
   
                }
            });
        }
       
        static mostrarAlerta(mensaje,ClassName,container,before){
            const div=document.createElement('div');
            div.className=`alert alert-${ClassName  }`;
            div.appendChild(document.createTextNode(mensaje));
    
            const contenedor=document.querySelector(container);
            const formulario=document.querySelector(before);
            contenedor.insertBefore(div,formulario);
    
            setTimeout(()=>document.querySelector('.alert').remove(), 3000);
        }
        static limpiarCampos(){
         document.querySelector('#titulo').value='';   
         document.querySelector('#autor').value='';
         document.querySelector('#isbn').value='';
        }
    }
    
    class Datos{
         static traerLibros(){
             let libros;
             
             if (localStorage.getItem('libros')===null) {
                 libros=[];
             }else{
                 libros= JSON.parse(localStorage.getItem('libros'));
             }
             return libros;
         }
         static agregarLibro(libro){
             const libros = Datos.traerLibros();
             libros.push(libro);
             localStorage.setItem('libros', JSON.stringify(libros));
             
    
         }
         static removerLibro(isbn){
             const libros= Datos.traerLibros();
             libros.forEach((libro,index)=>{
                 if(libro.isbn===isbn){
                     libros.splice(index,1);
                 }
             });
             localStorage.setItem('libros',JSON.stringify(libros));
         }
         static editarLibro(libroE){
            let isbn=libroE.isbn;
            const libros= Datos.traerLibros();
            console.log(libros);
            libros.forEach((libro,index)=>{
                if(libro.isbn===isbn){
                 libros[index]=libroE;
                }
            });
            localStorage.setItem('libros',JSON.stringify(libros));
         }
    }

    class Api{

        static crear(libro){
            axios({
              method:'POST',
              url: '../Back/api/libros.php',
              responseType:'json',
              data:libro
            }).then(res=>{
             console.log(res.data);
       

            }).catch(error=>{
                console.error(error);
            });
           
        }
        static borrar(isbn){
            axios({
                method:'DELETE',
                url: `../Back/api/libros.php?isbn=${isbn}`,
                responseType:'json'
              }).then(res=>{
               console.log(res.data);
         
              }).catch(error=>{
                  console.error(error);
           
              });
        }
        static editar(libroE){
            axios({
                method:'PUT',
                url: `../Back/api/libros.php?isbn=${libroE.isbn}`,
                responseType:'json',
                data:libroE
              }).then(res=>{
               console.log(res.data);
           
               UI.closeModal();
               UI.mostrarAlerta('Libro editado correctamente','success','.container','#libro-form');
             
         
              }).catch(error=>{
                  console.error(error);
           
              });
        }

  
    }
    
    //Carga de la pagina(Evento de la pagina)
    document.addEventListener('DOMContentLoaded',()=>{
        UI.mostrarLibros();
    });
    
    //Controla Evento Submit
    document.querySelector('#libro-form').addEventListener('submit',(e)=>{
        e.preventDefault();
    //Obtener valores de los campos
        const titulo=document.querySelector('#titulo').value;
        const autor=document.querySelector('#autor').value;
        const isbn=document.querySelector('#isbn').value;
    
        if(titulo===''||autor===''||isbn===''){
          UI.mostrarAlerta('Por favor completar todos los campos','danger','.container','#libro-form');
    
       }else{
           const libro= new Libro(titulo,autor,isbn);
           Datos.agregarLibro(libro);
           UI.agregarLibroLista(libro);
           UI.mostrarAlerta('Libro Agregado a la Coleccion','success','.container','#libro-form');
           UI.limpiarCampos();
           Api.crear(libro);
    
       }
    });
    
    document.querySelector('#libro-list').addEventListener('click', (e) => {
        if(e.target.classList.contains('delete')){
            UI.eliminarLibro(e.target);
            Api.borrar(e.target.parentElement.previousElementSibling.textContent);
            Datos.removerLibro(e.target.parentElement.previousElementSibling.textContent);
            UI.mostrarAlerta('Libro Eliminado Exitosamente','success','.container','#libro-form');
        }else if(e.target.classList.contains('edit')){
      
    
            var btn = e.target;
            var isbn=e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
            console.log(isbn);
            UI.modal(btn);
            UI.llenarCampos(isbn);
        }
    });

    document.querySelector('#libro-form-edit').addEventListener('submit',(e)=>{
        e.preventDefault();

        const tituloE=document.querySelector('#tituloEdit').value;
        const autorE=document.querySelector('#autorEdit').value;
        const isbnE=document.querySelector('#isbnEdit').value;

        if(tituloE===''||autorE===''||isbnE===''){
            UI.mostrarAlerta('Por favor completar todos los campos','danger','.modal-content','#libro-form-edit');
      
         }else{
             const libroEdit= new Libro(tituloE,autorE,isbnE);
             Api.editar(libroEdit);
             Datos.editarLibro(libroEdit);
            
         }

    }); 

    