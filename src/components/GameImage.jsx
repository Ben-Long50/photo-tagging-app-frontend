import { useState, useRef, useContext } from 'react';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline, mdiCloseCircleOutline } from '@mdi/js';
import { AuthContext } from './AuthContext';
import { useParams } from 'react-router-dom';

const GameImage = (props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [menuPosition, setMenuPostition] = useState({ x: 0, y: 0 });
  const [imageDims, setImageDims] = useState({ x: 0, y: 0 });
  const [clickedCoords, setClickedCoords] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  const { levelId } = useParams();

  const imgRef = useRef(null);
  const formRef = useRef(null);

  // const getMousePosition = (e) => {
  //   setMousePosition({
  //     x: e.nativeEvent.offsetX,
  //     y: e.nativeEvent.offsetY,
  //   });
  // };

  const getImgWidth = (e) => {
    if (imgRef.current) {
      setImageDims({
        x: imgRef.current.offsetWidth,
        y: imgRef.current.offsetHeight,
      });
      setMousePosition({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      });
    }
  };

  const toggleSelectionMenu = () => {
    if (formRef.current.style.display === 'flex') {
      formRef.current.style.display = 'none';
    } else {
      setMenuPostition({ x: mousePosition.x, y: mousePosition.y });
      formRef.current.style.display = 'flex';
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const character = e.target.character.value;
    try {
      const selectedCoordinates = {
        name: character,
        x: menuPosition.x / imageDims.x,
        y: menuPosition.y / imageDims.y,
      };
      const response = await fetch(`${apiUrl}/levels/${levelId}/targets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCoordinates),
      });
      const result = await response.json();
      if (response.ok) {
        setClickedCoords([
          ...clickedCoords,
          {
            type: 'success',
            chracter: result.character,
            x: menuPosition.x,
            y: menuPosition.y,
          },
        ]);
        props.setSuccesses(props.successes + 1);
      } else {
        setClickedCoords([
          ...clickedCoords,
          {
            type: 'failure',
            character: null,
            x: menuPosition.x,
            y: menuPosition.y,
          },
        ]);
      }
      toggleSelectionMenu();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    toggleSelectionMenu();
    const selectedCoordinates = {
      x: menuPosition.x / imageDims.x,
      y: menuPosition.y / imageDims.y,
    };
    console.log(selectedCoordinates);
  };

  return (
    <div>
      <div
        className="cursor-follower"
        style={{
          top: `${mousePosition.y}px`,
          left: `${mousePosition.x}px`,
          backgroundImage: `url(${props.imageUrl})`,
          backgroundPosition: `${-mousePosition.x * 2.5 + 50}px ${-mousePosition.y * 2.5 + 50}px`,
          backgroundSize: `${imageDims.x * 2.5}px`,
        }}
      />
      <form
        ref={formRef}
        method="post"
        className="selection-menu"
        style={{
          top: `${menuPosition.y}px`,
          left: `${menuPosition.x}px`,
          display: 'none',
        }}
        onSubmit={handleFormSubmit}
      >
        <select name="character" id="character">
          {props.targets.map((target, index) => {
            return (
              <option key={index} className="menu-option" value={target.name}>
                {target.name}
              </option>
            );
          })}
        </select>
        <button className="submit-button" type="submit">
          <Icon path={mdiCheckCircleOutline} size="2.5rem" color="white"></Icon>
        </button>
      </form>
      <img
        ref={imgRef}
        className="game-image"
        src={props.imageUrl}
        alt="Port City"
        onClick={handleClick}
        onMouseMove={getImgWidth}
      />
      {clickedCoords.map((coord, index) => {
        if (coord.type === 'success') {
          return (
            <div
              key={index}
              className="result-icon"
              style={{
                top: `calc(${coord.y}px)`,
                left: `calc(${coord.x}px)`,
              }}
            >
              <Icon
                path={mdiCheckCircleOutline}
                size="4rem"
                color="green"
              ></Icon>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className="result-icon"
              style={{
                top: `calc(${coord.y}px)`,
                left: `calc(${coord.x}px)`,
              }}
            >
              <Icon path={mdiCloseCircleOutline} size="4rem" color="red"></Icon>
            </div>
          );
        }
      })}
    </div>
  );
};

export default GameImage;
