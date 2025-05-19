<?php
require_once __DIR__ . '/../entities/Usuario.php';
require_once __DIR__ . '/../Database.php';

class UsuarioDAL {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function crearUsuario(Usuario $usuario) {
        $stmt = $this->db->prepare("INSERT INTO usuarios (nombre, apellido, email, contrasena, rol) 
                                  VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", 
            $usuario->getNombre(),
            $usuario->getApellido(),
            $usuario->getEmail(),
            $usuario->getContrasena(),
            $usuario->getRol()
        );
        return $stmt->execute();
    }
    
    public function obtenerPorEmail($email) {
        $stmt = $this->db->prepare("SELECT * FROM usuarios WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            return new Usuario(
                $row['id_usuario'],
                $row['nombre'],
                $row['apellido'],
                $row['email'],
                $row['contrasena'],
                $row['rol']
            );
        }
        return null;
    }
    
    // Otros métodos como actualizar, eliminar, listar todos, etc.
}
?>