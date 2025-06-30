import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "@/components/scroll/ScrolltoUP";
import ScrollTop from "@/components/scroll/Top";

export const Header = () => {
    const navigator = useNavigate();
    const [burgerActive, setBurgerActive] = useState<boolean>(true);
    const [showMenu, setShowMenu] = useState<boolean>();
    const burgerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setBurgerActive(window.innerWidth > 1199);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (
                !burgerActive &&
                burgerRef.current &&
                !burgerRef.current.contains(event.target as Node)
            ) {
                setBurgerActive(true);
            }
        };

        const handleScroll = () => {
            setBurgerActive(true);
        };

        window.addEventListener("resize", handleResize);
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
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

    return (
        <>
            <ScrollToTop />
            <ScrollTop />
            <div className=""></div>
            <header className=" flex bg-[rgba(54,62,180,0.27)] text-white justify-between p-2 pl-15 pr-15  items-center">
                <div className="flex items-center gap-5">
                    <div className="">
                        <img src="/img/icon.png" alt="" />
                    </div>
                    <div
                        className=" text-4xl"
                        onClick={() => navigator("/")}
                    >
                        ORBIS
                    </div>
                </div>

                <nav ref={burgerRef} className="relative">
                    { window.innerWidth < 1199 &&
                    <button onClick={() => handleBurger()}>
                        <img src="/img/burger.svg" alt="" />
                    </button>
                    }
                    {
                        (burgerActive || window.innerWidth > 1199) && <ul
                        className={
                            !(window.innerWidth < 1199)
                                ? "flex gap-10"
                                : "top-14 absolute flex-col bg-blue-950 w-40"
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
                        <li className="p-3" onClick={() => handleBurger("/")}>Новости</li>
                        
                    </ul>
                    }
                    
                    
                </nav>
                <div className="">
                    <button className="text-4xl" onClick={() => navigator("/login")}>SING IN</button>
                </div>
            </header>
        </>
    );
};
