import { ButtonHome } from "@/page/Home/components/ButtonHome";
import React from "react";

export const HomePage = () => {
    return (
        <>
            <div className="text-white p-[7vh] h-[91vh] ">
                <div className="flex flex-col justify-around h-full">
                    <div className="flex flex-wrap gap-4 w-full">
                        <div className="flex flex-col md:w-1/3 gap-10">
                            <h1 className="shadow text-4xl text-shadow text-shadow-white text-s">
                                Чат группы, где всегда весело
                            </h1>
                            <p className="main-description text-2xl">
                                Orbis — отличное место, чтобы встретиться с
                                друзьями или создать глобальное сообщество.
                                Организуйте собственное пространство для бесед,
                                игр и хобби
                            </p>
                        </div>
                        <div className="md:w-2/3"></div>
                    </div>
                    <div className="flex justify-center gap-4">
                        <div className="">
                            <ButtonHome>Download</ButtonHome>
                        </div>
                        <div className="">
                            <ButtonHome>Open in browser</ButtonHome>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-[7vh] h-[91vh]">Демонстрация продукта,(общение)</div>
            <div className="p-[7vh] h-[91vh]">(хорошее качество звука)</div>
        </>
    );
};
