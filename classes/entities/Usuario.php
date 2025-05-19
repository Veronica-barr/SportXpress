<?php
class Usuario {
    private $id;
    private $nombre;
    private $apellido;
    private $email;
    private $contrasena;
    private $rol;
    
    public function __construct($id, $nombre, $apellido, $email, $contrasena, $rol) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->email = $email;
        $this->contrasena = $contrasena;
        $this->rol = $rol;
    }
    
    // Getters y Setters para cada propiedad
    public function getId() { return $this->id; }
    public function getNombre() { return $this->nombre; }
    public function setNombre($nombre) { $this->nombre = $nombre; }
    // ... otros getters y setters
}
?>