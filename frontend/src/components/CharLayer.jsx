import { useRef, useEffect } from 'react'

export default function CharLayer({ index, layerVal, totalLayers, scrollVal, textLayers, setTextLayers, genString }) {
    const constClass = `whitespace-pre absolute h-full min-w-[1500px] left-0 flex flex-col justify-between`
    const styles = {
        zIndex: index,
        fontSize: `${index * 1.5}rem`,
        filter: `blur(${(totalLayers - index - 1) / 1.5}px) brightness(${50 + (130 / totalLayers) * (index)}%)`,
        top: `-${scrollVal * index * 0.25}px`
    };

    const lastRow = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const intersecting = entry.isIntersecting
                entry.target.style.backgroundColor = intersecting ? "blue" : "orange"
                setTextLayers(oldVal => {
                    let totalNewLayers = 5
                    console.log(`Adding ${totalNewLayers} new rows to layer ${index + 1}`)
                    while (totalNewLayers--) {
                        // textLayers[index].push(genString())
                        if(totalNewLayers===1) {
                            oldVal[index].push("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
                            break
                        }
                        oldVal[index].push("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
                    }
                    return (
                        [...oldVal]
                    )
                })
            })
            console.log(entries)
        })
        
        if (lastRow.current) {
            observer.observe(lastRow.current);
        }

        return () => {
            if (lastRow.current) {
                observer.unobserve(lastRow.current);
            }
        };

    }, [textLayers])

useEffect(() => {
    console.log(`layerVal length = ${textLayers[index].length}`)
}, [textLayers])

    return (
        <>
            <div className={constClass} style={styles}>
                {textLayers[index].map((line, idx) => {
                    if (idx === textLayers[index].length - 1) {
                        return (
                            <div key={idx} refring ref={lastRow} className="text-cyan-500 flex justify-center opacity-90">
                                {line}
                            </div>
                        )
                    }
                    return (
                        <div key={idx} className="text-cyan-500 flex justify-center opacity-90">
                            {line}
                        </div>
                    )
                })}
            </div>
        </>
    )
}