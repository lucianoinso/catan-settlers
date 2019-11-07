import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { mapStateToProps, mapDispatchToProps } from "./CancelLobby.ducks";

function CancelLobby({ user, lobby, cancelLobby }) {
  if (user !== lobby.owner) {
    return "";
  }
  return (
    <div>
      <Link to="/rooms/" onClick={() => cancelLobby({ id: lobby.id })}>
        Cancelar partida
      </Link>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelLobby);

export { CancelLobby };
