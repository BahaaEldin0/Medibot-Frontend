// import { useState, useEffect, ChangeEventHandler } from "react";
// import TextareaAutosize from "react-textarea-autosize";
// import Icon from "@/components/Icon";
// import AddFile from "./AddFile";
// import Files from "./Files";

// type MessageProps = {
//     value: any;
//     onChange: ChangeEventHandler<HTMLTextAreaElement>;
//     onSend: (message: any) => void;
//     placeholder?: string;
//     image?: string;
//     document?: any;
// };

// const Message = ({ value, onChange, onSend, placeholder, image, document }: MessageProps) => {
//     const [conversationId, setConversationId] = useState<string | null>(null);
//     const [ws, setWs] = useState<WebSocket | null>(null);
//     const stylesButton = "group absolute right-3 bottom-2 w-10 h-10";

//     const handleSendMessage = async () => {
//         if (value.trim() === "") return;

//         const newMessage = { content: value, time: new Date().toLocaleTimeString(), type: "question" };
//         onSend(newMessage);

//         const token = localStorage.getItem('token');
//         const userId = localStorage.getItem('_id');

//         // Ensure userId is a valid ObjectId
//         if (!userId || userId.length !== 24) {
//             console.error("Invalid user ID");
//             return;
//         }

//         if (!conversationId) {
//             // Create new conversation
//             try {
//                 const response = await fetch("https://medibot-backend-docker.redcliff-fa17bb4c.uaenorth.azurecontainerapps.io/chat/createchat", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "_id": userId,
//                         "token": token
//                     },
//                     body: JSON.stringify({ title: value })
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log("Created a new conversation:", data);
//                     setConversationId(data);
//                     connectToWebSocket(token, userId, data);
//                 } else {
//                     console.error("Failed to create a new conversation");
//                 }
//             } catch (error) {
//                 console.error("An error occurred while creating a new conversation", error);
//             }
//         } else if (ws) {
//             // Send message through WebSocket
//             console.log("Sending message through WebSocket");
//             console.log("conversationId", conversationId, "sender_id", userId, "message", value);
//             const payload = {
//                 message: value,
//                 sender_id: userId,
//                 chat_id: conversationId,
//             };
//             ws.send(JSON.stringify(payload));
//         }

//         // Clear the message input
//         onChange({ target: { value: "" } } as React.ChangeEvent<HTMLTextAreaElement>);
//     };

//     const connectToWebSocket = (token: string | null, userId: string | null, convID: string | null) => {
//         const wsInstance = new WebSocket("ws://medibot-backend-docker.redcliff-fa17bb4c.uaenorth.azurecontainerapps.io/ws");
        
//         const final_conv_id = convID ? convID : conversationId;

//         wsInstance.onopen = () => {
//             console.log("Connected to WebSocket");
//             console.log("chat_id", final_conv_id);
//             if (wsInstance.readyState === WebSocket.OPEN && token && userId) {
//                 wsInstance.send(JSON.stringify({ sender_id: userId, chat_id: final_conv_id, message: value }));
//             }
//         };

//         wsInstance.onmessage = (event) => {
//             const message = JSON.parse(event.data);
//             console.log("Received message:", message);
//             onSend({ content: message.message, time: new Date().toLocaleTimeString(), type: "answer" });
//         };

//         wsInstance.onclose = () => {
//             console.log("Disconnected from WebSocket");
//         };

//         setWs(wsInstance);
//     };

//     useEffect(() => {
//         return () => {
//             if (ws) {
//                 ws.close();
//             }
//         };
//     }, [ws]);

//     return (
//         <div className="relative z-5 px-10 pb-6 before:absolute before:-top-6 before:left-0 before:right-6 before:bottom-1/2 before:bg-gradient-to-b before:to-n-1 before:from-n-1/0 before:pointer-events-none 2xl:px-6 2xl:pb-5 md:px-4 md:pb-4 dark:before:to-n-6 dark:before:from-n-6/0">
//             <div className="relative z-2 border-2 border-n-3 rounded-xl overflow-hidden dark:border-n-5">
//                 {(image || document) && (
//                     <Files image={image} document={document} />
//                 )}
//                 <div className="relative flex items-center min-h-[3.5rem] px-16 text-0">
//                     <AddFile />
//                     <TextareaAutosize
//                         className="w-full py-3 bg-transparent body2 text-n-7 outline-none resize-none placeholder:text-n-4/75 dark:text-n-1 dark:placeholder:text-n-4"
//                         maxRows={5}
//                         autoFocus
//                         value={value}
//                         onChange={onChange}
//                         placeholder={placeholder || "Ask Medibot anything"}
//                     />
//                     <button
//                         className={`${stylesButton} ${value ? 'bg-primary-1 rounded-xl transition-colors hover:bg-primary-1/90' : ''}`}
//                         onClick={handleSendMessage}
//                         disabled={value === ""}
//                     >
//                         <Icon className="fill-n-1" name="arrow-up" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Message;


// import { ChangeEventHandler } from "react";
// import TextareaAutosize from "react-textarea-autosize";
// import Icon from "@/components/Icon";
// import AddFile from "./AddFile";
// import Files from "./Files";

// type MessageProps = {
//     value: any;
//     onChange: ChangeEventHandler<HTMLTextAreaElement>;
//     onSend: (message: any) => void;
//     placeholder?: string;
//     image?: string;
//     document?: any;
// };

// const Message = ({ value, onChange, onSend, placeholder, image, document }: MessageProps) => {
//     const stylesButton = "group absolute right-3 bottom-2 w-10 h-10";

//     const handleSendMessage = () => {
//         if (value.trim() === "") return;

//         const newMessage = { content: value, time: new Date().toLocaleTimeString(), type: "question" };
//         onSend(newMessage);

//         onChange({ target: { value: "" } } as React.ChangeEvent<HTMLTextAreaElement>);
//     };

//     return (
//         <div className="relative z-5 px-10 pb-6 before:absolute before:-top-6 before:left-0 before:right-6 before:bottom-1/2 before:bg-gradient-to-b before:to-n-1 before:from-n-1/0 before:pointer-events-none 2xl:px-6 2xl:pb-5 md:px-4 md:pb-4 dark:before:to-n-6 dark:before:from-n-6/0">
//             <div className="relative z-2 border-2 border-n-3 rounded-xl overflow-hidden dark:border-n-5">
//                 {(image || document) && (
//                     <Files image={image} document={document} />
//                 )}
//                 <div className="relative flex items-center min-h-[3.5rem] px-16 text-0">
//                     <AddFile />
//                     <TextareaAutosize
//                         className="w-full py-3 bg-transparent body2 text-n-7 outline-none resize-none placeholder:text-n-4/75 dark:text-n-1 dark:placeholder:text-n-4"
//                         maxRows={5}
//                         autoFocus
//                         value={value}
//                         onChange={onChange}
//                         placeholder={placeholder || "Ask Medibot anything"}
//                     />
//                     <button
//                         className={`${stylesButton} ${value ? 'bg-primary-1 rounded-xl transition-colors hover:bg-primary-1/90' : ''}`}
//                         onClick={handleSendMessage}
//                         disabled={value === ""}
//                     >
//                         <Icon className="fill-n-1" name="arrow-up" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Message;

import { useState, ChangeEventHandler } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Icon from "@/components/Icon";
import AddFile from "./AddFile";
import Files from "./Files";

type MessageProps = {
    value: any;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    onSend: (message: any) => void;
    onFileUpload: (file: File) => void; // Add this line
    placeholder?: string;
    image?: string;
    document?: any;
};

const Message = ({ value, onChange, onSend, onFileUpload, placeholder, image, document }: MessageProps) => {
    const stylesButton = "group absolute right-3 bottom-2 w-10 h-10";

    const handleSendMessage = () => {
        if (value.trim() === "") return;

        const newMessage = { content: value, time: new Date().toLocaleTimeString(), type: "question" };
        onSend(newMessage);

        onChange({ target: { value: "" } } as React.ChangeEvent<HTMLTextAreaElement>);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileUpload(e.target.files[0]);
        }
    };

    return (
        <div className="relative z-5 px-10 pb-6 before:absolute before:-top-6 before:left-0 before:right-6 before:bottom-1/2 before:bg-gradient-to-b before:to-n-1 before:from-n-1/0 before:pointer-events-none 2xl:px-6 2xl:pb-5 md:px-4 md:pb-4 dark:before:to-n-6 dark:before:from-n-6/0">
            <div className="relative z-2 border-2 border-n-3 rounded-xl overflow-hidden dark:border-n-5">
                {(image || document) && (
                    <Files image={image} document={document} />
                )}
                <div className="relative flex items-center min-h-[3.5rem] px-16 text-0">
                    <AddFile />
                    <TextareaAutosize
                        className="w-full py-3 bg-transparent body2 text-n-7 outline-none resize-none placeholder:text-n-4/75 dark:text-n-1 dark:placeholder:text-n-4"
                        maxRows={5}
                        autoFocus
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder || "Ask Medibot anything"}
                    />
                    <input type="file" onChange={handleFileChange} className="ml-2" />
                    <button
                        className={`${stylesButton} ${value ? 'bg-primary-1 rounded-xl transition-colors hover:bg-primary-1/90' : ''}`}
                        onClick={handleSendMessage}
                        disabled={value === ""}
                    >
                        <Icon className="fill-n-1" name="arrow-up" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Message;

