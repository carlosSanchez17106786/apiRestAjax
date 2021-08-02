<?php
class Database{
   private $db="libros";
   private $user="root";
   private $password="";
   private $host="localhost";

   public function getDB(){
    return $this->db;

   }
   public function getUser(){
    return $this->user;
   }
    public function getPassword(){
    return $this->password;
   }
    public function getHost(){
    return $this->host;
   }

   public function setDB($db){
    $this->db=$db;
   }
   public function setUser($user){
    $this->user=$user;
   }
   public function setPassword($pass){
    $this->password=$pass;
   }
   public function setHost($host){
    $this->host=$host;
   }

   public function conectar(){
     $conexion=mysqli_connect($this->getHost(),$this->getUser(),$this->getPassword(),$this->getDB());
     if($conexion){
       return $conexion;
     }else{
        return "Error de conexion: ".mysqli_connect_errno();
     }
   }
 }
?>