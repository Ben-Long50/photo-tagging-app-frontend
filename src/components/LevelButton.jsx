import { Link } from 'react-router-dom';

const LevelButton = (props) => {
  return (
    <Link to={`/levels/${props.id}`}>
      <button className="level-button">
        <img
          className="level-button-img"
          src={props.imageUrl}
          alt={props.levelName}
        />
      </button>
    </Link>
  );
};

export default LevelButton;
