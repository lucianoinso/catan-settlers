# PopupController

Sirve para crear popups al estilo gmail.

## Ejemplo de uso

```jsx
import React from "react";
import PopupController from "../PopupController/PopupController";

.
.
.

PopupController.pushError({ content: `Error al conectarse con el servidor` });

```

## API

### PopupController.pushPopup({ className, content, onClose })

- `className` es un string con el nombre de clase del popup (por ejemplo `className = 'error'` hace que el color de fondo sea rojo).

- `content` puede ser un string o un componente de react, o un elemento jsx.

- `onClose` es opcional, es la función que se llama cuando el usuario/a cierra el popup.

**Return value**: devuelve un `id : int` que sirve para cerrar el popup.

### PopupController.removePopup(id : int)

Elimina el popup con el `id` pasado. No hace nada si no existe ningún popup con ese id.

### PopupController.pushError({ content, onClose })

Equivale a `PopupController.pushPopup({ className: 'error', content, onClose })`

### PopupController.closePopup(id: int)

Cierra el popup. La diferencia con eliminarlo es que hay un fade-out de 0.4s antes de ser eliminado completamente.

> Nota: Esta función nunca fue testeada.

## Notas

- Probablemente haya que revisar el nombre y cambiarlo por algo más lindo. El popup es cuando te aparece una ventanita te tapa todo, esto es más bien un mensaje o algo así.
- Los estilos están en `/src/PopupController/PopupController.css`.
- Se puede abrir más de un popup a la vez.
- Para testear y ver cómo funciona, cambiar el `200` por un `404` en la línea donde dice `axiosMock.onGet(...).reply(200, { ... })` en `Boards.jsx` o en `Resources.jsx`.
