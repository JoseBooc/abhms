import { Button } from "@/components/ui/button";
import { useState } from "react";
import { setSession, UserRole } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("Admin");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setSession({ email, role });
    navigate(role === "Admin" ? "/admin" : "/admin");
  };

  return (
    <div className="container py-16 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground mb-6">Mock login (frontend only). Backend auth will be provided by Laravel Breeze.</p>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-10 rounded-md border px-3 bg-background" placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-10 rounded-md border px-3 bg-background" placeholder="••••••••" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="role">Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="h-10 rounded-md border px-3 bg-background">
              <option>Admin</option>
              <option>Tenant</option>
              <option>Staff</option>
            </select>
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </div>
    </div>
  );
}
