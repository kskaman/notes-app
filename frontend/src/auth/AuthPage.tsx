import logoSrc from "../assets/images/logo.svg";
import Button from "../ui/Button";
import { TextInput } from "../ui/TextInput";

const AuthPage = () => {
  return (
    <div
      className="
        flex items-center justify-center
        min-h-screen w-screen
        bg-[var(--auth-page-bg)]
        p-[16px]
      "
    >
      <div
        className="
          bg-[var(--sub-container-bg)]
          rounded-[12px]
          w-full max-w-[520px]
          p-[16px] sm:p-[32px] md-p-[48px]
          transition-all duration-300 ease-in-out
          flex flex-col items-center gap-6
        "
      >
        {/* logo on first line */}
        <img src={logoSrc} alt="Logo" className="w-32 md:w-40 h-auto" />
        <TextInput onChange={() => {}} />
        <TextInput onChange={() => {}} disabled={true} />
        <TextInput onChange={() => {}} error={{ message: "this is error" }} />
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default AuthPage;
