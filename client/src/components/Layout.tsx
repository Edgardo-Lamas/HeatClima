import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/nosotros", label: "Quiénes Somos" },
    { href: "/blog", label: "Blog" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Bar - Contact Info */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> +54 11 1234-5678
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> contacto@heatclima.com.ar
            </span>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Buenos Aires y alrededores
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 font-heading font-bold text-2xl text-primary tracking-tight">
              Heat<span className="text-foreground">Clima</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === link.href
                      ? "text-primary font-bold"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/contacto">
              <Button size="sm" className="font-bold">Solicitar Presupuesto</Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background p-4 absolute w-full shadow-lg animate-in slide-in-from-top-5">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-muted",
                      location === link.href
                        ? "text-primary font-bold bg-muted/50"
                        : "text-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
              <Link href="/contacto">
                <Button className="w-full mt-2 font-bold">Solicitar Presupuesto</Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t pt-16 pb-8">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-2xl text-primary">
              Heat<span className="text-foreground">Clima</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Soluciones integrales en climatización y calefacción para hogares y comercios. Confort, seguridad y eficiencia energética.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/"><a className="hover:text-primary transition-colors">Inicio</a></Link></li>
              <li><Link href="/servicios"><a className="hover:text-primary transition-colors">Nuestros Servicios</a></Link></li>
              <li><Link href="/nosotros"><a className="hover:text-primary transition-colors">Quiénes Somos</a></Link></li>
              <li><Link href="/blog"><a className="hover:text-primary transition-colors">Blog & Consejos</a></Link></li>
              <li><Link href="/contacto"><a className="hover:text-primary transition-colors">Contacto</a></Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Servicios</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Instalación de Calefacción</li>
              <li>Aire Acondicionado</li>
              <li>Mantenimiento Preventivo</li>
              <li>Reparaciones Urgentes</li>
              <li>Asesoramiento Técnico</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contacto</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Buenos Aires, CABA y GBA Norte/Oeste/Sur</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>contacto@heatclima.com.ar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Heat&Clima. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
