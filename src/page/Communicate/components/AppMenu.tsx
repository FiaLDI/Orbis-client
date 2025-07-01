import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useServerJournalContext } from "@/contexts/ServerJournalSocketContext";
import { useLogoutUserMutation } from "@/features/auth";
import { setActiveChat } from "@/features/chat";
import { initCreateServer, setActiveServer, useGetServersQuery } from "@/features/server";
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

    useEffect(()=> {
        dispatch(setActiveChat(undefined))
    }, [server.activeserver])
    
    return (
        <>
            <div className="w-fit flex flex-col justify-between items-center h-full bg-[rgba(29,27,100,0.5)] p-1 pt-5 pb-5 relative">
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
                <div className="flex gap-5 flex-col">
                   
                    {server.servers &&
                        server.servers.map((val, index) => (
                            <div
                                className="flex"
                                key={`server-${val.id}`}
                            >
                                <button
                                    onClick={async() => {
                                        if (server.activeserver?.id == val.id) return;
                                        socket?.emit('leave-server', server.activeserver?.id);
                                        dispatch(setActiveServer(val));
                                        
                                        socket?.emit('join-server', val.id)
                                    }}
                                    className="flex justify-center overflow-hidden box-border text-white rounded-full bg-[#405fc5] w-full h-full text-center p-3"
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
                            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.125 22.5H22.5M22.5 22.5H16.875M22.5 22.5V16.875M22.5 22.5V28.125" stroke="#FFF" strokeWidth="1.25" strokeLinecap="round"/>
                                <path d="M13.125 6.25841C15.8829 4.66307 19.0849 3.75 22.5 3.75C32.8552 3.75 41.25 12.1447 41.25 22.5C41.25 32.8552 32.8552 41.25 22.5 41.25C12.1447 41.25 3.75 32.8552 3.75 22.5C3.75 19.0849 4.66307 15.8829 6.25841 13.125" stroke="#FFF" strokeWidth="1.25" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div className="exit settings">
                        <button className="" onClick={() => {
                            navigator("/app/settings")
                        }}>
                            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7058 37.8711C18.5096 40.1237 20.4116 41.25 22.5 41.25C24.5884 41.25 26.4904 40.1237 30.2942 37.8711L31.5808 37.1091C35.3846 34.8564 37.2866 33.7301 38.3308 31.875C39.375 30.0199 39.375 27.7672 39.375 23.2618M39.0276 15C38.8736 14.3017 38.6514 13.6946 38.3308 13.125C37.2866 11.2698 35.3846 10.1435 31.5808 7.89086L30.2942 7.12896C26.4904 4.87631 24.5884 3.75 22.5 3.75C20.4116 3.75 18.5096 4.87631 14.7058 7.12896L13.4192 7.89086C9.61538 10.1435 7.71345 11.2698 6.66923 13.125C5.625 14.9802 5.625 17.2328 5.625 21.7382V23.2618C5.625 27.7672 5.625 30.0199 6.66923 31.875C7.09361 32.6289 7.65967 33.2625 8.4375 33.9004" stroke="#FFF" strokeWidth="1.25" strokeLinecap="round"/>
                                <path d="M22.5 28.125C25.6066 28.125 28.125 25.6066 28.125 22.5C28.125 19.3934 25.6066 16.875 22.5 16.875C19.3934 16.875 16.875 19.3934 16.875 22.5C16.875 25.6066 19.3934 28.125 22.5 28.125Z" stroke="#FFF" strokeWidth="1.25"/>
                            </svg>

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
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.875 8.4375H15C10.5806 8.4375 8.37088 8.4375 6.99793 9.81043C5.625 11.1834 5.625 13.3931 5.625 17.8125V18.75M16.875 36.5625H15C10.5806 36.5625 8.37088 36.5625 6.99793 35.1896C5.625 33.8166 5.625 31.6069 5.625 27.1875V26.25" stroke="#FFF" strokeWidth="1.25" strokeLinecap="round"/>
                            <path d="M25.608 4.40129C21.5541 3.69423 19.5272 3.3407 18.2011 4.5163C16.875 5.69191 16.875 7.84235 16.875 12.1432V32.8567C16.875 37.1576 16.875 39.3081 18.2011 40.4837C19.5272 41.6593 21.5541 41.3057 25.608 40.5986L29.9745 39.8372C34.4642 39.054 36.7089 38.6625 38.0421 37.0157C39.375 35.3691 39.375 32.9874 39.375 28.2242V16.7758C39.375 12.0126 39.375 9.63097 38.0421 7.98423C37.1513 6.88373 35.8532 6.34383 33.75 5.87302" stroke="#FFF" strokeWidth="1.25" strokeLinecap="round"/>
                            <path d="M22.5 20.625V24.375" stroke="#FFF" strokeWidth="1.25" strokeLinecap="round"/>
                        </svg>


                    </button>
                </div>
                </div>
                
            </div>
        </>
    );
};
