import { createContext, useContext, useState } from 'react';

type Players = {
    playerX: string;
    playerO: string;
    setPlayers: (x: string, o: string) => void;
};

const PlayersContext = createContext<Players | null>(null);

export function PlayersProvider({ children }: { children: React.ReactNode }) {
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');

    const setPlayers = (x: string, o: string) => {
        setPlayerX(x);
        setPlayerO(o);
    };

    return (
        <PlayersContext.Provider value={{ playerX, playerO, setPlayers }}>
            {children}
        </PlayersContext.Provider>
    );
}

export function usePlayers() {
    const ctx = useContext(PlayersContext);
    if (!ctx) throw new Error('usePlayers must be used inside PlayersProvider');
    return ctx;
}
