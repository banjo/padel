import { FullAmericanoState } from "@/models/fullAmericanoState.interface";
import { PadelGame } from "@/models/padelGame.interface";
import { PadelPlayer } from "@/models/padelPlayer.interface";

const _fullAmericanoState = "fullAmericanoState";

export function saveAmericanoState(
    players: PadelPlayer[],
    games: PadelGame[],
    step: number
): void {
    const saveObject: FullAmericanoState = { players, games, step };

    localStorage.setItem(_fullAmericanoState, JSON.stringify(saveObject));
}

export function loadAmericanoState(): FullAmericanoState | null {
    const loadedState = localStorage.getItem(_fullAmericanoState);
    localStorage.removeItem(_fullAmericanoState);

    if (loadedState === null) {
        return null;
    }

    return JSON.parse(loadedState);
}

export function removeAmericanoState(): void {
    localStorage.removeItem(_fullAmericanoState);
}
