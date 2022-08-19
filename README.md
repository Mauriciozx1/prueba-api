# API SPA Laravel 9 + Vue3
## Sobre Repositorio

Pequeño sistema el cual contiene lo siguiente:
- Atributos de usuarios: name, email, password, birthdate, active
- Se utilizan las marcas de tiempo para: creación, actualizacion y eliminación de usuarios.
- Se incorporan validaciones en formularios del frontend, como validaciones en las solicitudes del backend.
- La lista de usuarios esta compaginada.
- La lista de usuarios se ordena por nombre atravez del local Scope.
- Se utiliza UserRequest para la validación de la data, UserResources para el envio de data y se utiliza ModelBinding en rutas.
- Dentro de la carpeta `public/bootstrap.js` se encuentra el "header" creado para realizar su verificación. Y dentro de `App\Http\Middleware` se encuentra `HeaderMiddleware` que realiza la validación del "header: x-ccloud-auth".

## Requerimientos

- Laravel 9
- PHP 8.1
- Composer
- Apache
- Vue 3

## Contenido 

- Sistema de autentificación
- Gestión de usuarios

## Instalación

- `git clone https://github.com/Mauriciozx1/prueba-api.git`
- `cd prueba-api`
- `composer install`
- `cp .env.example .env`
- Actualizar `.env` y establecer las credenciales de la base de datos
- `php artisan migrate`
- `php artisan db:seed --class=UserSeeder`
- `npm install`
- `npm run dev`
- `php artisan serve`
- Ingresa `http://localhost:8000` con: `email:demoprueba@test.cl y contraseña:password`