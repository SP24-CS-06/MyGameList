import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  // get from db
  return (
    <ThemeProvider>
      <AuthProvider userData={null}>{children}</AuthProvider>
    </ThemeProvider>
  );
}
