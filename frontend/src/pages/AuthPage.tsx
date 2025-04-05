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
      <Button>Submit</Button>
      <Button variant="secondary">Submit</Button>
      <Button variant="outlined">Submit</Button>
      <Button variant="warning">Submit</Button>
    </div>
  );
};

export default AuthPage;
