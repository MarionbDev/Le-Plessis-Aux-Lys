import ForgetPassword from "@/app/_components/ForgetPassword";

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function ResetPasswordPage() {
  return (
    <div className="pt-32 md:pt-40 flex md:items-center justify-center">
      <ForgetPassword />
    </div>
  );
}

