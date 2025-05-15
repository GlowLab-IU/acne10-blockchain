import React, { useState, useRef, useEffect } from "react";
import { Page, Header, Icon, Text, Input, Button } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface LocationState {
  skinConditions?: string[];
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Xin chào, tôi là chatbot AI ACNE10. Hãy cho tôi biết tình trạng da của bạn ngày hôm nay nhé !",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { skinConditions } = (location.state as LocationState) || {};
  const [initialMessageSent, setInitialMessageSent] = useState(false);

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Automatically send skin conditions to the chatbot
  useEffect(() => {
    if (skinConditions && skinConditions.length > 0 && !initialMessageSent) {
      const conditionsText = skinConditions.join(", ");
      const initialQuery = `Tôi đang gặp tình trạng mụn: ${conditionsText}. Tôi có thể điều trị các loại mụn này theo phương pháp nào?`;
      
      setNewMessage(initialQuery);
      
      // Use setTimeout to ensure state updates properly before sending
      setTimeout(() => {
        sendMessageToAPI(initialQuery);
        setInitialMessageSent(true);
      }, 500);
    }
  }, [skinConditions]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessageToAPI = async (message: string) => {
    // Add user message to chat
    const userMessage: Message = {
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    // Send message to backend API
    try {
      // Using the new API endpoint and format
      const response = await axios.post(
        "https://logically-exact-phoenix.ngrok-free.app/query", 
        {
          query: message
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      let responseText = "";
      if (response.data && response.data.result) {
        responseText = response.data.result
          .replace(/\\n/g, "\n") 
          .replace(/\n\n+/g, "\n\n")  
          .replace(/([.!?])\s*(?=\S)/g, "$1\n\n")  
          .trim(); 
      } else {
        responseText = "Sorry, I couldn't process that request.";
      }

      // Add bot response to chat
      const botMessage: Message = {
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      const errorMessage: Message = {
        text: "Sorry, there was an error processing your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    await sendMessageToAPI(newMessage);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Page className="flex flex-col h-screen">
      <Header
        className="bg-gradient-to-r from-[rgb(37,216,243)] to-[hsl(177,92%,53%)] app-header no-border pl-4 flex-none pb-[6px]"
        title={
          (
            <Text.Title size="normal" className="text-white !font-medium">
              ACNE10M Chatbot AI
            </Text.Title>
          ) as unknown as string
        }
        showBackIcon={true}
        backIcon={<Icon icon="zi-arrow-left" className="text-white" />}
        onBackClick={() => navigate(-1)}
      />

      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser 
                  ? "bg-blue-500 text-white rounded-tr-none" 
                  : "bg-white text-gray-800 rounded-tl-none shadow-md"
              }`}
              style={{ whiteSpace: "pre-wrap" }}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.isUser ? "text-blue-100" : "text-gray-500"}`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white text-gray-800 rounded-lg rounded-tl-none p-3 shadow-md max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            className="flex-grow"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <Button
            className="shrink-0 !p-3"
            style={{ backgroundColor: "#10b981" }}
            onClick={handleSendMessage}
            disabled={isLoading || newMessage.trim() === ""}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default Chatbot;
