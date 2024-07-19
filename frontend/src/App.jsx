import { useState, useRef, useEffect } from 'react'
import './App.css'
import CharLayer from './components/CharLayer';


function App() {
  const [textLayers, setTextLayers] = useState([])
  const [scrollVal, setScrollVal] = useState(0);
  const [rowLength, setRowLength] = useState(300);

  const oldScrollVal = useRef(0);
  const totalLayers = 5
  const totalLines = 50

  function genString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+*&^%$#@!?<}';
    const charactersLength = characters.length;
    let counter = 0;
    let apperancePossibility;
    while (counter < rowLength) {
      apperancePossibility = Math.floor(Math.random() * 30)
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
          if (Math.abs(oldScrollVal.current - scrollY) > 1) {
              setScrollVal(prevScrollVal => {
                  oldScrollVal.current = scrollY;
                  return scrollY;
              });
          }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };

  }, []);


  useEffect(() => {
    let layers = []
    let currLayer = []
    for (let layerNum = 0; layerNum < totalLayers; layerNum++) {
      currLayer = [];
      for (let lineNum = 0; lineNum < totalLines; lineNum++) {
        const line = genString();
        currLayer.push(line);
      }
      layers.push(currLayer)
    }
    setTextLayers(layers);
  }, []);

  useEffect(() => {
    console.log(textLayers);
  }, []);


  return (
    <div className='relative overflow-x-clip'>
      <div className='relative'>
        {textLayers.map((element, index) => {
          return <CharLayer key={index} layerVal={element} index={index} totalLayers={totalLayers} scrollVal={scrollVal} textLayers={textLayers} setTextLayers={setTextLayers} genString={genString}/>
        })}
      </div>
      <div className='h-screen w-screen absolute top-0 left-0 text-red-500 text-9xl flex justify-center align-middle items-center z-[1] blur-sm'>
        <div className='bg-gray-800/80 p-8 rounded-2xl'>
          HIMANSHU
        </div>
      </div>
    </div>
  )
}

export default App
