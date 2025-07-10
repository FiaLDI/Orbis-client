import React, { useEffect } from "react";
import { useGetFriendQuery, useLazyGetInfoUserQuery, useLazyGetFriendQuery,
    useLazyGetInviteIQuery,
    useLazyGetInviteMeQuery, 
    useConfirmFriendMutation,
    useRejectFriendMutation,
    useStartChattingMutation} from "../../api/userApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setFriendMode, startSearch } from "../../userSlices";
import { CircleMinus, CirclePlus, MessageSquare } from "lucide-react";
import { DefaultButton } from "@/components/ui/Button/DefaultButton";




const FriendList: React.FC = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(s => s.user.friendsMode);
    const friends = useAppSelector(s => s.user.friends);
    const [trigger] = useLazyGetInfoUserQuery();
    const [getFriends] = useLazyGetFriendQuery();
    const [getInvI] = useLazyGetInviteIQuery();
    const [getInvMe] = useLazyGetInviteMeQuery();
    const [confirm, {isSuccess: confirmSuccess}] = useConfirmFriendMutation();
    const [reject, {isSuccess: confirmReject}] = useRejectFriendMutation();
    const [startChatting, {isSuccess: isSuccessChat, isError: isErrorChat}] = useStartChattingMutation();
    const {} = useGetFriendQuery({});
    
    const handleClick = (id: number) => {
        trigger(id); // Выполняем запрос с конкретным ID
    };

    useEffect(() => {
        if (!mode) return;
        const modeActions: Record<string, () => void> = {
            'All': () => getFriends({}),
            'My Invite': () => getInvMe({}),
            'Invite': () => getInvI({}),
            'Online': () => getFriends({}),
            'Offline': () => getFriends({}),
        };

        const action = modeActions[mode];
        if (action) {
            action();
        }
    }, [mode]);

    useEffect(()=> {
        if (confirmSuccess || confirmReject) {
            dispatch(setFriendMode(mode))
        }
    }, [confirmSuccess, confirmReject])


    return (
        <>
            <div className="w-full h-full flex flex-col text-white p-5 rounded-[5px]">
                    <div className="flex bg-[#2e3ed34f] text-white text-1xl p-2 pl-20 pr-20 items-center gap-5 rounded-[5px]">
                        <h1>Friends</h1>
                        <DefaultButton handler={()=> {
                            dispatch(setFriendMode('All'))
                        }}>
                            All Friends
                        </DefaultButton>
                        <DefaultButton handler={()=> {
                            dispatch(setFriendMode('Online'))
                        }}>
                            Online Friends
                        </DefaultButton>
                        <DefaultButton handler={()=> {
                            dispatch(setFriendMode('Offline'))
                        }}>
                            Offline Friends
                        </DefaultButton>
                        <DefaultButton handler={()=> {
                            dispatch(setFriendMode('Invite'))
                        }}>
                            Sent Invites
                        </DefaultButton>
                        <DefaultButton handler={()=> {
                            dispatch(setFriendMode('My Invite'))
                        }}>
                            Received Invites
                        </DefaultButton>
                        
                        <DefaultButton handler={() => dispatch(startSearch())}>Add friend</DefaultButton>
                    </div>
                    <ul className="bg-[#25309b88] h-full flex flex-col gap-5 p-5 rounded-b-[5px]">
                    {friends && friends.map((val)=>(
                        <li key={`friend-${val.id}-${val.username}-item`} className="flex bg-[#4b58cc88] p-2 items-center">
                                <div className="w-full flex gap-3 items-center" onClick={()=> {
                                handleClick(val.id)
                            }}>
                                <img src="/img/icon.png" alt="" width={"30px"} height={"30px"}/> <span>{val.username}</span>
                            </div>
                            
                            <div className="flex gap-2">
                                {mode == 'My Invite' &&
                                    <>
                                    <button className="" onClick={()=>{
                                        confirm(val.id);
                                    }}>
                                        <CirclePlus color="white" size={30} strokeWidth={"1.25"}/>
                                    </button>
                                    <button className="" onClick={() => {
                                        reject(val.id);
                                    }}>
                                        <CircleMinus color="white" size={30} strokeWidth={"1.25"}/>
                                    </button>
                                    </>
                                } 
                                
                                <button className="" onClick={()=> {
                                    startChatting(val.id)
                                }}>
                                    <MessageSquare color="white" size={30} strokeWidth={"1.25"}/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>          
            </div>
        </>
    );
};

export default FriendList
