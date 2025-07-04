import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setActiveChat, useChatMessages } from "@/features/chat";
import { CreateServerForm, setActiveServer, useLazyGetServersMembersQuery } from "@/features/server";
import { FriendList, Search, UserProfile } from "@/features/user";
import { setBigMode, VoiceComponets } from "@/features/voice";
import React, { useEffect } from "react";
import { AppMenu } from "./components/AppMenu";
import { MessageMenu } from "./components/MessagesMenu";
import { MemberChatServer } from "./components/server/MemberChatServer";
import { Action } from "./components/personal/Action";

export const CommunicatePage: React.FC = () => {
    const dispatch = useAppDispatch();

    const server = useAppSelector((state) => state.server);
    const activeChat = useAppSelector((state) => state.chat.activeChat);
    const status = useAppSelector(s => s.voice.status)
    const isConnection = (status === 'connected');
    const bigMode = useAppSelector(s => s.voice.bigMode);
    const [trigger] = useLazyGetServersMembersQuery();
    
    const activeServerId = server.activeserver?.id;
    
    useEffect(() => {
        if (activeServerId) {
            dispatch(setBigMode(false));
            trigger(activeServerId);
            dispatch(setActiveChat(undefined));
        }
    }, [activeServerId]);

    useEffect(() => {
        dispatch(setBigMode(false));
        dispatch(setActiveServer(undefined));
        dispatch(setActiveChat(undefined));
    }, [dispatch]);

    const {} = useChatMessages();

    // const {
    //     localPeerId,
    // } = useDelayedVoiceChat();

    const hasActiveChat = Boolean(activeChat);
    const hasActiveServer = Boolean(server.activeserver);

    if (hasActiveServer) {
        return (
            <>
            
            {hasActiveServer && <MemberChatServer />}
            </>
        )
    }

    return (
        <div className="flex h-screen w-screen">

            {/* {Меню приложения} */}
            <AppMenu />

            {/* {Профиль пользователей} */}
            <UserProfile />

            {/* {Добавление сервера} */}
            <CreateServerForm />

            {/* {Поиск друзей} */}
            <Search />

            {/* {На сервере: чаты и голосовые сервера, в лс: чаты пользователя} */}
            <MessageMenu />

            {(isConnection && bigMode) &&
                <div className="w-full h-full flex flex-col justify-between items-center p-10">
                    <VoiceComponets.VoiceMemberManager />
                 </div>
            }

            {/* {Чат} */}
            {(hasActiveChat && !bigMode) ? (
                <div className="w-full h-screen">
                    <Action />
                </div>
                
            ): !bigMode && hasActiveChat  && (<div className="w-full"></div>)}

            {/* {Список друзей} */}
            {!hasActiveChat && !hasActiveServer && <FriendList />}


            {/* {Аудио менеджер} */}
            <VoiceComponets.AudioManager />

        </div>
    );
};
