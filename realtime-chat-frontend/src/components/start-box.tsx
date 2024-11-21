import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

type StartBoxProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  handleUsernameSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StartBox: React.FC<StartBoxProps> = ({ username, setUsername, handleUsernameSubmit }) => {
  return (
    <div className="flex-1 flex items-center justify-center">
          <form onSubmit={handleUsernameSubmit} className="w-full max-w-sm">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-center">Enter Username</h2>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Start Chatting
              </Button>
            </div>
          </form>
        </div>
  )
}

export default StartBox