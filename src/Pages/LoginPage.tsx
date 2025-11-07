import { Button, PasswordInput, TextInput } from "@mantine/core";
import logo from "../assets/droidChat_Logo.png";
import { MdLockOutline, MdOutlineAlternateEmail } from "react-icons/md";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">
      {/* Diagonal split background with glow */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main diagonal split */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #ffffff 0%, #ffffff 45%, #67e8f9 45%, #67e8f9 100%)",
          }}
        />

        {/* Glowing diagonal line */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, transparent 44.5%, #22d3ee 44.5%, #22d3ee 45.5%, transparent 45.5%, transparent 100%)",
            filter: "blur(2px)",
            opacity: 0.6,
          }}
        />

        {/* Additional glow effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, transparent 43%, rgba(34, 211, 238, 0.2) 45%, transparent 47%, transparent 100%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Main Content Container */}

      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between gap-8">
        {/* Left side - Login Form */}
        <div className="flex-1 max-w-md">
          <div className="p-8 rounded-xl border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)] bg-white/95 backdrop-blur-sm">
            {/* Logo */}
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-14 place-self-center"
            />

            {/* Heading */}
            <h2 className="text-md font-semibold text-zinc-900 text-center">
              Welcome to{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-500 to-fuchsia-600 bg-clip-text text-transparent">
                Droid Chat
              </span>
            </h2>

            {/* Sub heading */}
            <h4 className="text-sm mt-1 mb-6 font-medium text-zinc-500 text-center">
              Login to start chatting with your AI assistant
            </h4>

            {/* Login Form */}
            <div className="space-y-4">
              {/* Email Input */}
              <TextInput
                size="sm"
                leftSection={<MdOutlineAlternateEmail />}
                withAsterisk
                label="Email"
                placeholder="Enter email"
                name="email"
                // value={loginData.email}
                // onChange={onChangeHandleData}
                // error={formError.email}
              />

              {/* Password Input */}
              <PasswordInput
                size="sm"
                withAsterisk
                leftSection={<MdLockOutline />}
                label="Password"
                placeholder="Password"
                name="password"
                // value={loginData.password}
                // onChange={onChangeHandleData}
                // error={formError.password}
              />

              {/* Login Button */}
              <Button
                // onClick={submitLoginForm}
                autoContrast
                variant="filled"
                color="cyan.3"
                fullWidth
                styles={{
                  label: { color: "white" },
                }}
              >
                Login
              </Button>

              {/* Signup  */}
              <p className="text-center text-xs font-medium text-zinc-500">
                Don't have an account ?{" "}
                <a
                  href="/signup"
                  className="text-sm font-semibold text-cyan-500 hover:underline"
                >
                  Sign up
                </a>
              </p>

              {/* Reset Password */}
              <div className="flex justify-center w-full">
                <button className="!text-sm !font-semibold text-cyan-500 hover:underline cursor-pointer">
                  Reset Password ?
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Welcome Message */}
        <div className="flex-1 max-w-md text-gray-800 hidden md:block text-zinc-900">
          <div className="space-y-4">
            <h1 className="text-6xl tracking-tight font-semibold bg-gradient-to-r from-blue-500 to-fuchsia-600 bg-clip-text text-transparent">
              DROID CHAT
            </h1>
            <p className="text-xl text-gray-700">
              Continue your journey with our AI assistant and explore endless
              possibilities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
