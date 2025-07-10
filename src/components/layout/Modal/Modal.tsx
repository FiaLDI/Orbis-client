import React from "react";

export const ModalLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        
        <div className="fixed z-1000 flex justify-center items-center w-full h-full">
            <div className=" bg-[#3247be] min-w-2/7 min-h-3/6">
                {children}
            </div>
        </div>
        
    );
};
