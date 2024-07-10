import { useContext } from 'react';
import LevelButton from './LevelButton';
import { LevelContext } from './LevelContext';

const Homepage = () => {
  const { levels } = useContext(LevelContext);
  return (
    <div className="level-select">
      {levels.map((level) => {
        return (
          <LevelButton
            key={level._id}
            id={level._id}
            name={level.name}
            imageUrl={level.imageUrl}
          />
        );
      })}
      <LevelButton id={1} imageUrl="./public/images/port_city.png" />
      <LevelButton
        id={2}
        imageUrl="./public/images/old_house_by_the_river.png"
      />
    </div>
  );
};

export default Homepage;
