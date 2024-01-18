'use client'

import React, { useState,  createContext, useContext, useEffect } from 'react';

interface GeneralContextType {
    auth: any;
    setAuth: (value: any) => void;
}

export const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

interface GeneralContextProviderProps {
    children: React.ReactNode;
}

export const GeneralContextProvider: React.FC<GeneralContextProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState();

    useEffect(() => {
        const userData = localStorage.getItem('user');
    
        // If userData exists in localStorage, setAuth accordingly
        if (userData) {
            setAuth(JSON.parse(userData));
        }
    }, []); 

    return (
        <GeneralContext.Provider 
        value={{
            auth,
            setAuth,
        }}>
        {children}
        </GeneralContext.Provider>
    );
    }

    export const useGeneralContext = (): GeneralContextType => {
    const context = useContext(GeneralContext);
    
    if (!context) {
        throw new Error('useGeneralContext must be used within a GeneralContextProvider');
    }
    
    return context;
};
