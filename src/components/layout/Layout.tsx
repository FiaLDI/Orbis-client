import React, { PureComponent } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <>
            <Main></Main>
            <Header />
            <main className="w-full">
                {children}
            </main>
            <Footer />
        </>
    );
};
