import { ButtonHome } from "@/page/Home/components/ButtonHome";
import React from "react";
import { HeroSection } from "./sections/Hero";
import { Edge } from "./sections/Edge";
import { SectionLayout } from "./components/Layout/SectionLayout";
import { ShowCase } from "./sections/Showcase";
import { Slider } from "./sections/Slider";
import { Start } from "./sections/Start";

export const HomePage = () => {
    return (
        <>
            <HeroSection />     
            <Edge />      
            <ShowCase /> 
            <Slider />
            <Start />
        </>
    );
};
