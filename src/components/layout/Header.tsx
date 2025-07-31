import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "@/components/scroll/ScrolltoUP";
import ScrollTop from "@/components/scroll/Top";
import { Menu } from "lucide-react";

export const Header = () => {
    const navigator = useNavigate();
    const [burgerActive, setBurgerActive] = useState<boolean>(true);
    const [showMenu, setShowMenu] = useState<boolean>();

    useEffect(() => {
        const handleResize = () => {
            setBurgerActive(window.innerWidth > 1199);
        };


        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleBurger = useCallback((locate?: string) => {
        if (locate) {
            navigator(locate);
        }

        if (window.innerWidth < 1199) {
            setBurgerActive((prevState) => !prevState);
        }
    }, []);

    const NavBar = () => {
        
        return (
            <ul
                className={
                    !(window.innerWidth < 1199)
                        ? "flex gap-10"
                        : "top-40 flex-col bg-blue-950 w-full text-4xl"
                }
            >
                <li className="p-3" onClick={() => handleBurger("/")}>Загрузить</li>
                <li className="p-3" onClick={() => handleBurger("/")}>
                    Узнать больше
                </li>
                <li className="p-3" onClick={() => handleBurger("/political")}>
                    Политика
                </li>
                <li className="p-3" onClick={() => handleBurger("/")}>Поддержка</li>
                
            </ul>
        )
    }

    return (
            <header className="  bg-[rgba(54,62,180,0.27)] text-white ">
                <div className="flex justify-between items-center py-10 px-5 lg:py-2">
                    <div className="flex items-center gap-5">
                        <div className="">
                            <img src="/img/icon.png" alt="" />
                        </div>
                        <div
                            className="font-[sarpanch] text-5xl "
                            onClick={() => navigator("/")}
                        >
                            ORBIS
                        </div>
                    </div>
                    { window.innerWidth < 1199 ?
                        <button onClick={() => handleBurger()}>
                            <Menu width={50} height={50}/>
                        </button>
                    : <NavBar />}
                    <div className="">
                        <button className="text-5xl" onClick={() => navigator("/login")}>SING IN</button>
                    </div>
                </div>
                {window.innerWidth < 1199 && <nav className=" absolute w-full">
                    {
                        (burgerActive || window.innerWidth > 1199) && <NavBar />
                    }
                </nav>}
                
            </header>
    );
};
