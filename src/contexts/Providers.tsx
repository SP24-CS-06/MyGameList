import { getTokenPayload } from "@/lib/auth";
import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const tokenPayload = getTokenPayload();

  return (
    <ThemeProvider>
      <AuthProvider
        userData={
          tokenPayload && {
            username: tokenPayload.sub,
            picture: tokenPayload.picture,
          }
        }
      >
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
