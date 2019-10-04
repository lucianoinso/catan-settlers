import React from "react";
import "./PopupController.css";

class PopupController extends React.Component {
  static instance = null;

  constructor(props) {
    super(props);
    this.state = {
      title: "Popup",
      content: <div></div>,
      hidden: true,
      type: "none",
      onClose: null
    };
  }

  componentDidMount() {
    if (PopupController.instance !== null) {
      console.error(
        `[PopupController] cannot have two instances of <PopupController /> in the document!`
      );
      return;
    }
    PopupController.instance = this;
  }

  componentWillUnmount() {
    PopupController.instance = null;
  }

  static showError(content, onClose) {
    PopupController.instance.showError(content, onClose);
  }

  static close() {
    PopupController.instance.close();
  }

  showError(content, onClose = this.state.onClose) {
    this.setState({
      content,
      title: "Error",
      type: "error",
      onClose,
      hidden: false
    });
  }

  close() {
    this.setState({
      hidden: true
    });

    if (this.state.onClose !== null) {
      this.state.onClose();
    }
  }

  render() {
    return (
      <div
        id="popup"
        className={this.state.hidden ? `hidden` : this.state.type}
      >
        <h2>{this.state.title}</h2>
        <div>{this.state.content}</div>
        <button onClick={this.close.bind(this)}>Ok</button>
      </div>
    );
  }
}

export default PopupController;
