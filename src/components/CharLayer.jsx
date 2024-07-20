import { useRef, useEffect } from 'react';

export default function CharLayer({ index, layerVal, totalLayers, scrollVal, textLayers, setTextLayers, genString, scrollSpeed }) {
    const layerCol = ["text-sky-500", "text-red-500", "text-lime-500", "text-orange-500", "text-cyan-700", "text-pink-500", "text-brown-500"][index]
    const constClass = `whitespace-pre absolute h-full min-w-[1500px] -left-24 flex flex-col justify-between`;
    const lastRow = useRef(null)
    const initialLoad = useRef(true)
    const defaultBlur = (totalLayers - index - 1) / 1
    // const blurAmount = scrollSpeed > 0 ? (scrollSpeed/50 * (index + 1) * 40) : defaultBlur

    const staticStyles = {
        zIndex: index + 1,
        fontSize: `${(index + 1.2) * 1.2}rem`,
        transition: 'filter 0.2s ease-in-out, transform 0.3s ease-in-out'
    }

    let dynamicStyles = {
        filter: `blur(${defaultBlur}px) brightness(${30 + (130 / totalLayers) * (index)}%)`,
        top: `-${scrollVal * (index + 0.2) * 0.25}px`
    }


    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !initialLoad.current) {
                    observer.disconnect();

                    setTextLayers(oldVal => {
                        let totalNewLayers = 10;
                        console.log(`Adding ${totalNewLayers} new rows to layer ${index + 1}`);
                        while (totalNewLayers--) {
                            oldVal[index].push(genString());
                        }
                        return [...oldVal];
                    });

                    setTimeout(() => {
                        if (lastRow.current) {
                            observer.observe(lastRow.current);
                        }
                    }, 100);
                    console.log(entries);
                }
            });
        });

        if (lastRow.current) {
            observer.observe(lastRow.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [index, setTextLayers, genString]);

    useEffect(() => {
        if (scrollVal === 0) {
            initialLoad.current = true;
        } else {
            initialLoad.current = false;
        }
    }, [scrollVal]);

    return (
        <div className={constClass} style={{ ...staticStyles, ...dynamicStyles }}>
            {textLayers[index].map((line, idx) => {
                if (idx === textLayers[index].length - 1) {
                    return (
                        <div key={idx} ref={lastRow} className={`${layerCol} flex justify-center opacity-90`}>
                            {line}
                        </div>
                    );
                }
                return (
                    <div key={idx} className={`${layerCol} flex justify-center opacity-90`}>
                        {line}
                    </div>
                );
            })}
        </div>
    );
}
