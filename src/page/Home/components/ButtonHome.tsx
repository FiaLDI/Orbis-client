import React from "react"

export const ButtonHome: React.FC<{ children: React.ReactNode, handler?: ()=> void }> = ({children}) => {
    return (
        <button className="p-3 w-2xs bg-[rgba(54,63,180,0.5)] cursor-pointer">
            {children}
        </button>
    )
}