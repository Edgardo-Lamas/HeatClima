import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MapView } from "@/components/Map";
import { trpc } from "@/lib/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
  });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("¡Mensaje enviado correctamente! Nos pondremos en contacto a la brevedad.");
      reset();
    },
    onError: (error) => {
      toast.error(`Error al enviar el mensaje: ${error.message}`);
    },
  });

  const onSubmit = async (data: ContactForm) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-0">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h1 className="font-heading font-bold text-4xl mb-4">Hablemos de tu proyecto</h1>
          <p className="text-xl opacity-90">
            ¿Necesitás un presupuesto o asesoramiento técnico? Estamos para ayudarte.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="font-heading font-bold text-2xl text-primary">Envianos un mensaje</h2>
                <p className="text-muted-foreground">
                  Completá el formulario y te responderemos dentro de las 24 hs hábiles.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input id="name" placeholder="Juan Pérez" {...register("name")} />
                      {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="juan@ejemplo.com" {...register("email")} />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                        <Input id="phone" type="tel" placeholder="11 1234 5678" {...register("phone")} />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje o consulta</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Hola, quisiera solicitar un presupuesto para..." 
                        className="min-h-[150px]"
                        {...register("message")} 
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                    </div>

                    <Button type="submit" className="w-full font-bold text-lg" disabled={isSubmitting || submitMutation.isPending}>
                      {(isSubmitting || submitMutation.isPending) ? "Enviando..." : (
                        <>
                          Enviar Mensaje <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="font-heading font-bold text-2xl text-primary">Información de contacto</h2>
                <p className="text-muted-foreground">
                  También podés contactarnos por estos medios directos.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-muted/30 border-none">
                  <CardContent className="p-6 flex flex-col gap-3">
                    <Phone className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Teléfono</h3>
                    <p className="text-muted-foreground text-sm">+54 11 1234-5678</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30 border-none">
                  <CardContent className="p-6 flex flex-col gap-3">
                    <Mail className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Email</h3>
                    <p className="text-muted-foreground text-sm">contacto@heatclima.com.ar</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30 border-none">
                  <CardContent className="p-6 flex flex-col gap-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Horarios</h3>
                    <p className="text-muted-foreground text-sm">Lun-Vie: 8-18hs<br/>Sáb: 9-13hs</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30 border-none">
                  <CardContent className="p-6 flex flex-col gap-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Cobertura</h3>
                    <p className="text-muted-foreground text-sm">CABA y GBA</p>
                  </CardContent>
                </Card>
              </div>

              <div className="h-[300px] rounded-xl overflow-hidden border shadow-md">
                <MapView 
                  className="w-full h-full"
                  onMapReady={(map: google.maps.Map) => {
                    new google.maps.Marker({
                      position: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires Obelisco as center point
                      map: map,
                      title: "Heat&Clima Base Operativa"
                    });
                    map.setCenter({ lat: -34.6037, lng: -58.3816 });
                    map.setZoom(11);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
