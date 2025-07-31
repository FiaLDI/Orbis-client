import React from "react";

export const NavBar: React.FC<{ styleContainer?: string; styleList?: string }> = (
    {styleContainer="", styleList=""}
) => {
        
    return (
        <ul
            className={
                !(window.innerWidth < 1199)
                    ? `flex gap-10 ${styleContainer}`
                    : `top-40 flex-col bg-blue-950 w-full text-4xl ${styleContainer}`
            }
        >
            <li className={`p-3 ${styleList}`}>Загрузить</li>
            <li className={`p-3 ${styleList}`}>Узнать больше</li>
            <li className={`p-3 ${styleList}`}>Политика</li>
            <li className={`p-3 ${styleList}`}>Поддержка</li>
        </ul>
    )
}