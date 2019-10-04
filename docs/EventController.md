# EventController

El `EventController` es como un sistema de correo. Un componente envía un _evento_ y uno o varios componentes que son _oyentes_ (_listeners_) reciben el evento. Es una implementación del [patrón observer][1].

La ventaja de este sistema es que el componente que envía el _evento_ no necesita la referencia a los demás componentes. Además, para agregar funcionalidad cuando sucede un evento, no es necesario modificar el código existente: simplemente se agrega un _oyente_ a ese evento (cumple con abierto-cerrado).

[1]: https://en.wikipedia.org/wiki/Observer_pattern

## Ejemplo de uso.

```jsx
import React from "react";
import EventController from "../EventController/EventController.js";

class ShowName extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Hugo" };
  }

  componentDidMount() {
    EventController.addListener("name_change", this.onNameChange, this);
  }

  componentWillUnmount() {
    EventController.removeListener("name_change", this.onNameChange);
  }

  onNameChange(event) {
    this.setState({ name: event.name });
  }

  render() {
    return <div>Hola, mi nombre es {this.state.name}.</div>;
  }
}

class ChangeName extends React.Component {
  changeName() {
    EventController.triggerEvent({
      type: "name_change",
      name: "Verónica"
    });
  }

  render() {
    return <button onClick={this.changeName}>Cambiar a Verónica.</button>;
  }
}
```

## API

### EventController.addListener(eventType : string, callback : function, context = null : object)

Cada vez que se produzca un evento del tipo `eventType`, se va a llamar a la función `callback`.

`callback` recibe al objeto `event` (enviado en `triggerEvent`) como argumento.

`context` se usa cuando el `callback` pertenece a una clase o un objeto, para mantener las referencias a `this` dentro de la función. Se puede omitir este argumento.

### EventController.removeListener(eventType : string, callback : function)

Borra la función `callback` de la lista de _listeners_ de eventos de tipo `eventType`. Es importante hacerlo, sino hay memory-leaks.

### EventController.triggerEvent(event : object)

Envía el mensaje de que el evento de tipo `event.type` se produjo.

El objeto `event` se pasa como argumento al `callback` de todos los _listeners_ registrados.

Se puede enviar toda la información que se desee junto con el evento. Por ejemplo:

```javascript
EventController.triggerEvent({
  type: "build_settlement",
  position: [1, 2, 5],
  player: "Juanito",
  color: "red"
});
```

## _Naming-convention_ para los eventos

Los eventos van a ser en minúscula con guión bajo entre palabras. Así podemos cumplir con la [especificación sobre acciones][2] que nos dieron.

```
ACTION = build_settlement | upgrade_city | build_road | move_robber | buy_card
    play_knight_card | play_road_building_card |
    play_monopoly_card | play_year_of_plenty_card |
    end_turn | bank_trade | discard_cards | (roll_dices)
```

[2]: https://docs.google.com/spreadsheets/d/10tRfyxZQ1K853KEcaBvR25k9qo9sGdnkFSxU45IyS6Y/edit#gid=1435240082
