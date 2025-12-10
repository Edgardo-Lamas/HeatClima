import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ThermometerSun, Snowflake, Wrench, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  return (
    <div className="flex flex-col gap-0">
      {/* Header */}
      <section className="bg-muted/30 py-20">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-primary">
            Servicios diseñados para tu confort
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ya sea para tu hogar o tu comercio, ofrecemos soluciones técnicas de alta calidad para asegurar la temperatura ideal en tus espacios.
          </p>
        </div>
      </section>

      {/* Service 1: Calefacción */}
      <section className="py-20 border-b">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <div className="flex items-center gap-3 text-secondary-foreground">
                <ThermometerSun className="h-8 w-8" />
                <h2 className="font-heading font-bold text-3xl">Instalación de Calefacción</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Diseñamos e instalamos sistemas completos de calefacción por radiadores o piso radiante. Trabajamos con las mejores marcas de calderas del mercado. Realizamos el cálculo térmico para asegurar la eficiencia energética de tu hogar.
              </p>
              <ul className="space-y-3">
                {[
                  "Sistemas de radiadores y toalleros",
                  "Piso radiante (losa radiante)",
                  "Calderas duales y solo calefacción",
                  "Cálculo de balance térmico"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                      <Check className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/contacto">
                  <Button className="font-bold">Solicitar Cotización</Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/service-heating.jpg" 
                alt="Instalación de calefacción" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Aire Acondicionado */}
      <section className="py-20 border-b bg-muted/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/service-cooling.jpg" 
                alt="Instalación de aire acondicionado" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Snowflake className="h-8 w-8" />
                <h2 className="font-heading font-bold text-3xl">Climatización y Aire Acondicionado</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Instalación profesional de equipos split y multisplit. Cuidamos la estética de tu ambiente y garantizamos el correcto funcionamiento y drenaje. Asesoramiento sobre la mejor ubicación para optimizar el rendimiento.
              </p>
              <ul className="space-y-3">
                {[
                  "Instalación de equipos Split y Multisplit",
                  "Sistemas VRV / VRF para comercios",
                  "Preinstalación en obras (cañerías embutidas)",
                  "Carga de gas y control de fugas"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/contacto">
                  <Button className="font-bold">Consultar por Instalación</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3 & 4: Mantenimiento y Reparación */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card border shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle className="font-heading font-bold text-2xl">Mantenimiento Preventivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  No esperes a que se rompa. Realizamos limpiezas de filtros, control de cargas de gas y revisiones de seguridad anuales para calderas y estufas. Un equipo mantenido consume menos y dura más.
                </p>
                <Link href="/contacto">
                  <Button variant="outline" className="w-full font-bold">Agendar Mantenimiento</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card border shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <Wrench className="h-6 w-6 text-orange-700" />
                </div>
                <CardTitle className="font-heading font-bold text-2xl">Reparaciones y Urgencias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  ¿Tu caldera no enciende? ¿El aire no enfría? Contamos con stock de repuestos y herramientas de diagnóstico para solucionar problemas técnicos con rapidez y eficacia.
                </p>
                <Link href="/contacto">
                  <Button variant="outline" className="w-full font-bold">Solicitar Reparación</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
