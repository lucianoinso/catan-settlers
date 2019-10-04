import React from "react";

class Hex extends React.Component {
  render() {
    const { position, resource, token } = this.props;
    const { level, index } = position;
    return (
      <div className={`hex level-${level} index-${index} resource-${resource}`}>
        Hexágono ({level}, {index}), {resource}, {token}.
      </div>
    );
  }
}

export default Hex;
