import React from "react"
import { Square, squareValueToString } from "../types/types"

export interface SquareComponentProps {
    square: Square
    width?: string | number
    height?: string | number
    handleClick?: React.MouseEventHandler<HTMLDivElement>
    isSelected: boolean
    isInSelectedWord: boolean
}

export const SquareComponent = ({ square, width, height, handleClick, isSelected, isInSelectedWord }: SquareComponentProps): JSX.Element => {
    const componentWidth = width == null ? '5em' : (typeof width === 'string' ? width : `${width}px`)
    const componentHeight = height == null ? '5em' : (typeof height === 'string' ? height : `${height}px`)

    let style: string = `flex items-center justify-center w-[${componentWidth}] h-[${componentHeight}] text-center border-2 border-black`
    if (isSelected) { style += ' bg-sky-400' } else if (isInSelectedWord) { style += ' bg-sky-200'} else { style += ' bg-gray-100'}

    return (
        <div
            className={`flex items-center justify-center w-[${componentWidth}] h-[${componentHeight}] bg-gray-100 text-center border-2 border-black ${style ?? ''}`}
            onClick={handleClick}
        >
            
            <div>
                {squareValueToString(square.value)}
            </div>
        </div>
    )
}