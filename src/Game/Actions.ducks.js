import axiosMock from "../App/axiosMock";
import axios from "axios";
import PopupController from "../PopupController/PopupController.jsx";
import { offerBank, requestBank } from "./Resources/Resources.ducks";
import apiURL from "../api";

axiosMock.onGet(`/games/1/player/actions`).reply(200, [
	{ type: "move_robber", payload: [{ level: 2, index: 2 }] },
	{ type: "bank_trade", payload: {} },
	{
		type: "build_settlement",
		payload: [{ level: 0, index: 1 }, { level: 1, index: 5 }]
	}
]);

const id = 1;

axiosMock.onPost(`${apiURL}/games/${id}/player/actions`).reply(config => {
	const params = JSON.parse(config.data);

	switch (params.type) {
		case "build_settlement":
			console.log("Settlement was built!!!", params.payload);
			return [200, {}];
		default:
			console.warn(`insert mock of action ${params.type} here.`);
	}
});

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
				play_year_of_plenty_card: action.payload.play_year_of_plenty_card,
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
			possibleActions[action.type] = action.payload;
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

const mapStateToPropsBank = state => {
	return {
		bank_trade: state.game.actions.bank_trade,
		brickAmount: state.game.resources.brickAmount,
		woolAmount: state.game.resources.woolAmount,
		grainAmount: state.game.resources.grainAmount,
		lumberAmount: state.game.resources.lumberAmount,
		oreAmount: state.game.resources.oreAmount
	};
};

const mapDispatchToProps = dispatch => {
	return {
		saveAction: payload => saveAction(payload, dispatch),
		offerBank: payload => offerBank(payload, dispatch),
		requestBank: payload => requestBank(payload, dispatch)
	};
};

export { actionsReducer, mapStateToPropsBank, mapDispatchToProps };
