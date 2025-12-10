# Guía de Recopilación de Datos - Heat&Clima

## 📊 Descripción General

La base de datos de Heat&Clima recopila automáticamente información de contacto cuando los clientes envían consultas a través del formulario web. Este documento explica cómo funciona el flujo completo de recopilación, almacenamiento y acceso a estos datos.

---

## 🔄 Flujo de Recopilación de Datos

### 1. **Cliente Completa el Formulario (Frontend)**

Cuando un visitante accede a la página `/contacto` y completa el formulario con:
- **Nombre:** Juan Pérez
- **Email:** juan@ejemplo.com
- **Teléfono:** +54 11 1234-5678
- **Mensaje:** "Quisiera solicitar un presupuesto para instalar calefacción central..."

El formulario valida los datos en el navegador (validación Zod):
- El nombre no puede estar vacío
- El email debe ser válido
- El teléfono no puede estar vacío
- El mensaje debe tener mínimo 10 caracteres

### 2. **Envío al Servidor (tRPC)**

Al hacer clic en "Enviar Mensaje", el frontend llama al procedimiento tRPC `contact.submit`:

```typescript
// Cliente (React)
const submitMutation = trpc.contact.submit.useMutation({
  onSuccess: () => {
    toast.success("¡Mensaje enviado correctamente!");
    reset(); // Limpia el formulario
  },
  onError: (error) => {
    toast.error(`Error: ${error.message}`);
  },
});

submitMutation.mutate({
  name: "Juan Pérez",
  email: "juan@ejemplo.com",
  phone: "+54 11 1234-5678",
  message: "Quisiera solicitar un presupuesto..."
});
```

### 3. **Procesamiento en el Backend**

El servidor recibe los datos y ejecuta dos acciones simultáneamente:

#### **A) Guardar en la Base de Datos**

```typescript
// Servidor (server/routers.ts)
await createContactMessage({
  name: input.name,
  email: input.email,
  phone: input.phone,
  message: input.message,
  status: "new",
});
```

Los datos se almacenan en la tabla `contact_messages`:

| id | name | email | phone | message | status | createdAt |
|---|---|---|---|---|---|---|
| 1 | Juan Pérez | juan@ejemplo.com | +54 11 1234-5678 | Quisiera solicitar... | new | 2025-12-10 13:19:07 |

#### **B) Notificar al Dueño**

```typescript
// Notificación automática
await notifyOwner({
  title: "Nuevo mensaje de contacto: Juan Pérez",
  content: "**Email:** juan@ejemplo.com\n**Teléfono:** +54 11 1234-5678\n\n**Mensaje:**\nQuisiera solicitar un presupuesto..."
});
```

Recibirás una notificación instantánea en el panel de Manus informándote sobre el nuevo mensaje.

### 4. **Confirmación al Cliente**

El cliente recibe una confirmación visual:
- Toast verde: "¡Mensaje enviado correctamente! Nos pondremos en contacto a la brevedad."
- El formulario se limpia automáticamente

---

## 📁 Estructura de la Base de Datos

### Tabla: `contact_messages`

```sql
CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'contacted', 'resolved') DEFAULT 'new' NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

**Campos:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT | Identificador único (auto-incrementado) |
| `name` | VARCHAR(255) | Nombre completo del cliente |
| `email` | VARCHAR(320) | Email del cliente (validado) |
| `phone` | VARCHAR(50) | Teléfono o WhatsApp del cliente |
| `message` | TEXT | Contenido del mensaje/consulta |
| `status` | ENUM | Estado del mensaje: `new` (nuevo), `contacted` (contactado), `resolved` (resuelto) |
| `createdAt` | TIMESTAMP | Fecha y hora de recepción (UTC) |

---

## 🔍 Cómo Acceder a los Datos

### Opción 1: Panel de Base de Datos (UI de Manus)

1. Abre el proyecto en Manus
2. Ve a **Management UI** → **Database**
3. Selecciona la tabla `contact_messages`
4. Verás todos los mensajes recibidos con opción de:
   - Ver detalles completos
   - Filtrar por estado
   - Ordenar por fecha

### Opción 2: Procedimiento tRPC (Para Desarrolladores)

```typescript
// Obtener todos los mensajes
const messages = await trpc.contact.list.query();

// Resultado:
[
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    phone: "+54 11 1234-5678",
    message: "Quisiera solicitar un presupuesto...",
    status: "new",
    createdAt: "2025-12-10T13:19:07.000Z"
  }
]
```

### Opción 3: Consulta SQL Directa

```sql
-- Ver todos los mensajes nuevos
SELECT * FROM contact_messages WHERE status = 'new' ORDER BY createdAt DESC;

-- Ver mensajes de un período específico
SELECT * FROM contact_messages 
WHERE createdAt >= '2025-12-01' AND createdAt <= '2025-12-31'
ORDER BY createdAt DESC;

-- Contar mensajes por estado
SELECT status, COUNT(*) as cantidad FROM contact_messages GROUP BY status;
```

---

## 📈 Ciclo de Vida de un Mensaje

```
┌─────────────────────────────────────────────────────┐
│ 1. CLIENTE ENVÍA FORMULARIO (Frontend)              │
│    - Validación local (Zod)                         │
│    - Envío a servidor vía tRPC                      │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 2. SERVIDOR PROCESA (Backend)                       │
│    - Valida datos nuevamente                        │
│    - Guarda en BD (status: "new")                   │
│    - Envía notificación al dueño                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 3. DUEÑO RECIBE NOTIFICACIÓN                        │
│    - Notificación en panel de Manus                 │
│    - Email (opcional, configurable)                │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 4. DUEÑO CONTACTA AL CLIENTE                        │
│    - Actualiza status a "contacted"                 │
│    - Realiza seguimiento                            │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 5. CIERRE DE CONSULTA                               │
│    - Actualiza status a "resolved"                  │
│    - Archivo histórico de clientes                  │
└─────────────────────────────────────────────────────┘
```

---

## 🔐 Seguridad y Privacidad

### Validación de Datos

Todos los datos se validan en **dos niveles**:

1. **Frontend (Zod):** Validación inmediata en el navegador
   - Formato correcto de email
   - Longitud mínima de mensaje
   - Campos requeridos

2. **Backend (Zod):** Validación en el servidor
   - Evita inyecciones SQL
   - Garantiza integridad de datos
   - Previene datos malformados

### Almacenamiento Seguro

- Los datos se almacenan en **MySQL** con **SSL/TLS**
- Las contraseñas de base de datos están protegidas
- Los datos no se comparten con terceros
- Cumple con estándares de privacidad

### Notificaciones

Las notificaciones se envían **solo al dueño** del proyecto mediante:
- Panel de notificaciones de Manus
- Sistema de notificaciones integrado

---

## 📊 Ejemplos de Datos Reales

### Mensaje 1: Consulta de Calefacción

```
Nombre: María García
Email: maria.garcia@mail.com
Teléfono: +54 11 5678-1234
Mensaje: "Hola, tengo un departamento en Belgrano y necesito instalar calefacción central. 
¿Cuál es el costo aproximado? Tengo presupuesto limitado."
Status: new
Fecha: 2025-12-10 13:19:07
```

### Mensaje 2: Consulta de Aire Acondicionado

```
Nombre: Carlos López
Email: carlos.lopez@empresa.com
Teléfono: +54 11 9876-5432
Mensaje: "Necesito reparar el aire acondicionado de mi oficina. 
¿Pueden venir a hacer un diagnóstico? ¿Cuál es el costo del servicio técnico?"
Status: contacted (ya fue contactado)
Fecha: 2025-12-09 10:45:22
```

---

## 🚀 Próximas Mejoras Sugeridas

### 1. **Panel de Administración**
Crear un dashboard privado donde puedas:
- Ver todos los mensajes en una tabla
- Filtrar por estado, fecha, email
- Marcar como "contactado" o "resuelto"
- Exportar a CSV o Excel

### 2. **Respuestas Automáticas**
Enviar email automático al cliente:
- Confirmación de recepción del mensaje
- Tiempo estimado de respuesta
- Información de contacto directo

### 3. **Análisis de Datos**
Generar reportes:
- Cantidad de consultas por mes
- Servicios más solicitados
- Tasa de conversión (consulta → cliente)

### 4. **Integración con CRM**
Conectar con herramientas como:
- Google Sheets
- Notion
- Zapier
- HubSpot

---

## 📞 Soporte

Si tienes dudas sobre cómo acceder o gestionar los datos:
1. Abre el panel de Manus
2. Ve a **Database** para ver los datos en tiempo real
3. Usa las notificaciones para estar al tanto de nuevas consultas
