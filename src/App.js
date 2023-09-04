import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import './App.css';

const App = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [textOverlays, setTextOverlays] = useState([]);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(100);

  const fetchImage = async () => {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
      );
    const data = await response.json();
    console.log(data)
    setImage(data.urls.regular);
  };

  const addTextOverlay = () => {
    setTextOverlays([{ text }]);
    setText('');
  };

  const handleResize = (e, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  return (
    <div className="App">
      <button onClick={fetchImage}>Fetch Image</button>
      {image && (
        <div className="image-container">
          <img src={image} alt="Unsplash" height={800} width={1400} />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={addTextOverlay}>Add Text</button>
          {textOverlays.map((overlay, index) => (
            <Draggable key={index} bounds="parent">
              <Resizable
                key={index}
                width={width}
                height={height}
                onResize={handleResize}
                resizeHandles={['se']}
              >
                <div
                  style={{
                    width,
                    height,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    fontSize: "70px",
                  }}
                >
                  {overlay.text}
                </div>
              </Resizable>
            </Draggable>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
