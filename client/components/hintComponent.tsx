import React, { useEffect, useState } from 'react'

interface WordHint {
    word: string,
    clues: string[],
}

interface HintComponentProps {
    word: string,
    clue: string
}

export const HintComponent = (props: HintComponentProps) => {
    const [wordHints, setWordHints] = useState<WordHint[]>([])
    const [clueHints, setClueHints] = useState<string[]>([])

    useEffect(() => {
        if (props.word.includes('_')) {
            // still need to finish the word. look for word hints
            fetch(`http://localhost:3000/word_hint?word=${props.word}`).then((res) => {
                return res.json()
            }).then((data: WordHint[]) => {
                setClueHints([])
                setWordHints(data.slice(0, 10).map((wordHint) => {
                    return {
                        word: wordHint.word,
                        clues: wordHint.clues.slice(0, 10)
                    }
                }))
            }).catch(console.log)
            return
        }

        // word is complete. look only for clues
        if (props.clue === '') {
            fetch(`http://localhost:3000/clue_hint?word=${props.word}`).then((res) => {
                return res.json()
            }).then((data: string[]) => {
                setWordHints([])
                setClueHints(data.slice(0, 10))
            }).catch(console.log)
            return
        }

        // word is complete and clue is present. do nothing
        setWordHints([])
        setClueHints([])
    }, [props.word, props.clue])

    const wordHintElements = wordHints.map((wordHint, wordHintIdx) => {
        const clueElements = wordHint.clues.map((clue, clueIdx) => {
            return <div key={clueIdx} className='border-2 border-gray-300 p-1'>{clue}</div>
        })
        return (
            <div className='flex flex-row gap-x-8' key={wordHintIdx}>
                <div className='h-full w-1/6'>{wordHint.word}</div>
                <div className='h-fit max-h-24 w-full overflow-auto bg-gray-200'>
                    {clueElements}
                </div>
            </div>
        )
    })

    return (
        <div className='w-full h-fit p-2'>
            {wordHintElements.length === 0 ? <></> : 
                <div className='flex flex-col gap-y-4'>
                    <div className='flex flex-row'>
                        <div className='h-full w-1/6'>Word Hints</div>
                        <div className='h-full'>Clue Hints</div>
                    </div>
                    {wordHintElements}
                </div>
            }
        </div>
    )
}