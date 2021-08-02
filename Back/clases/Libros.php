<?php

class Libros{

    private $titulo;
    private $autor;
    private $isbn;

  

    public function getTitulo(){
        return $this->titulo;

    }
    public function getAutor(){
        return $this->autor;
    }
    public function getISBN(){
        return $this->isbn;
    }

    public function setTitulo($titulo){
       $this->titulo=$titulo;
    }
    public function setAutor($autor){
        $this->autor=$autor;
     }
     public function setISBN($isbn){
        $this->isbn=$isbn;
     }

     public static function getAllsBooks(){
      require_once "../db/Database.php";
      $db=new Database();
      $conexion=$db->conectar();
      $query="Select*from libros";
      
      if($consulta=mysqli_query($conexion,$query)){
        
        return $consulta;
      }else{
        return 'fallo';
      }

     }

     public function create(){
         require_once "../db/Database.php";
         $db=new Database();
         $conexion=$db->conectar();
         $query="insert into libros(titulo,autor,isbn) values('{$this->getTitulo()}','{$this->getAutor()}','{$this->getISBN()}')";
          
         $consulta=mysqli_query($conexion,$query);
         if($consulta){
           return true;
         }else{
           return false;
         }

     }
     public function delete(){
        require_once "../db/Database.php";
         $db=new Database();
         $conexion=$db->conectar();
         $query="delete from libros where isbn='{$this->getISBN()}'";
         $consulta=mysqli_query($conexion,$query);
         if($consulta){
           return true;
         }else{
           return false;
         }
     }
     public function update(){
      require_once "../db/Database.php";
      $db=new Database();
      $conexion=$db->conectar();
      $query="update libros set titulo='{$this->getTitulo()}',autor='{$this->getAutor()}' where isbn='{$this->getISBN()}'";
      $consulta=mysqli_query($conexion,$query);
      if($consulta){
        return true;
      }else{
        return false;
      }

     }






}





?>