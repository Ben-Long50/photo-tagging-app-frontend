import { useState, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline, mdiCloseCircleOutline } from '@mdi/js';

const GameImage = (props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [menuPosition, setMenuPostition] = useState({ x: 0, y: 0 });
  const [imageDims, setImageDims] = useState({ x: 0, y: 0 });
  const [clickedCoords, setClickedCoords] = useState([]);

  const imgRef = useRef(null);
  const formRef = useRef(null);

  const getMousePosition = (e) => {
    setMousePosition({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  };

  const getImgWidth = () => {
    if (imgRef.current) {
      setImageDims({
        x: imgRef.current.offsetWidth,
        y: imgRef.current.offsetHeight,
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
    try {
      const selectedCoordinates = {
        x: menuPosition.x / imageDims.x,
        y: menuPosition.y / imageDims.y,
      };
      console.log(selectedCoordinates);
      const response = await fetch(`${apiUrl}/levels/:levelId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCoordinates),
      });
      const result = await response.json();
      if (result.ok) {
        setClickedCoords([
          ...clickedCoords,
          {
            type: 'success',
            chracter: result.character,
            x: menuPosition.x,
            y: menuPosition.y,
          },
        ]);
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
  };

  return (
    <div onMouseMove={getMousePosition}>
      <div
        className="cursor-follower"
        style={{
          top: `calc(${mousePosition.y}px)`,
          left: `calc(${mousePosition.x}px)`,
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
          top: `calc(${menuPosition.y}px)`,
          left: `calc(${menuPosition.x}px)`,
          display: 'none',
        }}
        onSubmit={handleFormSubmit}
      >
        <select name="character" id="character">
          <option className="menu-option" value="cat">
            Moustache Cat
          </option>
          <option className="menu-option" value="crab">
            Crab
          </option>
          <option className="menu-option" value="bulldog">
            Bulldog
          </option>
          <option className="menu-option" value="donkey">
            Straw Hat Donkey
          </option>
          <option className="menu-option" value="chameleon">
            Pink Chameleon
          </option>
        </select>
        <button className="submit-button" type="submit">
          <Icon path={mdiCheckCircleOutline} size="2.5rem" color="white"></Icon>
        </button>
      </form>
      <img
        ref={imgRef}
        style={{ margin: 0, padding: 0 }}
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
                size="6rem"
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
              <Icon path={mdiCloseCircleOutline} size="6rem" color="red"></Icon>
            </div>
          );
        }
      })}
    </div>
  );
};

export default GameImage;
