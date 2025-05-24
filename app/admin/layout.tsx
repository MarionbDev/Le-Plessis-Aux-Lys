import AdminClientLayout from "./adminClientLayout";

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function AdminServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}

