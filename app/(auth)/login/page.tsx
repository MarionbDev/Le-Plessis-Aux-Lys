"use client";

import UserLoginForm from "@/app/_components/UserLoginForm";

export default function LoginPage() {
  // const router = useRouter();

  // const handleClickHome = () => {
  //   if (router) {
  //     router.push("/");
  //   }
  // };

  // useEffect(() => {
  //   const redirectTimer = setTimeout(() => {
  //     router.push("/");
  //   }, 5000);

  //   return () => clearTimeout(redirectTimer);
  // }, [router]);

  return (
    <>
      <div>
        {/* <Button type="button" onClick={handleClickHome}>
          Retour à l'accueil
        </Button> */}
        <UserLoginForm />
      </div>
    </>
  );
}

