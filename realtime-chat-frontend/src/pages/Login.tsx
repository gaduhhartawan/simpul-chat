// src/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/axios";
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

interface LoginResponse {
  data: {
    token: string;
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: LoginResponse = await login({ email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/chat");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle className="text-3xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleLogin} className="flex flex-col space-y-2">
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
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
