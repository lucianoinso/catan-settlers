class _EventController {
  constructor() {
    this._listeners = [];
  }

  addListener(type, callback, context = null) {
    this._listeners.push({ type, callback, context });
  }

  removeListener(type, callback) {
    for (let i = 0; i < this._listeners.length; i++) {
      const { listenerType, listenerCallback } = this._listeners[i];
      if (listenerType === type && listenerCallback === callback) {
        this._listeners.splice(i, 1);
        return;
      }
    }

    console.error(
      `[EventController] Attempting to remove an unregistered listener of type '${type}'`
    );
  }

  triggerEvent(event) {
    const { type } = event;

    if (type === undefined) {
      console.error(
        `[EventController] Invalid event at triggerEvent: missing type property.`
      );
      return;
    }

    let timesCalled = 0;

    for (const listener of this._listeners) {
      if (listener.type === type) {
        listener.callback.call(listener.context, event);
        timesCalled++;
      }
    }

    if (timesCalled == 0) {
      console.warn(`[EventController] `);
    }
  }
}

const EventController = new _EventController();

export default EventController;
