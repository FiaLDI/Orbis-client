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
            <main className=" max-full">
                <div className="max-w-11/12 mb-0 mt-0 ml-auto mr-auto">
                {children}
                </div>
            </main>
            <Footer />
        </>
    );
};
