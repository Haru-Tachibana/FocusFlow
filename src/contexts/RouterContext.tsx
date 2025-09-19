import React, { createContext, useContext, useState, ReactNode } from 'react';

type Route = 'dashboard' | 'habits' | 'skills' | 'calendar' | 'statistics' | 'settings';

interface RouterContextType {
  currentRoute: Route;
  navigateTo: (route: Route) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<Route>('dashboard');

  const navigateTo = (route: Route) => {
    setCurrentRoute(route);
  };

  const value = {
    currentRoute,
    navigateTo,
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
};
