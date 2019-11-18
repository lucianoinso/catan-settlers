import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../store";
import { logOut as logoutReducer } from "../Login/Login.ducks";
import { mapStateToProps } from "../Login/Login.ducks";

class Logout extends Component {
    callLogout() {
        logoutReducer({}, store.dispatch);
    }

    render() {
        if (this.props.isLogged) {
            return (
                <div
                    className="logout-header"
                    style={{ position: "relative", float: "right", width:"100%", textAlign:"right", paddingBottom:"10px" }}
                >
                    <div
                        className="header-welcome"
                        style={{ fontSize: "0.5em", marginRight: "20px" }}
                    >
                        Bienvenid@ alma de {" "}
                        <span
                            className="username"
                            style={{ color: "red", marginRight: "7px" }}
                        >
                            {this.props.user}
                        </span>
                        -
                        <span
                            className="logout-link"
                            onClick={event => {
                                this.callLogout();
                            }}
                            style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                marginLeft: "7px"
                            }}
                        >
                            Escapar
                        </span>
                    </div>
                </div>
            );
        } else {
            return (<span style={{visibility: "hidden", position: "absolute", right: "0"}}>not logged</span>);
        }
    }
}

export default connect(mapStateToProps)(Logout);
