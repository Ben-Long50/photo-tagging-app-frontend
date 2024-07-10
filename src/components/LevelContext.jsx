import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const LevelContext = createContext();

const LevelProvider = ({ children }) => {
  const [levels, setLevels] = useState([]);
  const { apiUrl } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/levels`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setLevels(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <LevelContext.Provider
      value={{
        levels,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export default LevelProvider;
