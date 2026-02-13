import { Web3Provider } from "@/context/Web3Provider";
import "./globals.css";

export const metadata = {
  title: "DAO Governance Dashboard",
  description: "On-chain voting platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}