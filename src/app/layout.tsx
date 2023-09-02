import "./globals.css";
/* import { Montserrat } from "next/font/google"; */
import SideBar from "@components/SideBar";
import Providers from "@components/Providers";

/* const montserrat = Montserrat({ subsets: ["latin"] });
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={
          /*   montserrat.className + */
          "w-full mx-auto dark:text-slate-200 bg-slate-200 dark:bg-slate-950 text-slate-900"
        }>
        <Providers>
          <SideBar>{children}</SideBar>
        </Providers>
      </body>
    </html>
  );
}
