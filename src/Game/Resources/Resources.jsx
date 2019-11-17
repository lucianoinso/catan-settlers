import React from "react";
import { connect } from "react-redux";
import PopupController from "../../PopupController/PopupController";
import Resource from "./Resource";
import { mapStateToProps, mapDispatchToProps } from "./Resources.ducks";
import { resourceNames } from "../SatanDictionary";
import "./Resources.css";

class Resources extends React.Component {
  constructor(props) {
    super(props);

    this.previousState = {
      prevBrick: 0,
      prevWool: 0,
      prevGrain: 0,
      prevLumber: 0,
      prevOre: 0
    };
  }

  componentDidMount() {
    this.props.updateResources();
    this.interval = setInterval(() => {
      this.props.updateResources();
    }, 3000);

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

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  updateAndNotify(previous, current, type) {
    const amount = current - previous;
    if (previous === current || amount < 0) {
      return "";
    }

    let changed = `Recibiste ${amount} ${resourceNames[type]}`;
    if (amount > 1 && !resourceNames[type].endsWith("s")) {
      changed += `s`;
    }

    PopupController.pushLog({ content: changed, autoClose: 2000 });

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
      changed = "No recibiste ningún recurso";
      PopupController.pushLog({ content: changed });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkChangedResources();
  }

  render() {
    return (
      <div className="resourceCards">
        <h4>Ofrendas</h4>
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
