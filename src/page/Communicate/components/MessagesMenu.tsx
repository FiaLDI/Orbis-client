import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetChatsUsersQuery } from "@/services/user";
import { setActiveChat } from "@/features/chat";
import { ChatItem } from "./ChatItem";
import { VoiceComponets } from "@/features/voice";

export const MessageMenu: React.FC = () => {
    const chats = useAppSelector((state) => state.user.chats);
    const dispatch = useAppDispatch();
    const {} = useGetChatsUsersQuery({});
    
    return (
        <>
            <div className="flex flex-col bg-[rgba(81,110,204,0.5)] p-5 pl-7 pr-7 gap-5 justify-between h-full">
                <div className="flex flex-col gap-5 h-full">
                <div className=" flex flex-col gap-5">
                    <div className="">
                        <button className="bg-amber-500 brightness-100 w-full pt-1 pb-1">Search</button>
                    </div>
                    <div className="">
                        <button className="bg-amber-500 brightness-100 w-full pt-1 pb-1" onClick={() => dispatch(setActiveChat(undefined))}>Friends</button>
                    
                    </div>
                </div>
                
                <ul className="flex flex-col gap-2 h-full bg-[#2e3ed34f] text-white p-2" >
                    {chats &&
                        chats.map((val, index) => (
                            <ChatItem key={index} chat={val} />
                        ))}
                </ul>
                <div className="personal-manager">
                        <VoiceComponets.VoiceManager />
                </div>
                </div>
                
            </div>
        </>
    );
};
