import React, { useMemo } from "react";
import { Message, SingleMessageProps } from "../types/chat.types";
import { useAppSelector } from "@/app/hooks";
import { makeSelectIsMessageOpen } from "../chatSelector";
import { config } from "@/config";


const SingleMessageComponent: React.FC<SingleMessageProps> = ({ message, onClick }) => {
  const selectIsOpen = useMemo(() => makeSelectIsMessageOpen(String(message.id)), [message.id]);
  const isOpen = useAppSelector(selectIsOpen);
  return (
    <div
      onContextMenu={onClick}
      
      className={isOpen ? " bg-[#7895f3] flex gap-3" : "flex gap-3"}
    >
      <div className=" self-start p-1">
        <img
          src="/img/icon.png"
          alt={`Аватар ${message.username}`}
          width={40}
          height={40}
        />
      </div>
      <div className="" >
        <h3 className="">
          {message.username}
          <span className=""> {message.timestamp.slice(0, 5)}</span>
        </h3>
        {message.content?.map((val) => (
          <div className="text" key={`message-text-${val.id}`}>
            {val.type === "url" ? (
              val.text.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                <div>
                  <img src={val.url} alt="image" style={{ maxWidth: "700px" }} />
                </div>
              ) : (
                <>
                  {val.text.split("/").pop()}{" "}
                  <a
                    href={`${config.cdnServiceUrl}/download?url=${encodeURIComponent(val.text)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Скачать файл
                  </a>
                </>
              )
            ) : (
              val.text
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// мемоизация компонента
export const SingleMessage = React.memo(
  SingleMessageComponent,
  (prevProps, nextProps) => prevProps.message === nextProps.message
);
