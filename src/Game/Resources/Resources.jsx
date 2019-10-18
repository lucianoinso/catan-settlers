import React from "react";
import { connect } from "react-redux";
import Resource from "./Resource.jsx";
import { mapStateToProps, mapDispatchToProps } from "./Resources.ducks.js";

class Resources extends React.Component {
  constructor(props) {
    super(props);

    this.props.saveResource();
  }

  render() {
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
