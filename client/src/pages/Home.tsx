import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, ThermometerSun, Snowflake, Wrench } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/service-heating.jpg" 
            alt="Interior moderno y confortable" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-2xl space-y-6 animate-in slide-in-from-bottom-10 duration-700 fade-in">
            <h1 className="font-heading font-bold text-4xl md:text-6xl leading-tight">
              El clima perfecto en tu hogar, todo el año.
            </h1>
            <p className="text-lg md:text-xl text-gray-100 font-light">
              Expertos en instalación, mantenimiento y reparación de calefacción y aire acondicionado en Buenos Aires. Confort seguro y eficiente para vos y tu familia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="font-bold text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white border-none" asChild>
                <Link href="/contacto">Solicitar Presupuesto</Link>
              </Button>
              <Button variant="outline" size="lg" className="font-bold text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white backdrop-blur-sm" asChild>
                <Link href="/servicios">Ver Servicios</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Tu tranquilidad es nuestra prioridad
            </h2>
            <p className="text-muted-foreground text-lg">
              Sabemos lo importante que es sentirse cómodo en casa. Por eso nos enfocamos en brindar un servicio que supere tus expectativas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Profesionalismo",
                desc: "Técnicos certificados y matriculados. Garantizamos instalaciones seguras y bajo normativa.",
                icon: <CheckCircle2 className="h-10 w-10 text-primary" />
              },
              {
                title: "Rapidez",
                desc: "Respuesta ágil en CABA y GBA. Sabemos que el confort no puede esperar.",
                icon: <ArrowRight className="h-10 w-10 text-primary" />
              },
              {
                title: "Transparencia",
                desc: "Presupuestos claros, sin sorpresas ni costos ocultos. Asesoramiento honesto desde el primer momento.",
                icon: <CheckCircle2 className="h-10 w-10 text-primary" />
              }
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-primary/10 mb-2">
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                Soluciones integrales de climatización
              </h2>
              <p className="text-muted-foreground text-lg">
                Cubrimos todas las necesidades térmicas de tu hogar o negocio con tecnología de punta.
              </p>
            </div>
            <Button variant="ghost" className="text-primary font-bold gap-2 hover:bg-primary/10" asChild>
              <Link href="/servicios">
                Ver todos los servicios <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/service-heating.jpg" 
                  alt="Calefacción" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="bg-card p-6 relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <ThermometerSun className="h-6 w-6 text-secondary-foreground" />
                  <h3 className="font-heading font-bold text-xl">Calefacción</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Instalación de radiadores, losa radiante y calderas. Eficiencia para tu invierno.
                </p>
                <Link href="/servicios" className="text-primary font-bold text-sm cursor-pointer hover:underline">
                  Más información
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/service-cooling.jpg" 
                  alt="Aire Acondicionado" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="bg-card p-6 relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Snowflake className="h-6 w-6 text-primary" />
                  <h3 className="font-heading font-bold text-xl">Aire Acondicionado</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Instalación y mantenimiento de splits y centrales. Frescura garantizada.
                </p>
                <Link href="/servicios" className="text-primary font-bold text-sm cursor-pointer hover:underline">
                  Más información
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/technician-working.jpg" 
                  alt="Servicio Técnico" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="bg-card p-6 relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Wrench className="h-6 w-6 text-gray-600" />
                  <h3 className="font-heading font-bold text-xl">Service y Reparación</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Diagnóstico preciso y arreglo de fallas. Soluciones rápidas cuando más lo necesitás.
                </p>
                <Link href="/servicios" className="text-primary font-bold text-sm cursor-pointer hover:underline">
                  Más información
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-16">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/10 border-none text-white backdrop-blur-sm">
              <CardContent className="p-8">
                <p className="text-lg italic mb-6 opacity-90">
                  "Excelente servicio. Instalaron la calefacción central en mi casa y quedó impecable. Muy prolijos y puntuales."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                    MG
                  </div>
                  <div>
                    <p className="font-bold">Mariana G.</p>
                    <p className="text-sm opacity-70">Belgrano, CABA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-none text-white backdrop-blur-sm">
              <CardContent className="p-8">
                <p className="text-lg italic mb-6 opacity-90">
                  "Me salvaron en pleno verano cuando se rompió el aire. Vinieron en el día y lo solucionaron. Súper recomendables."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                    PR
                  </div>
                  <div>
                    <p className="font-bold">Pablo R.</p>
                    <p className="text-sm opacity-70">Vicente López, GBA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-background">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            ¿Listo para mejorar el confort de tu hogar?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Contactanos hoy mismo y recibí un presupuesto personalizado sin compromiso.
          </p>
          <Button size="lg" className="font-bold text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all" asChild>
            <Link href="/contacto">Contactar Ahora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
