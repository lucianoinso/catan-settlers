import React from "react";
import Popup from "./Popup.jsx";
import "./PopupController.css";

class PopupController extends React.Component {
  constructor(props) {
    super(props);
    this.state = { popups: [] };
  }

  static _instance = null;

  componentDidMount() {
    PopupController._instance = this;
  }

  componentWillUnmount() {
    PopupController._instance = null;
  }

  static _lastPopupId = -1;

  static pushPopup({ className, content, onClose, autoClose }) {
    const instance = PopupController._instance;

    if (!instance) {
      console.warn("PopupController is not initialized yet");
      return;
    }

    const popupId = ++PopupController._lastPopupId;

    instance.state.popups.push(
      <Popup
        className={className}
        content={content}
        onClose={onClose}
        autoClose={autoClose}
        id={popupId}
        key={popupId}
      />
    );

    // Force re-render.
    instance.setState({ popups: instance.state.popups });

    return popupId;
  }

  static removePopup(id) {
    const instance = PopupController._instance;
    instance.setState({
      popups: instance.state.popups.filter(popup => popup.props.id !== id)
    });
  }

  static closePopup(id) {
    for (const popup of PopupController._instance.state.popups) {
      if (popup.props.id === id) {
        popup.close();
        return;
      }
    }
  }

  static pushError({ content, onClose }) {
    return PopupController.pushPopup({ className: "error", content, onClose });
  }

  static pushLog({ content, onClose, autoClose }) {
    return PopupController.pushPopup({
      className: "log",
      content,
      onClose,
      autoClose: autoClose || 4500
    });
  }

  render() {
    return <div id="popup-controller">{this.state.popups}</div>;
  }
}

export default PopupController;
