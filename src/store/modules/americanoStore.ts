import { PadelGame } from "@/models/padelGame.interface";
import { PadelPlayer } from "@/models/padelPlayer.interface";
import { PadelRules } from "@/models/padelRules.interface";
import { getPadelPlayers, prepareGames } from "@/services/americanoService";
import {
    sortById,
    sortByScore,
    updatePlayerScores,
} from "@/services/scoreService";
import {
    loadAmericanoState,
    removeAmericanoState,
    saveAmericanoState,
} from "@/services/storageService";

export interface AmericanoStoreState {
    games: PadelGame[];
    players: PadelPlayer[];
    step: number;
    isGamePrepared: boolean;
    rules: PadelRules;
}

export interface AmericanoStoreGetters {
    getGames: PadelGame[];
    getPlayers: PadelPlayer[];
    getStep: number;
    getIsGamePrepared: boolean;
    getRules: PadelRules;
}

export interface AmericanoStoreActions {
    commit: Function;
    getters: AmericanoStoreGetters;
    dispatch: Function;
}

export default {
    namespaced: true as true,
    state: {
        games: [],
        players: getPadelPlayers(),
        step: 1,
        isGamePrepared: false,
        rules: {
            maxScore: 32,
            randomSchedule: false,
        },
    } as AmericanoStoreState,
    mutations: {
        UPDATE_GAMES(state: AmericanoStoreState, games: PadelGame[]) {
            state.games = games;
            state.isGamePrepared = true;
            saveAmericanoState(
                state.players,
                state.games,
                state.step,
                state.rules
            );
        },
        UPDATE_PLAYERS(state: AmericanoStoreState, players: PadelPlayer[]) {
            state.players = players;
            saveAmericanoState(
                state.players,
                state.games,
                state.step,
                state.rules
            );
        },
        INCREMENT_STEP(state: AmericanoStoreState) {
            state.step += 1;
            saveAmericanoState(
                state.players,
                state.games,
                state.step,
                state.rules
            );
        },
        DECREMENT_STEP(state: AmericanoStoreState) {
            state.step -= 1;
            saveAmericanoState(
                state.players,
                state.games,
                state.step,
                state.rules
            );
        },
        SET_RULES(state: AmericanoStoreState, rules: PadelRules) {
            state.rules = rules;
        },
        RESET(state: AmericanoStoreState) {
            state.players = getPadelPlayers();
            state.games = [];
            state.step = 1;
            state.isGamePrepared = false;
            state.rules.maxScore = 32;
            state.rules.randomSchedule = false;
            removeAmericanoState();
        },
        LOAD_STATE(state: AmericanoStoreState) {
            const americanoState = loadAmericanoState();

            if (!americanoState) {
                return;
            }

            state.players = americanoState.players;
            state.games = americanoState.games;
            state.step = americanoState.step;
            state.isGamePrepared = true;
            state.rules = americanoState.rules;
        },
    },
    actions: {
        prepareGames({ commit, getters }: AmericanoStoreActions) {
            const games = prepareGames(getters.getPlayers);
            commit("UPDATE_GAMES", games);
        },
        updatePlayerScores({ commit, getters }: AmericanoStoreActions) {
            const updatedPlayers = updatePlayerScores(
                getters.getPlayers,
                getters.getGames
            );
            commit("UPDATE_PLAYERS", updatedPlayers);
        },
        sortPlayersByScore({ commit, getters }: AmericanoStoreActions) {
            const sortedPlayers = sortByScore(getters.getPlayers);
            commit("UPDATE_PLAYERS", sortedPlayers);
        },
        sortPlayersById({ commit, getters }: AmericanoStoreActions) {
            const sortedPlayers = sortById(getters.getPlayers);
            commit("UPDATE_PLAYERS", sortedPlayers);
        },
        newGame({ commit }: AmericanoStoreActions) {
            commit("RESET");
        },
        saveStateManually({ getters }: AmericanoStoreActions) {
            saveAmericanoState(
                getters.getPlayers,
                getters.getGames,
                getters.getStep,
                getters.getRules
            );
        },
    },
    getters: {
        getGames: (state: AmericanoStoreState) => state.games,
        getPlayers: (state: AmericanoStoreState) => state.players,
        getStep: (state: AmericanoStoreState) => state.step,
        getIsGamePrepared: (state: AmericanoStoreState) => state.isGamePrepared,
        getRules: (state: AmericanoStoreState) => state.rules,
    },
};
