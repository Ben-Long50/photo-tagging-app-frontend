import GameImage from './GameImage';
import { useContext, useEffect, useState } from 'react';
import { LevelContext } from './LevelContext';
import { useParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const LevelPage = () => {
  const [targets, setTargets] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  const { levelId } = useParams();
  const { levels } = useContext(LevelContext);
  const selectedLevel = levels.filter((level) => {
    return level._id === levelId;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/levels/${levelId}/targets`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          setTargets(result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const level = selectedLevel[0];
  return (
    <div>
      <div className="level-info">
        <h1 className="level-name">{level.name}</h1>
        <div className="target-container">
          {targets.map((target, index) => {
            return (
              <div key={index} className="target-card">
                <h2 className="target-name">{target.name}</h2>
                <img
                  src={target.image}
                  alt={target.name}
                  className="target-image"
                />
              </div>
            );
          })}
        </div>
      </div>

      <GameImage targets={targets} imageUrl={level.image} />
    </div>
  );
};

export default LevelPage;
