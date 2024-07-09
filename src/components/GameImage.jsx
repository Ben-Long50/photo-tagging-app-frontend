import { useState, useRef } from 'react';

const GameImage = (props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageDims, setImageDims] = useState({ x: 0, y: 0 });
  const [zoomStatus, setZoomStatus] = useState(false);

  const imgRef = useRef(null);

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

  const handleClick = () => {
    console.log(mousePosition.x / imageDims.x, mousePosition.y / imageDims.y);
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
      <img
        ref={imgRef}
        style={{ margin: 0, padding: 0 }}
        className="game-image"
        src={props.imageUrl}
        alt="Port City"
        onClick={handleClick}
        onMouseMove={getImgWidth}
      />
      ;
    </div>
  );
};

export default GameImage;
