# ppl_login

SPA que servirá para:
* Login
* Registro estudiantes
* Registro profesores
* Dashboard de aplicaciones del sistema

## Correr en development
1. Correr el servidor de la API
```sh
npm install
```
```sh
npm run dev
```
2. Correr el cliente
```sh
cd client/login && npm install && npm run serve
```
## Base de datos
Se debe tener corriendo el servicio de mongo
```sh
cd api/config/db
node populateDevDB.js
```