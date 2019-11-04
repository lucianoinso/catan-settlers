import React from "react";
import { connect } from "react-redux";
import PopupController from "../../PopupController/PopupController";
import Resource from "./Resource";
import { mapStateToProps, mapDispatchToProps } from "./Resources.ducks";
import { resourceNames } from "../SatanDictionary";

class Resources extends React.Component {
  constructor(props) {
    super(props);

    this.previousState = {
      brickAmount: 0,
      woolAmount: 0,
      grainAmount: 0,
      lumberAmount: 0,
      oreAmount: 0
    };
  }

  componentDidMount() {
    this.props.saveResource();

    const {
      brickAmount,
      woolAmount,
      grainAmount,
      lumberAmount,
      oreAmount
    } = this.props;

    this.previousState = {
      prevBrick: brickAmount,
      prevWool: woolAmount,
      prevGrain: grainAmount,
      prevLumber: lumberAmount,
      prevOre: oreAmount
    };
  }

  updateAndNotify(previous, current, type) {
    const amount = current - previous;
    if (previous === current || amount < 0) {
      return "";
    }

    const changed = `Recibiste ${amount} ${resourceNames[type]}s`;
    PopupController.pushLog({ content: changed });

    return changed;
  }

  checkChangedResources() {
    const {
      prevBrick,
      prevWool,
      prevGrain,
      prevLumber,
      prevOre
    } = this.previousState;

    const {
      brickAmount,
      woolAmount,
      grainAmount,
      lumberAmount,
      oreAmount
    } = this.props;

    let changed = "";
    let amount = 0;

    changed += this.updateAndNotify(prevBrick, brickAmount, "brick");
    changed += this.updateAndNotify(prevWool, woolAmount, "wool");
    changed += this.updateAndNotify(prevGrain, grainAmount, "grain");
    changed += this.updateAndNotify(prevLumber, lumberAmount, "lumber");
    changed += this.updateAndNotify(prevOre, oreAmount, "ore");

    this.previousState = {
      prevBrick: brickAmount,
      prevWool: woolAmount,
      prevGrain: grainAmount,
      prevLumber: lumberAmount,
      prevOre: oreAmount
    };

    if (changed === "") {
      changed = "Didn't receive any resources";
      PopupController.pushLog({ content: changed });
    }
  }

  render() {
    this.checkChangedResources();

    return (
      <div className="resourceCards">
        <h4>Cartas de recursos</h4>
        <ul>
          <li>
            <Resource type="brick" amount={this.props.brickAmount} />
          </li>
          <li>
            <Resource type="wool" amount={this.props.woolAmount} />
          </li>
          <li>
            <Resource type="grain" amount={this.props.grainAmount} />
          </li>
          <li>
            <Resource type="lumber" amount={this.props.lumberAmount} />
          </li>
          <li>
            <Resource type="ore" amount={this.props.oreAmount} />
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resources);
