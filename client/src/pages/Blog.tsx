import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "5 consejos para ahorrar gas en invierno sin pasar frío",
      excerpt: "Descubrí cómo optimizar el uso de tu caldera y radiadores para reducir la factura sin sacrificar confort. El uso de termostatos programables es clave.",
      date: "15 Mayo, 2025",
      author: "Ing. Martín López",
      category: "Ahorro Energético",
      image: "/images/hero-home.jpg" // Reusing hero image for demo
    },
    {
      id: 2,
      title: "¿Por qué es importante limpiar los filtros del aire acondicionado?",
      excerpt: "Un filtro sucio no solo reduce el rendimiento del equipo y aumenta el consumo eléctrico, sino que también afecta la calidad del aire que respirás.",
      date: "02 Enero, 2025",
      author: "Téc. Ana García",
      category: "Mantenimiento",
      image: "/images/service-cooling.jpg" // Reusing cooling image for demo
    }
  ];

  return (
    <div className="flex flex-col gap-0">
      <section className="bg-muted/30 py-20">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-primary">
            Blog & Consejos
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Novedades, tips de mantenimiento y guías para sacar el máximo provecho a tus equipos de climatización.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-none shadow-md bg-card">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground hover:bg-primary">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                  </div>
                  <CardTitle className="font-heading font-bold text-2xl leading-tight hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Button variant="link" className="p-0 h-auto font-bold text-primary gap-2 hover:no-underline group">
                    Leer artículo completo <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
