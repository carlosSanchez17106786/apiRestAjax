<?php 
    header("Content-Type: application/json");
  
    switch($_SERVER['REQUEST_METHOD']){

         case 'POST':
    

            require_once "../clases/Libros.php";

            $_POST= json_decode(file_get_contents('php://input'),true);
            $titulo=$_POST['titulo'];
            $autor=$_POST['autor'];
            $isbn=$_POST['isbn'];
            $libro=new Libros();
            $libro->setTitulo($titulo);
            $libro->setAutor($autor);
            $libro->setISBN($isbn);

            $libro->create();
         
            
            echo json_encode($_POST);

            
         break;
         case 'GET':

            if(isset($_GET['id'])){
                $resultado['mensaje']='Retornar el usuario con el id '.$_GET['id'];
                echo json_encode($resultado);
               

            }else{
               require_once "../clases/Libros.php";
                $libros=Libros::getAllsBooks();
                while($libro=mysqli_fetch_assoc($libros)){
                     $books[]=$libro;
               
                }



                $resultado['mensaje']='Retornar todos los libros, la info es: '.json_encode($books);
               echo json_encode($resultado);


            }
            
         break;
         case 'PUT':
            require_once "../clases/Libros.php";
            $_PUT= json_decode(file_get_contents('php://input'),true);
            $titulo=$_PUT['titulo'];
            $autor=$_PUT['autor'];
            $isbn=$_PUT['isbn'];

            
            


         
             $libro=new Libros();        
             $libro->setTitulo($titulo);
             $libro->setAutor($autor);
             $libro->setISBN($isbn);      
             
            if( $libro->update()){
               $resultado["mensaje"]="El libro fue actualizado correctamente";
                           
            }else{
               $resultado["mensaje"]="Error al actualizar el libro llamado ".$titulo." Del autor: ".$autor;
            }

             echo json_encode($resultado);                     
         break; 
         case 'DELETE':
         

            require_once "../clases/Libros.php";

            $libro=new Libros();
            $libro->setISBN($_GET['isbn']);

            if($libro->delete()){
   
               $resultado["mensaje"]="Eliminar un usuario con el isbn ".$_GET['isbn'];
            }else{
                  
                $resultado["mensaje"]="error al insertar";
            }
         
         
            echo json_encode($resultado);

            
         break;  

    }
   



?>