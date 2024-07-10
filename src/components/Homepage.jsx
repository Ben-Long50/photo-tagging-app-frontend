import { useContext } from 'react';
import LevelButton from './LevelButton';
import { LevelContext } from './LevelContext';

const Homepage = () => {
  const { levels } = useContext(LevelContext);
  return (
    <div className="level-select">
      {levels.map((level) => {
        return (
          <div className="level-card" key={level._id}>
            <h2>{level.name}</h2>
            <LevelButton
              id={level._id}
              name={level.name}
              imageUrl={level.image}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
