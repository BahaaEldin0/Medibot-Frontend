// import { useState, useEffect, useRef } from "react";
// import Message from "@/components/Message";
// import Menu from "@/components/Menu";
// import Chat from "@/components/Chat";
// import { navigation } from "@/constants/navigation";

// type MainProps = {};

// const Main = ({}: MainProps) => {
//     const [message, setMessage] = useState<string>("");
//     const [messages, setMessages] = useState<any[]>([]);
//     const [conversationId, setConversationId] = useState<string | null>(null);
//     const wsRef = useRef<WebSocket | null>(null);

//     const addMessage = (newMessage: any) => {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };

//     const connectToWebSocket = (convId: string) => {
//         const token = localStorage.getItem('token');
//         const userId = localStorage.getItem('_id');

//         const ws = new WebSocket("ws://medibot-backend-docker.redcliff-fa17bb4c.uaenorth.azurecontainerapps.io/ws");

//         console.log("in start of connect function Convo ID: ", convId);
//         ws.onopen = () => {
//             console.log("Connected to WebSocket--", convId);
//             if (ws.readyState === WebSocket.OPEN && token && userId) {
//                 ws.send(JSON.stringify({ message:message, sender_id: userId, chat_id: convId }));
//             }
//         };

//         ws.onmessage = (event) => {
//             const message = JSON.parse(event.data);
//             console.log("Convo under onmessage: ", convId)
//             console.log("Received message:", message);
//             addMessage({ content: message.response, time: new Date().toLocaleTimeString(), type: "answer" });
//         };

//         ws.onclose = () => {
//             console.log("Convo under onclose: ", convId)
//             console.log("Disconnected from WebSocket, reconnecting...");
//             setTimeout(() => connectToWebSocket(convId), 1000);
//         };

//         ws.onerror = (error) => {
//             console.error("WebSocket error:", error);
//             ws.close();
//         };

//         wsRef.current = ws;
//     };

//     const handleSendMessage = async (msg: any) => {
//         addMessage(msg);

//         const token = localStorage.getItem('token');
//         const userId = localStorage.getItem('_id');

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
//                     body: JSON.stringify({ title: msg.content })
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log("Created a new conversation:", data);
//                     setConversationId(data);
//                     connectToWebSocket(data.toString());
//                 } else {
//                     console.error("Failed to create a new conversation");
//                 }
//             } catch (error) {
//                 console.error("An error occurred while creating a new conversation", error);
//             }
//         } else if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
//             // Send message through WebSocket
//             console.log("Sending message through WebSocket");
//             wsRef.current.send(JSON.stringify({ message: msg.content, chat_id: conversationId, sender_id: userId }));
//         }
//     };

//     useEffect(() => {
//         return () => {
//             if (wsRef.current) {
//                 wsRef.current.close();
//             }
//         };
//     }, []);

//     return (
//         <>
//             <div className="grow px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none 2xl:py-12 md:px-4 md:pt-0 md:pb-6">
//                 <Menu className="max-w-[30.75rem] mx-auto" items={navigation} />
//                 <Chat title="Promotional content" messages={messages} />
//             </div>
            
//             <Message
//                 value={message}
//                 onChange={(e: any) => setMessage(e.target.value)}
//                 onSend={handleSendMessage}
//             />
//         </>
//     );
// };

// export default Main;

import { useState, useEffect, useRef } from "react";
import Message from "@/components/Message";
import Menu from "@/components/Menu";
import Chat from "@/components/Chat";
import { navigation } from "@/constants/navigation";

type MainProps = {};

const Main = ({}: MainProps) => {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<any[]>([]);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    const addMessage = (newMessage: any) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const connectToWebSocket = (convId: string) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('_id');

        const ws = new WebSocket("ws://medibot-backend-docker.redcliff-fa17bb4c.uaenorth.azurecontainerapps.io/ws");

        console.log("in start of connect function Convo ID: ", convId);
        ws.onopen = () => {
            console.log("Connected to WebSocket--", convId);
            if (ws.readyState === WebSocket.OPEN && token && userId) {
                ws.send(JSON.stringify({ message: message, sender_id: userId, chat_id: convId }));
            }
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("Convo under onmessage: ", convId);
            console.log("Received message:", message);
            addMessage({ content: message.response, time: new Date().toLocaleTimeString(), type: "answer" });
        };

        ws.onclose = () => {
            console.log("Convo under onclose: ", convId);
            console.log("Disconnected from WebSocket, reconnecting...");
            setTimeout(() => connectToWebSocket(convId), 1000);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            ws.close();
        };

        wsRef.current = ws;
    };

    const handleSendMessage = async (msg: any) => {
        addMessage(msg);

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('_id');

        if (!conversationId) {
            // Create new conversation
            try {
                const response = await fetch("https://medibot-backend-docker.redcliff-fa17bb4c.uaenorth.azurecontainerapps.io/chat/createchat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "_id": userId,
                        "token": token
                    },
                    body: JSON.stringify({ title: msg.content })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Created a new conversation:", data);
                    setConversationId(data);
                    connectToWebSocket(data.toString());
                } else {
                    console.error("Failed to create a new conversation");
                }
            } catch (error) {
                console.error("An error occurred while creating a new conversation", error);
            }
        } else if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            // Send message through WebSocket
            console.log("Sending message through WebSocket");
            wsRef.current.send(JSON.stringify({ message: msg.content, chat_id: conversationId, sender_id: userId }));
        }
    };

    const handleFileUpload = (file: File) => {
        const fileMessage = {
            content: `Uploaded file: ${file.name}`,
            type: "file",
            time: new Date().toLocaleTimeString(),
            file: file,
        };
        addMessage(fileMessage);
    };

    useEffect(() => {
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    return (
        <>
            <div className="grow px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none 2xl:py-12 md:px-4 md:pt-0 md:pb-6">
                <Menu className="max-w-[30.75rem] mx-auto" items={navigation} />
                <Chat title="Promotional content" messages={messages} />
            </div>

            <Message
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
                onSend={handleSendMessage}
                onFileUpload={handleFileUpload} // Add this line
            />
        </>
    );
};

export default Main;

