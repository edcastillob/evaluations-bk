# Documentación de la API

## Introducción

1. **Configuración del Entorno**:
    - Configura la variable de entorno para la conexión a la base de datos usando la variable `MONGO_URI`.
    - Para iniciar el servidor, ve al directorio backend, instala las dependencias con `npm i` y ejecuta `npm start`.
    - El puerto utilizado es el 8080
   ## Agregar variables de entorno .env
    ```bash
    MONGO_URI=mongodb://127.0.0.1:27017/dbname
    PORT=8080
    HASH_SALT=12
    JWT_SECRET="clave_secreta"
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    CLOUDINARY_URL=```

## Excepciones
### Manejos de ``exepciones`` personalizadas
### Request CustomException
```bash
import { createCustomException } from '../exceptions/custom-exception';

if (userExists)  {
	throw createCustomException('User already exists', 409);
}
```
### Response CustomException
```bash
{
    "timestamps": "2024-08-29T01:13:59.947Z",
    "method": "POST",
    "path": "/api/auth/register",
    "error": {
        "message": "User already exists",
        "error": "Conflict Request",
        "statusCode": 409
    }
}
```
## Estructura de la API

1. **Modelos de mongoose**:

    - Comunication
    - Evaluation
    - User
    - Feedback

2. **Controladores**:
    - Varios controladores manejan operaciones de crear, leer, actualizar y eliminar para usuarios, feedback, Evaluation

## Endpoints
### Autenticacion
-   **POST** `/api/auth/register`: Registar un nuevo usuario.
-   **POST** `/api/auth/login`: Iniciar session con un usuario.
### Estadistica
-   **POST** `/api/stats`: Obtener estadisticas

### User
-   **GET** `/api/employees`: Obtener todos los usuarios con role de empleados
-   **GET** `/api/user`: Obtener lista de usuarios
-   **GET** `/api/user/:userId`: Obtener usuario por ID
-   **GET** `/api/reports/employee/:userId`: Genera reporte de evaluacion para un empleado
-   **GET** `/api/user/role/:role`: Obtener usuario por role
-   **PUT** `/api/user/:userId`: Editar usuario por ID.
-   **PUT** `/api/user/image/:userId`: Editar la imagen del usuario.

### Evaluation
-   **POST** `/api/evaluation`: Crear una evaluacion.
-   **GET** `/api/evaluation/evaluationId`: Obtener una evaluación por ID.
-   **GET** `/api/evaluation/employees/:employeeId`: Obtener evaluaciones de un empleados.
-   **GET** `/api/evaluation/evaluator/:evaluatorId`: Obtener detalles de una evaluacion por ID.
-   **PUT** `/api/evaluation/:evaluationId`: Actualizar una evaluacion.
-   **DELETE** `/api/evaluation/:evaluationId`: Eliminar una evaluacion.

### Feedback
-   **GET** `/api/feedback`: Enviar feedback para una evalucaion.
-   **DELETE** `/api/feedback/:feedbackId`: Elimina un feedback.
