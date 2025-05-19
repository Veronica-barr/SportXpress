<?php
class Database {
    private static $instance = null;
    private $connection;
    
    private $host = 'localhost';
    private $user = 'root';
    private $pass = 'Sol@Nube#123';
    private $dbname = 'carritos_compras';
    
    private function __construct() {
        $this->connection = new mysqli($this->host, $this->user, $this->pass, $this->dbname);
        
        if ($this->connection->connect_error) {
            die("Error de conexión: " . $this->connection->connect_error);
        }
        
        $this->connection->set_charset("utf8mb4");
    }
    
    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    public function closeConnection() {
        if ($this->connection) {
            $this->connection->close();
        }
    }
}
?>