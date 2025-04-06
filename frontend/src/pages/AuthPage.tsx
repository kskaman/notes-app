import Button from "../ui/Button";

const AuthPage = () => {
  return (
    <div
      className="
      
      flex justify-center items-center 
      w-screen h-screen
      bg-[var(--auth-page-bg)] 
      gap-[20px]"
    >
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="warning" disabled={true}>
        Warning
      </Button>
    </div>
  );
};

export default AuthPage;
