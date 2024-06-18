import { useState } from "react";
import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import Services from "@/components/Services";
import Audio from "@/components/Audio";

const AudioGenerationPage = () => {
    const [message, setMessage] = useState<string>("");

    return (
        <Layout>
            <Chat title="Hello">
                <Question content="Hello 🙂" time="Just now" />
                <Answer>Hello! How can I help you today?</Answer>
                <Question content="Show me what you can do" time="Just now" />
                <Answer loading />
                <Answer time="Just now">
                    <Services />
                </Answer>
                <Question
                    content={
                        <>
                            <p>Text to speech voice:</p>
                            <p>
                                Introducing &quot;Medibot&quot;, an AI-powered
                                product that can turn any written script into
                                high-quality audio. Using advanced natural
                                language processing and text-to-speech
                                technology.
                            </p>
                        </>
                    }
                    time="Just now"
                />
                <Answer time="Just now">
                    <Audio />
                </Answer>
            </Chat>
            <Message
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
            />
        </Layout>
    );
};

export default AudioGenerationPage;
