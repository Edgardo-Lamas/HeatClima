import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, Award, Clock } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            Más que técnicos, aliados de tu confort.
          </h1>
          <p className="text-xl opacity-90 leading-relaxed">
            En Heat&Clima nacimos con una misión clara: profesionalizar el servicio de climatización en Buenos Aires.
          </p>
        </div>
        {/* Abstract background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-secondary rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary/30 rounded-2xl rotate-3"></div>
              <img 
                src="/images/about-team.jpg" 
                alt="Equipo de Heat&Clima" 
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="font-heading font-bold text-3xl mb-4 text-primary">Nuestra Historia</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Entendemos que invitar a un técnico a tu casa requiere confianza. Por eso, nuestro equipo no solo está altamente capacitado técnicamente, sino que también se rige por valores de respeto, puntualidad y honestidad.
                </p>
              </div>
              
              <div>
                <h2 className="font-heading font-bold text-3xl mb-4 text-primary">Nuestra Filosofía</h2>
                <p className="text-muted-foreground text-lg leading-relaxed border-l-4 border-secondary pl-6 italic">
                  "Creemos que un trabajo bien hecho es aquel que no se ve, pero se siente. Se siente en la temperatura perfecta de tu living, en el silencio de un equipo bien instalado y en la tranquilidad de saber que todo funciona de manera segura."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md bg-background">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-heading font-bold text-xl">Excelencia Técnica</h3>
                <p className="text-muted-foreground">
                  Capacitación constante y herramientas de última generación para diagnósticos precisos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-background">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <HeartHandshake className="h-8 w-8" />
                </div>
                <h3 className="font-heading font-bold text-xl">Confianza</h3>
                <p className="text-muted-foreground">
                  Trato respetuoso, presupuestos claros y garantía sobre nuestros trabajos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-background">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="font-heading font-bold text-xl">Puntualidad</h3>
                <p className="text-muted-foreground">
                  Valoramos tu tiempo. Cumplimos con los horarios y plazos acordados.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <Link href="/contacto">
              <Button size="lg" className="font-bold px-8">Conocé nuestro servicio</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
