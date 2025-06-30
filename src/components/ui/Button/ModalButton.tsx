import React from "react";

export const ModalButton: React.FC<{ children: React.ReactNode, handler: () =>void }> = ({
    children, handler
}) => {
    return (
        <button className="bg-[#03279e] pl-5 pr-5" onClick={()=> handler()}>
            {children}
        </button>
                
                
    );
};
