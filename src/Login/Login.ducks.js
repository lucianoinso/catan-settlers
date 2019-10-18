import axiosMock from "../App/axiosMock";
import axios from "axios";

axiosMock.onPost("https://axiosMock.com/users/login").reply(200, {
  token: "fgewr234h482o3321j45o3j1"
});

// Action types

const LOG_IN = "log_in";

// Reducer

const initialState = {
  user: "",
  pass: "",
  token: "",
  isLogged: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        pass: action.payload.pass,
        isLogged: true
      };
    default:
      return state;
  }
};

// Actions creators

const logIn = (payload, dispatch) => {
  axios
    .post("https://axiosMock.com/users/login", payload)
    .catch(error => {
      // TODO: handle errors and use the global popup to show them
      alert(error);
    })
    .then(response => {
      payload.token = response.data.token;
      payload.isLogged = true;
      dispatch({
        type: LOG_IN,
        payload
      });
    });
};

// Map to props

const mapStateToProps = state => {
  return {
    isLogged: state.login.isLogged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: payload => logIn(payload, dispatch)
  };
};

// const mapDispatchToProps = { logIn };

export { loginReducer, mapStateToProps, mapDispatchToProps };
