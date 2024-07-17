import { useState, useRef, useContext, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline, mdiCloseCircleOutline } from '@mdi/js';
import { AuthContext } from './AuthContext';
import { useParams } from 'react-router-dom';

const GameImage = (props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [menuPosition, setMenuPostition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [imageDims, setImageDims] = useState({ x: 0, y: 0 });
  const [clickedCoords, setClickedCoords] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  const { levelId } = useParams();

  const imgRef = useRef(null);
  const formRef = useRef(null);
  const layoutRef = useRef(null);
  const hiddenInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (layoutRef.current) {
        setScrollPosition({
          x: layoutRef.current.scrollLeft,
          y: layoutRef.current.scrollTop,
        });
      }
    };

    if (layoutRef.current) {
      layoutRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (layoutRef.current) {
        layoutRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const getImgWidth = (e) => {
    if (imgRef.current) {
      // Get images position relative to the viewport
      const imageRect = imgRef.current.getBoundingClientRect();
      setImageDims({
        x: imageRect.width,
        y: imageRect.height,
      });
      setMousePosition({
        x: e.clientX - imageRect.x - scrollPosition.x,
        y: e.clientY - imageRect.y - scrollPosition.y,
      });
    }
  };

  const toggleSelectionMenu = () => {
    if (formRef.current.style.display === 'flex') {
      formRef.current.style.display = 'none';
    } else {
      setMenuPostition({
        x: mousePosition.x + scrollPosition.x,
        y: mousePosition.y + scrollPosition.y,
      });
      formRef.current.style.display = 'flex';
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const character = hiddenInputRef.current.value;
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
        const newTargets = [];
        props.targets.map((target) => {
          if (target.name != character) {
            newTargets.push(target);
          }
        });
        console.log(character);
        console.log(props.targets);
        console.log(newTargets);
        props.setTargets(newTargets);
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

  const updateInput = (e) => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = e.target.textContent;
    }
  };

  const handleClick = (e) => {
    if (imgRef.current) {
      // Get images position relative to the viewport
      const imageRect = imgRef.current.getBoundingClientRect();
      setImageDims({
        x: imageRect.width,
        y: imageRect.height,
      });
      setMousePosition({
        x: e.clientX - imageRect.x - scrollPosition.x,
        y: e.clientY - imageRect.y - scrollPosition.y,
      });
    }
    toggleSelectionMenu();
  };

  return (
    <div ref={layoutRef} className="layout" onMouseMove={getImgWidth}>
      <div
        className="cursor-follower"
        style={{
          top: `calc(${mousePosition.y}px + 3rem)`,
          left: `calc(${mousePosition.x}px + 3rem)`,
          backgroundImage: `url(${props.imageUrl})`,
          backgroundPosition: `${(-mousePosition.x - scrollPosition.x) * 2.5 + 50}px ${(-mousePosition.y - scrollPosition.y) * 2.5 + 50}px`,
          backgroundSize: `${imageDims.x * 2.5}px`,
        }}
      />
      <form
        ref={formRef}
        method="post"
        className="selection-menu"
        style={{
          top: `calc(${menuPosition.y - layoutRef.current?.scrollTop}px + 3rem)`,
          left: `calc(${menuPosition.x - layoutRef.current?.scrollLeft}px + 3rem)`,
          display: 'none',
        }}
        onSubmit={handleFormSubmit}
      >
        <input
          ref={hiddenInputRef}
          type="text"
          hidden
          name="character"
          id="character"
        />
        {props.targets.map((target, index) => {
          return (
            <>
              <button
                key={index}
                className="menu-option"
                onClick={updateInput}
                type="submit"
              >
                {target.name}
              </button>
              {index < props.targets.length - 1 && <hr />}
            </>
          );
        })}
      </form>
      <img
        ref={imgRef}
        className="game-image"
        src={props.imageUrl}
        alt="Port City"
        onClick={handleClick}
      />
      {clickedCoords.map((coord, index) => {
        if (coord.type === 'success') {
          return (
            <div
              key={index}
              className="result-icon"
              style={{
                top: `calc(${coord.y - layoutRef.current?.scrollTop}px + 3rem)`,
                left: `calc(${coord.x - layoutRef.current?.scrollLeft}px + 3rem)`,
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
                top: `calc(${coord.y - layoutRef.current?.scrollTop}px + 3rem)`,
                left: `calc(${coord.x - layoutRef.current?.scrollLeft}px + 3rem)`,
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
