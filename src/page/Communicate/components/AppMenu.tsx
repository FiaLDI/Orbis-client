import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useServerJournalContext } from "@/contexts/ServerJournalSocketContext";
import { useLogoutUserMutation } from "@/features/auth";
import { setActiveChat } from "@/features/chat";
import { initCreateServer, setActiveServer, useGetServersQuery, useLazyGetServersInsideQuery } from "@/features/server";
import { CirclePlus, LogOut, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AppMenu: React.FC = () => {
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const [logout] = useLogoutUserMutation();
    const {} = useGetServersQuery({});
    const dispatch = useAppDispatch();
    const navigator = useNavigate();
    const server = useAppSelector((state) => state.server);
    const {socket} = useServerJournalContext();
    const [getInside] = useLazyGetServersInsideQuery();

    // useEffect(()=> {
    //     dispatch(setActiveChat(undefined))
        
    // }, [server.activeserver, ])

    
    return (
        <>
            <div className="w-fit flex flex-col justify-between items-center h-full bg-[rgba(86,82,209,0.5)] p-3 pt-5 pb-5 relative">
                <div className="flex flex-col gap-5">
                <div className="">
                    <button
                        onClick={() => {
                            dispatch(setActiveServer(undefined));
                        }}
                        className="cursor-pointer"
                        >
                                    
                    {avatarUrl ? null : (
                        <>
                            <img src="/img/icon.png" alt="" className="w-12"/>
                        </>
                    )}
                    </button>
                </div>
                <div className="flex gap-2 flex-col">
                   
                    {server.servers &&
                        server.servers.map((val, index) => (
                            <div
                                className="flex w-10 h-10"
                                key={`server-${val.id}`}
                            >
                                <button
                                    onClick={async() => {
                                        if (server.activeserver?.id == val.id) return;
                                        socket?.emit('leave-server', server.activeserver?.id);
                                        dispatch(setActiveServer(val));
                                        
                                        socket?.emit('join-server', val.id)
                                    }}
                                    className="flex justify-center items-center cursor-pointer hover:brightness-90 transition  overflow-hidden box-border text-white rounded-full bg-[#405fc5] w-full h-full text-center p-3"
                                >
                                    {val.name.slice(0, 1)}
                                </button>
                            </div>
                        ))}
                </div>
                </div>
                <div className="manage-app">

                    <div className="exit add-server">
                        <button onClick={() => {
                            dispatch(initCreateServer());
                        }}>
                            <CirclePlus color="#fff" strokeWidth={1.25} size={40}/>
                        </button>
                    </div>
                    
                    <div className="exit settings">
                        <button className="" onClick={() => {
                            navigator("/app/settings")
                        }}>
                            <Settings color="#fff" strokeWidth={1.25} size={40}/>

                        </button>
                    </div>

                    <div className="exit">
                    <button
                        onClick={async () => {
                            try {
                                await logout({}).unwrap();
                            } catch (err) {
                                console.log(err);
                            }
                        }}
                    >
                       <LogOut color="#fff" strokeWidth={1.25} size={40} />


                    </button>
                </div>
                </div>
                
            </div>
        </>
    );
};
