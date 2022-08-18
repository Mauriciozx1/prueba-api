# Laravel 9.0
## Sobre Repositorio

Pequeño sistema el cual contiene lo siguiente:
- Atributos de usuarios: name, email, password, birthdate, active
- Se utilizan las marcas de tiempo para: creación, actualizacion y eliminación de usuarios.
- Se incorporan validaciones en formularios del frontend, como validaciones en las solicitudes del backend.
- La lista de usuarios esta compaginada.
- La lista de usuarios se ordena por nombre atravez del local Scope.
- Se utilizan FormRequest para la validación de la data, ApiResources para el envio de data y Model Binding en las rutas.
- Dentro de la carpeta public/bootstrap.js se encuentra el "header" creado para realizar su verificación. Y dentro de App\Http\Middleware se encuentra la validación del "header".

## Requerimientos

- Laravel 9                                                                  8
- PHP 8.1.6
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
- Si se desea poblar la tabla Users, ejecutar `php artisan db:seed --class=UserSeeder`
- `npm install`
- `npm run dev`
- `php artisan serve`
- Listo