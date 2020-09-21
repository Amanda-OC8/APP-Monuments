# APP-Monuments
App de monumentos de la ciudad de Madrid
 Method |Path | Descripction 
--- | --- | ---
GET| / | Índice  
GET| /login | Registro 
POST| /login | Registro 
GET | /signup | Iniciar sesión 
POST| /signup | Iniciar sesión 
GET | logout | Cerrar sesión 
GET | /profile | Perfil usuario 
GET | /profile/personal-data | Ver datos personales 
POST | /profile/personal-data/edit | Editar datos personales 
GET | /profile/personal-monuments | Ver monumentos guardados 
POST | /profile/personal-monuments/edit | Editar monumentos guardados 
GET | /profile/personal-monuments/delete/:id | Eliminar un monumento guardado 
GET | /profile/personal-activities | Ver tus actividades creadas 
POST | /profile/personal-activities/edit | Editar tus actividades creadas 
GET | /profile/personal-activities/delete/:id | Eliminar una de tus actividades creadas 
GET | /monuments | Monumentos 
GET | /monuments/:id | Ver detalles del monumento 
GET | /activities | Actividades 
GET | /activities/:id| Detalle actividad 
GET | /activities/delete/:id| Elimina actividad 
POST | /activities/edit/:id| Edita la actividad 
POST | /activities/new| Nueva actividad 

