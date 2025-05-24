export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegalNoticeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children} </>;
}

