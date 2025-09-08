import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, ShieldCheck, Home, Users, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { clearSession, getSession } from "@/lib/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [session, setSessionState] = useState(getSession());
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSessionState(getSession());
    // close mobile menu on route change
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(80%_60%_at_50%_0%,hsl(var(--accent))_0%,transparent_70%),linear-gradient(to_bottom_right,hsl(var(--background)),hsl(var(--muted)))]">
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          scrolled ? "shadow-sm" : "",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="font-extrabold tracking-tight text-lg">
              Areja BHMS
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="#features"
              className="hover:text-primary transition-colors"
            >
              Features
            </a>
            <a href="#roles" className="hover:text-primary transition-colors">
              Roles
            </a>
            <a href="#modules" className="hover:text-primary transition-colors">
              Modules
            </a>
            <a
              href="#analytics"
              className="hover:text-primary transition-colors"
            >
              Analytics
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <a href="#booking">View Rooms</a>
            </Button>
            {session ? (
              <>
                <span className="text-xs text-muted-foreground mr-1">{session.role}</span>
                <Button onClick={() => { clearSession(); setSessionState(null); navigate("/"); }}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/admin">Get Started</Link>
                </Button>
              </>
            )}
          </div>
          <button
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border"
            aria-label="Open Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t bg-background/80 backdrop-blur">
            <div className="container py-3 grid gap-2">
              <a href="#features" className="py-2">
                Features
              </a>
              <a href="#roles" className="py-2">
                Roles
              </a>
              <a href="#modules" className="py-2">
                Modules
              </a>
              <a href="#analytics" className="py-2">
                Analytics
              </a>
              <div className="flex gap-2 pt-2">
                <Button variant="ghost" asChild className="flex-1">
                  <a href="#booking">View Rooms</a>
                </Button>
                {session ? (
                  <Button className="flex-1" onClick={() => { clearSession(); setSessionState(null); navigate("/"); }}>Logout</Button>
                ) : (
                  <>
                    <Button variant="outline" asChild className="flex-1">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild className="flex-1">
                      <Link to="/admin">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t">
        <div className="container py-10 grid gap-6 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center shadow-sm">
                <Home className="h-5 w-5" />
              </div>
              <span className="font-bold">Areja Boarding House</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A complete platform to manage rooms, leases, billing, and
              maintenance for your boarding house.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-primary" href="#features">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#roles">
                  Roles & Permissions
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#modules">
                  Modules
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#booking">
                  Bookings
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Admin: admin@areja-bhms.local
              </li>
              <li className="flex items-center gap-2">
                <Wrench className="h-4 w-4" /> Support: support@areja-bhms.local
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Areja BHMS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
