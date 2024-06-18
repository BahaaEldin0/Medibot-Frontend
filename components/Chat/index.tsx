// import { useState } from "react";
// import Icon from "@/components/Icon";
// import ModalShareChat from "@/components/ModalShareChat";
// import Actions from "./Actions";
// import Question from "@/components/Question";
// import Answer from "@/components/Answer";

// type ChatProps = {
//     title: string;
//     messages: any[];
// };

// const Chat = ({ title, messages }: ChatProps) => {
//     const [favorite, setFavorite] = useState<boolean>(false);
//     const [visibleModal, setVisibleModal] = useState<boolean>(false);

//     return (
//         <>
//             <div className="relative z-2 grow p-10 space-y-10 overflow-y-auto scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
//                 {messages.map((message, index) => (
//                     message.type === "question" ? (
//                         <Question key={index} content={message.content} time={message.time} />
//                     ) : (
//                         <Answer key={index} time={message.time}>{message.content}</Answer>
//                     )
//                 ))}
//             </div>
//             <ModalShareChat
//                 visible={visibleModal}
//                 onClose={() => setVisibleModal(false)}
//             />
//         </>
//     );
// };

// export default Chat;

import { useState } from "react";
import Icon from "@/components/Icon";
import ModalShareChat from "@/components/ModalShareChat";
import Actions from "./Actions";
import Question from "@/components/Question";
import Answer from "@/components/Answer";

type ChatProps = {
    title: string;
    messages: any[];
};

const Chat = ({ title, messages }: ChatProps) => {
    const [favorite, setFavorite] = useState<boolean>(false);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    return (
        <>
            <div className="relative z-2 grow p-10 space-y-10 overflow-y-auto scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
                {messages.map((message, index) => {
                    if (message.type === "question") {
                        return <Question key={index} content={message.content} time={message.time} />;
                    } else if (message.type === "file") {
                        return (
                            <div key={index} className="flex flex-col items-start">
                                <p className="bg-gray-100 p-4 rounded-lg">{message.content}</p>
                                <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                        );
                    } else if(message.content !== undefined) {
                        return <Answer key={index} time={message.time}>{message.content}</Answer>;
                    }
                })}
            </div>
            <ModalShareChat
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
                // title="Share conversation"
            />
            <Actions
                // title={title}
                // favorite={favorite}
                // setFavorite={setFavorite}
                // setVisibleModal={setVisibleModal}
            />
        </>
    );
};

export default Chat;
