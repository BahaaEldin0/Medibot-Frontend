import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Menu from "@/components/Menu";
import { navigation } from "@/constants/navigation";

const ChatPage = () => {
    const router = useRouter();
    const { chat_id } = router.query;
    const [chat, setChat] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const wsRef = useRef<WebSocket | null>(null);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if (chat_id) {
            fetchChat(chat_id as string);
        }
    }, [chat_id]);

    const fetchChat = async (chatId: string) => {
        const token = localStorage.getItem('token');
        const _id = localStorage.getItem('_id');

        if (!token || !_id) {
            console.error("Missing token or user ID");
            return;
        }

        try {
            const response = await axios.get(`https://medibot-backend-docker.redcliff-fa17bb4c.uaenorth.azurecontainerapps.io/chat/${chatId}`, {
                headers: {
                    '_id': _id,
                    'token': token,
                },
            });
            setChat(response.data);
            transformMessages(response.data);
            connectToWebSocket(chatId);
        } catch (error) {
            console.error("Error fetching chat:", error);
        }
    };

    // const transformMessages = (data: any) => {
    //     const transformed = data.map((message: any) => ({
    //         type: message[1].startsWith("USER:") ? "question" : "answer",
    //         content: message[1].replace(/^(USER:|Agent:)\s*/, ""), // Remove the "USER:" or "Agent:" prefix
    //         time: new Date().toLocaleTimeString(), // Adjust this to your actual time data
    //     }));
    //     setMessages(transformed);
    // };

    const transformMessages = (data: any) => {
        const transformed = data
            .map((message: any) => ({
                type: message[1].startsWith("USER:") ? "question" : "answer",
                content: message[1].replace(/^(USER:|Agent:)\s*/, ""), // Remove the "USER:" or "Agent:" prefix
                time: new Date().toLocaleTimeString(), // Adjust this to your actual time data
            }))
            .filter((message: any) => message.content.trim() !== ""); // Filter out messages with empty content
        setMessages(transformed);
    };

    const connectToWebSocket = (convId: string) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('_id');

        const ws = new WebSocket("ws://medibot-backend-docker.redcliff-fa17bb4c.uaenorth.azurecontainerapps.io/ws");

        ws.onopen = () => {
            if (ws.readyState === WebSocket.OPEN && token && userId) {
                ws.send(JSON.stringify({ message: message, sender_id: userId, chat_id: convId }));
            }
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            addMessage({ content: message.response, time: new Date().toLocaleTimeString(), type: "answer" });
        };

        ws.onclose = () => {
            setTimeout(() => connectToWebSocket(convId), 1000);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            ws.close();
        };

        wsRef.current = ws;
    };

    const addMessage = (newMessage: any) => {
        console.log("newMessage", newMessage);
        
        if (newMessage.content !== undefined) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
    };

    const handleSendMessage = async (msg: any) => {
        addMessage(msg);

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('_id');

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ message: msg.content, chat_id: chat_id, sender_id: userId }));
        } else {
            console.error("WebSocket is not open");
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
        <Layout>
            <div className="grow px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none 2xl:py-12 md:px-4 md:pt-0 md:pb-6">
            {chat ? (
                <>
                    <Menu className="max-w-[30.75rem] mx-auto" items={navigation} />
                    <Chat title={chat.title} messages={messages} />
                </>
                ) : (
                    <p>Loading chat...</p>
                )}
                
            </div>
            <Message
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                    onSend={handleSendMessage}
                    onFileUpload={handleFileUpload}
                />
        </Layout>
    );
};

export default ChatPage;
