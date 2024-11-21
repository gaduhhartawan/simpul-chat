// src/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RegisterResponse {
  data: {
    token: string;
  };
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: RegisterResponse = await register({
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/chat");
    } catch {
      setError("Error during registration");
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle className="text-3xl">Register</CardTitle>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleRegister} className="flex flex-col space-y-2">
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="">Username </label>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="">Email </label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="">Password </label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" variant="outline" type="submit">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
