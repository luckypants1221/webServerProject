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

interface SignupPageProps {
  onSignup: () => void;
  onBackToLogin: () => void;
}

export function SignupPage({ onSignup, onBackToLogin }: SignupPageProps) {
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState(""); // ← HTML의 userid 필드
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // 이메일 인증번호 발송
  const handleSendCode = async () => {
    const res = await fetch("/api/email/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("인증번호가 이메일로 발송되었습니다.");
    } else {
      alert("이메일 발송 실패");
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    const res = await fetch("/api/email/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, verificationCode }),
    });

    if (res.ok) {
      alert("이메일 인증 성공!");
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 백엔드 HTML과 동일한 방식 (form-data)
      const formData = new URLSearchParams();
      formData.append("userid", userid);
      formData.append("pw", password);
      formData.append("passwordConfirm", confirm);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("verificationCode", verificationCode);

      const response = await fetch("/register-process", {
        method: "POST",
        body: formData,
      });

      if (response.ok || response.status === 302) {
        alert("회원가입 성공!");
        onSignup();
      } else {
        alert("회원가입 실패. 입력값을 확인해주세요.");
      }
    } catch (err) {
      console.error(err);
      alert("서버 연결 오류");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={penguinLogo} alt="Penguin" className="w-28 h-28 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">회원가입</h1>
          <p className="text-gray-600">새로운 계정을 만들어 학습을 시작하세요</p>
        </div>

        <Card className="border border-gray-200 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900">회원가입</CardTitle>
            <CardDescription className="text-center text-gray-600">
              아래 정보를 입력해주세요
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <Label htmlFor="userid">아이디</Label>
                <Input
                  id="userid"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">비밀번호 확인</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleSendCode} className="whitespace-nowrap">
                    인증번호 발송
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="verificationCode">인증번호</Label>
                <div className="flex gap-2">
                  <Input
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <Button type="button" onClick={handleVerifyCode} variant="outline">
                    확인
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-purple-600 text-white rounded-xl">
                회원가입
              </Button>

              <Button
                type="button"
                onClick={onBackToLogin}
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl"
              >
                로그인 화면으로 돌아가기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
