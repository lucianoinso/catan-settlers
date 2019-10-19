import axiosMock from "../App/axiosMock";
import axios from "axios";
import PopupController from "../PopupController/PopupController.jsx";

axiosMock
    .onGet(`/games/1/player/actions`)
    .reply(200, [
        { type: "move_robber", payload: [{ level: 2, index: 2 }] },
        { type: "bank_trade", payload: "" }
    ]);

// Action types

const SAVE_ACTIONS = "save_actions";

//Reducer

const initialState = {
    build_settlement: false,
    upgrade_city: false,
    build_road: false,
    move_robber: false,
    buy_card: false,
    play_knight_card: false,
    play_road_building_card: false,
    play_monopoly_card: false,
    play_year_of_plenty_card: false,
    end_turn: false,
    bank_trade: false
};

const actionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ACTIONS:
            return {
                build_settlement: action.payload.build_settlement,
                upgrade_city: action.payload.upgrade_city,
                build_road: action.payload.build_road,
                move_robber: action.payload.move_robber,
                buy_card: action.payload.buy_card,
                play_knight_card: action.payload.play_knight_card,
                play_road_building_card: action.payload.play_road_building_card,
                play_monopoly_card: action.payload.play_monopoly_card,
                play_year_of_plenty_card:
                    action.payload.play_year_of_plenty_card,
                end_turn: action.payload.end_turn,
                bank_trade: action.payload.bank_trade
            };
        default:
            return state;
    }
};

function possibleActions(actions) {
    return actions.reduce(
        (possibleActions, action) => {
            possibleActions[action.type] = true;
            return possibleActions;
        },
        {
            build_settlement: false,
            upgrade_city: false,
            build_road: false,
            move_robber: false,
            buy_card: false,
            play_knight_card: false,
            play_road_building_card: false,
            play_monopoly_card: false,
            play_year_of_plenty_card: false,
            end_turn: false,
            bank_trade: false
        }
    );
}
//Action creators

const saveAction = (payload, dispatch) => {
    const id = 1;
    axios
        .get(`/games/1/player/actions`)
        .then(response => {
            const possibleAction = possibleActions(response.data);
            payload = possibleAction;
            dispatch({
                type: SAVE_ACTIONS,
                payload
            });
        })
        .catch(err => {
            PopupController.pushError({
                content: `Hubo un error al conectarse con el servidor.`
            });
            console.error(err);
        });
};

const mapStateToPropsBankTrade = state => {
    return {
        bank_trade: state.game.actions.bank_trade
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveAction: payload => saveAction(payload, dispatch)
    };
};

export { actionsReducer, mapStateToPropsBankTrade, mapDispatchToProps };
