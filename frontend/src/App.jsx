import { useState, useRef, useEffect } from 'react';
import './App.css';
import CharLayer from './components/CharLayer';

function App() {
  const [textLayers, setTextLayers] = useState([]);
  const [scrollVal, setScrollVal] = useState(0);
  const [rowLength, setRowLength] = useState(350);
  const [scrollSp, setScrollSp] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // const scrollSpeed = 2;
  const totalLayers = 5;
  const totalLines = 50;

  function genString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+*&^%$#@!?<}';
    const charactersLength = characters.length;
    let counter = 0;
    let apperancePossibility;
    while (counter < rowLength) {
      apperancePossibility = Math.floor(Math.random() * 30);
      result += apperancePossibility === 1 ?
        characters.charAt(Math.floor(Math.random() * charactersLength)) :
        ' ';
      counter += 1;
    }
    return result;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime.current;
      const scrollDiff = currentScrollY - lastScrollY.current;

      if (timeDiff > 0) {
        const speed = Math.abs(scrollDiff) / timeDiff; // pixels per millisecond
        setScrollSp(speed);
      }

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;

      setScrollVal(scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    let layers = [];
    let currLayer = [];
    for (let layerNum = 0; layerNum < totalLayers; layerNum++) {
      currLayer = [];
      for (let lineNum = 0; lineNum < totalLines; lineNum++) {
        const line = genString();
        currLayer.push(line);
      }
      layers.push(currLayer);
    }
    setTextLayers(layers);
  }, []);


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const tempVal = scrollVal + scrollSpeed
  //     window.scrollTo(0, tempVal)
  //     setScrollVal(tempVal)
  //     console.log(`scrolled down ${tempVal}`)
  //   }, 150);

  //   return () => clearInterval(interval);
  // }, [scrollVal]);


  return (
    <div className='relative overflow-x-clip'>
      <div className='relative'>
        {textLayers.map((element, index) => (
          <CharLayer
            key={index}
            layerVal={element}
            index={index}
            totalLayers={totalLayers}
            scrollVal={scrollVal}
            textLayers={textLayers}
            setTextLayers={setTextLayers}
            genString={genString}
            scrollSpeed={scrollSp}
            className='smooth-scroll'
          />
        ))}
      </div>
    </div>
  );
}

export default App;
