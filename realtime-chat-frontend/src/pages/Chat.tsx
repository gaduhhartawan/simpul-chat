import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { deleteMessageById, fetchMessages, sendMessage } from "@/lib/axios";
import { Navigate } from "react-router-dom";
import ChatBox from "@/components/chat-box";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface Messages {
  id: number;
  user: {
    username: string;
  };
  content: string;
}

const pusherKey = process.env.VITE_PUSHER_KEY;
const pusherCluster = process.env.VITE_PUSHER_CLUSTER;

const Chat = () => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");
  const decoded = JSON.parse(atob(token!.split(".")[1]));
  const { username } = decoded;
  console.log(username);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!pusherKey || !pusherCluster) {
    throw new Error(
      "Pusher key or cluster is not defined in the environment variables."
    );
  }

  useEffect(() => {
    const loadMessages = async () => {
      const response = await fetchMessages();
      setMessages(response.data);
    };

    loadMessages();

    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });

    const channel = pusher.subscribe("chat");
    channel.bind("new-message", (data: Messages) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    channel.bind("delete-message", (data: { id: number }) => {
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== data.id)
      );
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission

    // Pastikan 'content' berasal dari state, bukan event
    if (content.trim()) {
      await sendMessage({ content });
      setContent(""); // Clear the input field after sending
    }
  };

  const deleteMessage = async (messageId: number) => {
    try {
      await deleteMessageById(messageId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ChatBox
        messages={messages}
        deleteMessage={deleteMessage}
        username={username}
      />
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 fixed bottom-7 inset-x-10"
      >
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
        />
        <Button variant="outline" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
