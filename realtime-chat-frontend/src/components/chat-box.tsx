import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Messages } from "@/pages/Chat";

type ChatBoxProps = {
  messages: Messages[];
  username: string;
  deleteMessage: (id: number) => void;
};

const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  username,
  deleteMessage,
}) => {
  console.log(messages, "messages");
  console.log(username, "username");

  return (
    <ScrollArea className={`flex flex-col max-h-[calc(85vh-4rem)]`}>
      {messages.map((message: any) => (
        <div
          key={message.id}
          className={`flex px-5 ${
            message.user.username === username ? "justify-end" : "justify-start"
          }`}
        >
          <div className="flex flex-col mb-8">
            <div
              className={`flex ${
                message.user.username === username
                  ? "flex-row"
                  : "flex-row-reverse"
              } justify-end gap-1`}
            >
              <span className="font-bold text-lg">{message.user.username}</span>
              <img
                width={25}
                src={`https://ui-avatars.com/api/?rounded=true&name=${message.user.username}&background=random`}
                alt={message.user.username}
              />
            </div>
            <div
              className={`flex ${
                message.user.username === username
                  ? "flex-row"
                  : "flex-row-reverse"
              } gap-1 items-center`}
            >
              {message.user.username === username && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"destructive"}
                      className="w-5 h-5 p-3 self-end"
                    >
                      <Trash width={5} height={5} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Message</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this message? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMessage(message.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <p
                className={`mt-2 bg-blue-600 min-w-60 rounded-md p-2 ${
                  message.username === username ? "text-right" : "text-left"
                }`}
              >
                {message.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default ChatBox;
