import React from "react";

export const ModalLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        
        <div className="fixed z-1000 flex justify-center align-center w-full h-full">
            <div className=" bg-[#3247be] w-fit h-fit">
                {children}
            </div>
        </div>
        
    );
};
