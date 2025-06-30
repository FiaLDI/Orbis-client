import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { chat, setActiveChat } from "@/features/chat";

export const ChatItem: React.FC<{ chat: chat }> = ({ chat }) => {
    const active = useAppSelector((state) => state.chat.activeChat);
    const activeServer = useAppSelector(s => s.server.activeserver?.id);
    const dispatch = useAppDispatch();

    return (
        <>
            <li
                className="bg-[#2236ec4f]"
                onClick={() => {
                    dispatch(setActiveChat(chat));
                }}
            >
                <div className={active?.chat_id == chat.chat_id ? "flex brightness-110 gap-3 items-center pr-2 pl-2 " : "flex gap-3 items-center pr-2 pl-2"}>
                    <div className="w-fit">
                        <img src={chat.avatar_url} alt="" className="w-10 h-10" width={"40px"} height={"40px"}/>
                    </div>
                    <div className="truncate w-full shrink-10 max-w-50">{activeServer ? chat.name : chat?.username}</div>
                </div>
            </li>
        </>
    );
};
