import React from "react";
import axios from "axios";
import Resource from "./Resource.jsx";
import countResources from "./utils";
import PopupController from "../../PopupController/PopupController.jsx";

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brickAmount: 0,
      woolAmount: 0,
      grainAmount: 0,
      lumberAmount: 0,
      oreAmount: 0
    };
  }

  componentDidMount() {
    const id = 1;

    axios
      .get(`/games/${id}/player`)
      .then(response => {
        const countedResources = countResources(response.data.resources);
        this.setState(countedResources);
      })
      .catch(err => {
        PopupController.pushError({
          content: `Hubo un error al conectarse con el servidor.`
        });
        console.error(err);
      });
  }

  render() {
    return (
      <div className="resourceCards">
        <h4>Cartas de recursos</h4>
        <ul>
          <li>
            <Resource type="brick" amount={this.state.brickAmount} />
          </li>
          <li>
            <Resource type="wool" amount={this.state.woolAmount} />
          </li>
          <li>
            <Resource type="grain" amount={this.state.grainAmount} />
          </li>
          <li>
            <Resource type="lumber" amount={this.state.lumberAmount} />
          </li>
          <li>
            <Resource type="ore" amount={this.state.oreAmount} />
          </li>
        </ul>
      </div>
    );
  }
}

export default Resources;
