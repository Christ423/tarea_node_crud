const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Configurar conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario', // Reemplaza con tu usuario de MySQL
    password: 'tu_contraseña', // Reemplaza con tu contraseña de MySQL
    database: 'tu_base_de_datos' // Reemplaza con tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa.');
});

// Ruta para mostrar la tabla de estudiantes
app.get('/estudiantes', (req, res) => {
    db.query('SELECT * FROM estudiantes', (err, results) => {
        if (err) {
            return res.status(500).send('Error en la consulta');
        }

        // HTML combinado
        let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Estudiantes</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 800px;
                    margin: auto;
                    background: white;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    text-align: center;
                    color: #333;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                th, td {
                    padding: 10px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #4CAF50;
                    color: white;
                }
                tr:hover {
                    background-color: #f1f1f1;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Lista de Estudiantes</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Curso</th>
                            <th>Fecha de Creación</th>
                        </tr>
                    </thead>
                    <tbody>`;

        // Agregar estudiantes a la tabla
        results.forEach(estudiante => {
            html += `
                <tr>
                    <td>${estudiante.id_estudiante}</td>
                    <td>${estudiante.nombre_alumno}</td>
                    <td>${estudiante.email_alumno}</td>
                    <td>${estudiante.curso_alumno}</td>
                    <td>${estudiante.created_at}</td>
                </tr>`;
        });

        html += `
                    </tbody>
                </table>
            </div>
        </body>
        </html>`;

        res.send(html); // Enviar el HTML como respuesta
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
