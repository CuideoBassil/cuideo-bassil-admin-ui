import useAuthCheck from "@/hooks/use-auth-check";
import { useRouter } from "next/navigation";
import Loading from "../common/loading";

const AuthCom = ({ children }: { children: React.ReactNode }) => {
  const { authChecked, user } = useAuthCheck();
  const router = useRouter();

  let content;
  if (!authChecked) {
    content = (
      <div className="flex items-center justify-center h-screen">
        <Loading spinner="fade" loading={!authChecked} />
      </div>
    );
  } else {
    content = children;
  }

  return <>{content}</>;
};

export default AuthCom;
