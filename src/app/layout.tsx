import "./globals.css";
/* import { Montserrat } from "next/font/google"; */
import Providers from "@components/Providers";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("../../components/SideBar"), { ssr: false });
/* const montserrat = Montserrat({ subsets: ["latin"] });
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={
          /*   montserrat.className + */
          "w-full mx-auto dark:text-slate-200 bg-slate-200 dark:bg-slate-950 text-slate-900"
        }>
        <Providers>
          <NoSSR>{children}</NoSSR>
        </Providers>
      </body>
    </html>
  );
}
