import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import penguinLogo from '../assets/Logo.png';

interface LoginPageProps {
  onLogin: () => void;
  onSignupClick: () => void;
}

export function LoginPage({ onLogin, onSignupClick }: LoginPageProps) {
  const [userid, setUserid] = useState("");      // ← 변경됨 (email → userid)
  const [password, setPassword] = useState("");  // ← pw와 연결됨
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("userid", userid);
      formData.append("pw", password);
      if (remember) formData.append("remember-me", "true");

      const response = await fetch("/login-process", {
        method: "POST",
        body: formData,
      });

      if (response.ok || response.status === 302) {
        onLogin();
      } else {
        setErrorMessage("아이디 또는 비밀번호가 올바르지 않습니다."); // 🔥 HTML과 동일
      }
    } catch {
      setErrorMessage("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img
              src={penguinLogo}
              alt="Penguin Character"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h1 className="text-gray-900 mb-2">Quit!</h1>
          <p className="text-gray-600">온라인 학습 플랫폼에 오신 것을 환영합니다</p>
        </div>

        {/* Login Card */}
        <Card className="border border-gray-200 rounded-2xl shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-gray-900">로그인</CardTitle>
            <CardDescription className="text-center text-gray-600">
              계정에 로그인하여 학습을 시작하세요
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="text-red-600 text-sm mb-2">
                {errorMessage}
              </div>
            )}
              {/* 아이디 */}
              <div className="space-y-2">
                <Label htmlFor="userid" className="text-gray-700">
                  아이디
                </Label>
                <Input
                  id="userid"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                  required
                  className="h-12 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* 비밀번호 */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  비밀번호
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* 로그인 유지 */}
              <div className="flex items-center gap-2">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="remember-me" className="text-gray-700 text-sm">
                  로그인 유지
                </Label>
                
              </div>

              {/* 로그인 버튼 */}
              <Button
                type="submit"
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
              >
                로그인
              </Button>

              {/* 데모 로그인 */}
              <Button
                type="button"
                onClick={onLogin}
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl"
              >
                데모 계정으로 체험하기
              </Button>
               <div className="text-center mt-2 text-sm text-gray-600">
  <a href="/find-id" className="text-purple-600 hover:underline">아이디 찾기</a>
  <span className="mx-1 text-gray-400">|</span>
  <a href="/find-password" className="text-purple-600 hover:underline">비밀번호 찾기</a>
</div>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">또는</span>
              </div>
            </div>

            {/* 회원가입 */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                계정이 없으신가요?{" "}
                <button
                  type="button"
                  onClick={onSignupClick}
                  className="text-purple-600 hover:text-purple-700 hover:underline"
                >
                  회원가입
                </button>
              </p>
            </div>
           
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 QUIT. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
