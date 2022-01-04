import React, { useState, useEffect }from 'react';
//import logo from './logo.svg';
import './App.css';
/*import LoginControl from './LoginControl.js';
import DateController from './DateController.js';
import Counter from './MyComponent.js';*/
import CatAndMouse from './CatAndMouse';
import 'antd/dist/antd.css';
function App() {
  const [dimensions, setDimensions] = useState({width: window.innerWidth, height: window.innerHeight});

  function handleResize() {
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({
      width,
      height
    });
  }

  useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [])

  let mouseStart = { left: dimensions.width / 2, top: dimensions.height / 2 };
  let catStart = { left: dimensions.width / 4, top: dimensions.height / 4 };
  let mouseSpeed = 4;
  return (
    <div className="App">
      {/*content*/}
      <CatAndMouse mouseStart={mouseStart} catStart={catStart} mouseSpeed={mouseSpeed} dimensions={dimensions}/>
    </div>
  );
}

export default App;
