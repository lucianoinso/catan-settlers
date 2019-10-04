import React from "react";
import axios from "axios";
import axiosMock from "../../App/axiosMock.js";
import Resource from "./Resource.jsx";

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

    axiosMock.onGet(`/games/${id}/player`).reply(200, {
      resources: ["brick", "wool", "brick"],
      cards: ["road_building", "monopoly"]
    });

    axios
      .get(`/games/${id}/player`)
      .then(response => {
        const countedResources = this.countResources(response.data.resources);
        this.setState(countedResources);
      })
      .catch(err => {
        console.error(err);
        alert(err.message);
      });
  }

  countResources(resources) {
    return resources.reduce(
      (countedResources, resource) => {
        countedResources[`${resource}Amount`]++;
        return countedResources;
      },
      {
        brickAmount: 0,
        woolAmount: 0,
        grainAmount: 0,
        lumberAmount: 0,
        oreAmount: 0
      }
    );
  }

  render() {
    return (
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
    );
  }
}

export default Resources;
