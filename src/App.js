import React, { useState } from 'react';
import { 
  PlaneTakeoff, 
  PlaneLanding, 
  MapPin, 
  Hotel, 
  IdCard, 
  Mic, 
  Users, 
  Music, 
  UtensilsCrossed, 
  Bus,
  Calendar,
  Clock,
  Laptop,
  MessageSquare,
  Filter,
  CloudSun,
  Shirt,
  Phone,
  TrainFront,
  CarTaxiFront,
  ChefHat,
  Info,
  Sparkles,
  ArrowRight
} from 'lucide-react';

// --- CONFIGURACIÓN DE USUARIOS Y COLORES ---
const userTags = {
  'Joel': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Diego': 'bg-teal-100 text-teal-800 border-teal-200',
  'Mohamed': 'bg-amber-100 text-amber-800 border-amber-200',
  'Rhett': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Todos': 'bg-slate-800 text-slate-100 border-slate-700',
};

// --- DATOS DEL ITINERARIO REAL ---
const journeyData = [
  {
    id: 'day1',
    dayTitle: 'Día 1: Vuelos y Llegadas',
    date: 'Martes, 21 de Abril 2026',
    events: [
      {
        id: 1,
        time: '07:00 AM',
        title: 'Salida desde Cancún',
        type: 'flight',
        location: 'CUN (Terminal 2) -> MTY (Terminal A)',
        description: 'Vuelo VivaAerobus VB 2196. Asientos asignados: Joel (3A) y Diego (4A).',
        icon: PlaneTakeoff,
        color: 'bg-emerald-500',
        who: ['Joel', 'Diego']
      },
      {
        id: 2,
        time: '08:35 AM',
        title: 'Escala de espera en MTY',
        type: 'layover',
        location: 'Aeropuerto Int. de Monterrey (MTY) - Terminal A',
        description: 'Aterrizaje en Monterrey. Tiempo de conexión de 3h 30m. Excelente momento para desayunar y revisar correos.',
        icon: UtensilsCrossed,
        color: 'bg-slate-500',
        who: ['Joel', 'Diego']
      },
      {
        id: 3,
        time: '08:52 AM',
        title: 'Salida desde Dallas',
        type: 'flight',
        location: 'Dallas (DFW) -> Las Vegas (LAS)',
        description: 'Vuelo American Airlines AA 1584. Clave de reserva: HNKCBW. Asiento: 17E.',
        icon: PlaneTakeoff,
        color: 'bg-amber-500',
        who: ['Mohamed']
      },
      {
        id: 4,
        time: '09:50 AM',
        title: 'Primer Aterrizaje en Las Vegas',
        type: 'flight',
        location: 'Aeropuerto Int. Harry Reid (LAS)',
        description: 'Llegada de Mohamed a Las Vegas. Traslado sugerido al hotel SAHARA para resguardar equipaje antes del check-in.',
        icon: PlaneLanding,
        color: 'bg-amber-500',
        who: ['Mohamed']
      },
      {
        id: 5,
        time: '12:05 PM',
        title: 'Conexión y Salida a Vegas',
        type: 'flight',
        location: 'MTY (Terminal A) -> LAS (Terminal 3)',
        description: 'Vuelo VivaAerobus VB 602. Rhett se une a la conexión. Asientos: Rhett (14A), Joel (13F) y Diego (14F).',
        icon: PlaneTakeoff,
        color: 'bg-blue-500',
        who: ['Rhett', 'Joel', 'Diego']
      },
      {
        id: 6,
        time: '02:10 PM',
        title: 'Aterrizaje Equipo MTY',
        type: 'flight',
        location: 'Aeropuerto Int. Harry Reid (LAS) - Terminal 3',
        description: 'Llegada a Las Vegas. Recogida de equipaje y traslado al hotel SAHARA.',
        icon: PlaneLanding,
        color: 'bg-blue-500',
        who: ['Rhett', 'Joel', 'Diego']
      },
      {
        id: 7,
        time: '03:00 PM',
        title: 'Check-in: Hotel SAHARA',
        type: 'hotel',
        location: 'SAHARA Las Vegas Hotel (2535 S Las Vegas Blvd)',
        description: 'El equipo se reúne por completo. Asignación de habitaciones, momento para dejar el equipaje y refrescarse.',
        icon: Hotel,
        color: 'bg-indigo-600',
        who: ['Todos']
      },
      {
        id: 8,
        time: '04:00 PM',
        title: 'Comida de Equipo en SAHARA',
        type: 'food',
        location: 'Bazaar Meat by José Andrés / Noodle EX (SAHARA)',
        description: 'Tarde libre para disfrutar de los restaurantes del hotel, comer juntos y planear la agenda de la semana.',
        icon: UtensilsCrossed,
        color: 'bg-orange-500',
        who: ['Todos']
      },
      {
        id: 9,
        time: '06:00 PM',
        title: 'Recogida de Badges (Pre-evento)',
        type: 'badge',
        location: 'Mandalay Bay Convention Center',
        description: 'Aprovechemos el horario extendido (hasta las 10 PM) para recoger nuestros gafetes y evitar las largas filas del día de mañana.',
        icon: IdCard,
        color: 'bg-green-500',
        who: ['Todos']
      }
    ]
  },
  {
    id: 'day2',
    dayTitle: 'Día 2: NEXT Keynotes',
    date: 'Miércoles, 22 de Abril 2026',
    events: [
      {
        id: 10,
        time: '08:00 AM',
        title: 'Traslado al Centro de Convenciones',
        type: 'transport',
        location: 'SAHARA -> Mandalay Bay',
        description: 'Recomendamos usar el Monorriel (estación SAHARA directa a MGM/Mandalay) o Uber corporativo.',
        icon: Bus,
        color: 'bg-slate-600',
        who: ['Todos']
      },
      {
        id: 11,
        time: '09:00 AM',
        title: 'Google Cloud Opening Keynote',
        type: 'session',
        location: 'Mandalay Bay - Main Stage',
        description: 'Apertura oficial del evento (9:00 AM - 10:30 AM). Descubre los lanzamientos más recientes en IA, Data y la Nube de Google.',
        icon: Mic,
        color: 'bg-blue-600',
        who: ['Todos']
      },
      {
        id: 12,
        time: '11:00 AM',
        title: 'Expo Floor & Spotlights',
        type: 'session',
        location: 'Innovators Hive & Expo Hall',
        description: 'Apertura del piso de exhibición. Exploración de soluciones para PAM Hotels y sesiones tipo "Breakouts".',
        icon: Laptop,
        color: 'bg-purple-500',
        who: ['Todos']
      },
      {
        id: 13,
        time: '02:30 PM',
        title: 'Skills Zone Workshops',
        type: 'session',
        location: 'Pabellón de Entrenamiento',
        description: 'Sesiones de 45 minutos para aprendizaje práctico (Hands-on). Ideal para el equipo técnico.',
        icon: Users,
        color: 'bg-emerald-600',
        who: ['Todos']
      },
      {
        id: 14,
        time: '05:00 PM',
        title: 'Networking & Lounge Sessions',
        type: 'party',
        location: 'Zonas de la Expo',
        description: 'Cierre del primer día con interacciones cara a cara, demostraciones de "Showcase" y bebidas en el piso de exhibición.',
        icon: MessageSquare,
        color: 'bg-pink-500',
        who: ['Todos']
      }
    ]
  },
  {
    id: 'day3',
    dayTitle: 'Día 3: Developer & Party',
    date: 'Jueves, 23 de Abril 2026',
    events: [
      {
        id: 15,
        time: '08:30 AM',
        title: 'Sesiones Matutinas y Meetups',
        type: 'session',
        location: 'Salas Breakout (Por definir)',
        description: 'Charlas de 20 minutos (Lightning talks) y reuniones especializadas con ingenieros de Google Cloud.',
        icon: Users,
        color: 'bg-purple-500',
        who: ['Todos']
      },
      {
        id: 16,
        time: '10:30 AM',
        title: 'Developer Keynote',
        type: 'session',
        location: 'Main Stage',
        description: 'Profundización técnica y herramientas para desarrolladores y líderes de IT (10:30 AM - 11:45 AM).',
        icon: Laptop,
        color: 'bg-blue-600',
        who: ['Todos']
      },
      {
        id: 17,
        time: '02:00 PM',
        title: 'Birds of a Feather',
        type: 'session',
        location: 'Community Hub',
        description: 'Sesiones de discusión en grupos pequeños. Excelente oportunidad para debatir sobre desafíos específicos de PAM Hotels.',
        icon: MessageSquare,
        color: 'bg-teal-500',
        who: ['Todos']
      },
      {
        id: 18,
        time: '07:00 PM',
        title: 'NEXT at Night - The Party!',
        type: 'party',
        location: 'Allegiant Stadium',
        description: 'El gran evento de cierre. Música en vivo, comida y networking en el estadio. ¡A celebrar!',
        icon: Music,
        color: 'bg-pink-500',
        who: ['Todos']
      }
    ]
  },
  {
    id: 'day4',
    dayTitle: 'Día 4: Wrap-up y Regreso',
    date: 'Viernes, 24 de Abril 2026',
    events: [
      {
        id: 19,
        time: '08:30 AM',
        title: 'Últimas Sesiones y Expo',
        type: 'session',
        location: 'Mandalay Bay',
        description: 'Última oportunidad para visitar stands o asistir a sesiones rezagadas. La expo cierra a las 3:00 PM.',
        icon: Laptop,
        color: 'bg-blue-500',
        who: ['Todos']
      },
      {
        id: 20,
        time: '12:00 PM',
        title: 'Check-out SAHARA',
        type: 'hotel',
        location: 'Hotel SAHARA Las Vegas',
        description: 'Salida de habitaciones. Se recomienda hacer check-out temprano para salir con tiempo al aeropuerto.',
        icon: Hotel,
        color: 'bg-indigo-600',
        who: ['Todos']
      },
      {
        id: 21,
        time: '12:30 PM',
        title: 'Traslado al Aeropuerto',
        type: 'transport',
        location: 'Hotel SAHARA -> LAS',
        description: 'Salida conjunta hacia el Aeropuerto Int. Harry Reid (LAS) para tomar los respectivos vuelos de regreso.',
        icon: Bus,
        color: 'bg-slate-600',
        who: ['Todos']
      },
      {
        id: 22,
        time: '03:15 PM',
        title: 'Vuelo a Cancún (Escala en MEX)',
        type: 'flight',
        location: 'LAS (Terminal 3) -> MEX (Terminal 1)',
        description: 'Vuelo VivaAerobus VB 113. Asientos: Joel (13F) y Diego (14F). Escala en MEX de 3h, salida a CUN a las 11:05 PM (Vuelo VB 1374, Asientos: 2F y 3F). Aterrizaje en Cancún a las 02:10 AM (+1 día).',
        icon: PlaneTakeoff,
        color: 'bg-emerald-500',
        who: ['Joel', 'Diego']
      },
      {
        id: 23,
        time: '03:25 PM',
        title: 'Vuelo a Monterrey',
        type: 'flight',
        location: 'LAS (Terminal 3) -> MTY (Terminal A)',
        description: 'Vuelo directo VivaAerobus VB 603. Asiento: 11F. Llegada estimada a Monterrey a las 07:20 PM.',
        icon: PlaneTakeoff,
        color: 'bg-indigo-500',
        who: ['Rhett']
      },
      {
        id: 24,
        time: '06:00 PM',
        title: 'Vuelo a Dallas',
        type: 'flight',
        location: 'LAS -> DFW',
        description: 'Vuelo directo American Airlines AA 2376. Asiento: 26E. Llegada estimada a Dallas/Fort Worth a las 10:49 PM.',
        icon: PlaneTakeoff,
        color: 'bg-amber-500',
        who: ['Mohamed']
      }
    ]
  }
];

export default function App() {
  // Estado para controlar si vemos la carátula o la app
  const [showWelcome, setShowWelcome] = useState(true);
  
  const [activeTab, setActiveTab] = useState('day1');
  const [selectedUser, setSelectedUser] = useState('Todos');
  
  // Estados para las Flip Cards
  const [isWeatherFlipped, setIsWeatherFlipped] = useState(false);
  const [isMobilityFlipped, setIsMobilityFlipped] = useState(false);
  const [isFoodFlipped, setIsFoodFlipped] = useState(false);

  // Nombres disponibles para el filtro
  const teamMembers = ['Todos', 'Joel', 'Diego', 'Mohamed', 'Rhett'];

  // === PANTALLA DE BIENVENIDA (CARÁTULA) ===
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Decoraciones de fondo */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Contenedor central Glassmorphism */}
        <div className="relative z-10 max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-16 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] text-center animate-fade-in-up">
          
          {/* Ícono superior */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-amber-500/30 rotate-3">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-amber-300 text-sm font-semibold tracking-widest uppercase">
            Executive Journey Agenda
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            ¡Gracias PAM <br className="hidden md:block"/> por el apoyo <br/>durante este 2026!
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl mx-auto">
            Hemos preparado este itinerario personalizado paso a paso para asegurarnos de que su experiencia en el <strong>Google Cloud NEXT</strong> en Las Vegas sea impecable, desde el momento en que salen de casa hasta su regreso.
          </p>
          
          <button 
            onClick={() => setShowWelcome(false)}
            className="group bg-white text-slate-900 font-extrabold text-lg px-8 py-4 rounded-full inline-flex items-center gap-3 hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            Ver nuestra Agenda
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}} />
      </div>
    );
  }

  // === APLICACIÓN PRINCIPAL (AGENDA) ===
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12 animate-fade-in">
      
      {/* HEADER */}
      <header className="bg-slate-900 text-white pt-16 pb-12 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-red-500 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -ml-20 -mb-20 w-64 h-64 rounded-full bg-amber-400 opacity-10 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 text-xs font-bold tracking-widest uppercase">
            Executive Journey
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            PAM Hotels <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400">@ NEXT 2026</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Las Vegas, NV | Abril 21 - 24, 2026.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 -mt-6 relative z-20">
        
        {/* BARRA DE FILTRO POR USUARIO */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-4 mb-8 border border-slate-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-slate-600 font-semibold text-sm">
              <Filter className="w-4 h-4 mr-2 text-blue-500" />
              Ver agenda de:
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {teamMembers.map(user => (
                <button
                  key={user}
                  onClick={() => setSelectedUser(user)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                    selectedUser === user 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/30' 
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {user}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TABS DE NAVEGACIÓN */}
        <div className="flex overflow-x-auto pb-4 mb-6 space-x-3 scrollbar-hide justify-start md:justify-center">
          {journeyData.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveTab(day.id)}
              className={`flex-shrink-0 px-5 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-sm ${
                activeTab === day.id
                  ? 'bg-blue-600 text-white shadow-blue-600/30 ring-2 ring-blue-600 ring-offset-2 ring-offset-slate-50'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-blue-600 border border-slate-200'
              }`}
            >
              <Calendar className={`w-4 h-4 ${activeTab === day.id ? 'text-blue-200' : 'text-slate-400'}`} />
              <span>{day.dayTitle.split(':')[0]}</span>
            </button>
          ))}
          
          {/* BOTÓN EXTRA: INFO HUB */}
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-shrink-0 px-5 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-sm ${
              activeTab === 'info'
                ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-600 ring-offset-2 ring-offset-slate-50'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-emerald-600 border border-slate-200'
            }`}
          >
            <Info className={`w-4 h-4 ${activeTab === 'info' ? 'text-emerald-200' : 'text-slate-400'}`} />
            <span>Guía y Tips</span>
          </button>
        </div>

        {/* CONTENIDO DEL ITINERARIO O GUÍA */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-6 md:p-10 border border-slate-100 min-h-[400px]">
          
          {/* === VISTA: LÍNEA DE TIEMPO (DÍAS) === */}
          {journeyData.map((day) => {
            if (activeTab !== day.id) return null;

            // Lógica de Filtro
            const filteredEvents = day.events.filter(event => 
              selectedUser === 'Todos' || 
              event.who.includes(selectedUser) || 
              event.who.includes('Todos')
            );

            return (
              <div key={day.id} className="animate-fade-in">
                {/* Encabezado del Día */}
                <div className="mb-10 text-center border-b border-slate-100 pb-8">
                  <h2 className="text-3xl font-extrabold text-slate-800">{day.dayTitle}</h2>
                  <p className="text-blue-600 font-medium mt-2">{day.date}</p>
                </div>

                {filteredEvents.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 font-medium">
                    <PlaneTakeoff className="w-12 h-12 mx-auto mb-4 text-slate-300 opacity-50" />
                    No hay actividades específicas para {selectedUser} en este momento.
                  </div>
                ) : (
                  <div className="relative border-l-2 border-slate-200 ml-4 md:ml-8 space-y-8">
                    {filteredEvents.map((event) => {
                      const Icon = event.icon;
                      return (
                        <div key={event.id} className="relative pl-8 md:pl-12 group">
                          
                          {/* Nodo de la línea de tiempo */}
                          <div className={`absolute -left-[21px] top-1 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${event.color} text-white transition-transform duration-300 group-hover:scale-110 z-10`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          {/* Tarjeta del evento */}
                          <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300">
                            
                            <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-3">
                              <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">
                                  {event.title}
                                </h3>
                                {/* Badges de "Quién" asiste */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {event.who.map(person => (
                                    <span key={person} className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${userTags[person]}`}>
                                      {person}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-bold w-max shadow-sm h-fit shrink-0">
                                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                {event.time}
                              </div>
                            </div>

                            <div className="flex items-start text-slate-600 mb-3 text-sm font-semibold">
                              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-slate-400" />
                              <span>{event.location}</span>
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed">
                              {event.description}
                            </p>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {filteredEvents.length > 0 && (
                  <div className="mt-12 flex justify-center">
                    <div className="w-4 h-4 rounded-full border-4 border-slate-200 bg-white"></div>
                  </div>
                )}
              </div>
            );
          })}

          {/* === VISTA: INFO HUB (GUÍA Y TIPS) === */}
          {activeTab === 'info' && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center mb-8 border-b border-slate-100 pb-8">
                <h2 className="text-3xl font-extrabold text-slate-800">Guía de Supervivencia</h2>
                <p className="text-emerald-600 font-medium mt-2">Tips e información esencial para Las Vegas</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* TARJETA: CLIMA Y VESTIMENTA (FLIP CARD) */}
                <div 
                  className="group relative w-full h-[340px] [perspective:1000px] cursor-pointer"
                  onClick={() => setIsWeatherFlipped(!isWeatherFlipped)}
                >
                  <div className={`w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${isWeatherFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    
                    {/* FRENTE */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-sm flex flex-col items-center justify-center [backface-visibility:hidden] hover:shadow-md transition-shadow">
                      <div className="p-4 bg-blue-200 text-blue-700 rounded-full mb-4 shadow-inner">
                        <CloudSun className="w-12 h-12" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-800 text-center">Clima y Vestimenta</h3>
                      <div className="mt-8 flex items-center text-blue-600 font-bold text-sm bg-blue-200/50 px-5 py-2.5 rounded-full animate-bounce shadow-sm">
                        Toca para descubrir ↺
                      </div>
                    </div>

                    {/* REVERSO */}
                    <div className="absolute inset-0 bg-white rounded-2xl p-6 border border-blue-200 shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                        <h3 className="text-lg font-bold text-slate-800">Tips de Vestimenta</h3>
                        <CloudSun className="w-5 h-5 text-blue-500" />
                      </div>
                      <ul className="space-y-4 text-sm text-slate-600">
                        <li className="flex items-start gap-3">
                          <span className="text-xl">🌡️</span> 
                          <span><strong>Temperatura:</strong> Abril oscila entre 26°C de día y 12°C de noche. <strong>Tip:</strong> Lleva chamarra ligera para el aire acondicionado.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Shirt className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                          <span><strong>Keynotes y Expo:</strong> <em>Business Casual</em> y calzado extremadamente cómodo, las distancias a caminar son largas.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Shirt className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                          <span><strong>Fiesta NEXT:</strong> Completamente casual.</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* TARJETA: MOVILIDAD (FLIP CARD) */}
                <div 
                  className="group relative w-full h-[340px] [perspective:1000px] cursor-pointer"
                  onClick={() => setIsMobilityFlipped(!isMobilityFlipped)}
                >
                  <div className={`w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${isMobilityFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    
                    {/* FRENTE */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border border-indigo-200 shadow-sm flex flex-col items-center justify-center [backface-visibility:hidden] hover:shadow-md transition-shadow">
                      <div className="p-4 bg-indigo-200 text-indigo-700 rounded-full mb-4 shadow-inner">
                        <TrainFront className="w-12 h-12" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-800 text-center">Tips de Movilidad</h3>
                      <div className="mt-8 flex items-center text-indigo-600 font-bold text-sm bg-indigo-200/50 px-5 py-2.5 rounded-full animate-bounce shadow-sm">
                        Toca para descubrir ↺
                      </div>
                    </div>

                    {/* REVERSO */}
                    <div className="absolute inset-0 bg-white rounded-2xl p-6 border border-indigo-200 shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                        <h3 className="text-lg font-bold text-slate-800">Transporte en Vegas</h3>
                        <TrainFront className="w-5 h-5 text-indigo-500" />
                      </div>
                      <ul className="space-y-4 text-sm text-slate-600">
                        <li className="flex items-start gap-3">
                          <TrainFront className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                          <span><strong>Monorriel de Las Vegas:</strong> ¡Nuestra mejor opción! El Hotel SAHARA tiene su propia estación conectada. Es la forma más rápida y económica de llegar directo al Mandalay Bay evitando el tráfico del Strip.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CarTaxiFront className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                          <span><strong>Uber / Lyft:</strong> Recuerda que en Las Vegas los conductores no pueden parar en la calle o entradas principales. Siempre busca los letreros de <em>"Rideshare Zone"</em> en hoteles.</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* TARJETA: RESTAURANTES (FLIP CARD) */}
                <div 
                  className="group relative w-full h-[720px] md:h-[340px] md:col-span-2 [perspective:1000px] cursor-pointer"
                  onClick={() => setIsFoodFlipped(!isFoodFlipped)}
                >
                  <div className={`w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${isFoodFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    
                    {/* FRENTE */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 shadow-sm flex flex-col items-center justify-center [backface-visibility:hidden] hover:shadow-md transition-shadow">
                      <div className="p-4 bg-orange-200 text-orange-700 rounded-full mb-4 shadow-inner">
                        <ChefHat className="w-12 h-12" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-800 text-center">Recomendaciones para Cenar</h3>
                      <div className="mt-8 flex items-center text-orange-600 font-bold text-sm bg-orange-200/50 px-5 py-2.5 rounded-full animate-bounce shadow-sm">
                        Toca para descubrir ↺
                      </div>
                    </div>

                    {/* REVERSO */}
                    <div className="absolute inset-0 bg-white rounded-2xl p-6 border border-orange-200 shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2 shrink-0">
                        <h3 className="text-lg font-bold text-slate-800">Top Restaurantes</h3>
                        <ChefHat className="w-5 h-5 text-orange-500" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto pr-2 pb-2 h-full">
                        <div className="bg-orange-50/50 p-4 md:p-5 rounded-xl border border-orange-100 shadow-sm">
                          <h4 className="font-bold text-slate-800 mb-1 text-base md:text-lg">Bazaar Meat 🥩</h4>
                          <p className="text-xs font-semibold text-orange-500 mb-2 md:mb-3 uppercase tracking-wider">Hotel SAHARA</p>
                          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">Por el multipremiado Chef José Andrés. Un steakhouse espectacular, ideal para la cena formal de equipo. Se recomienda reservar con semanas de anticipación.</p>
                        </div>
                        <div className="bg-orange-50/50 p-4 md:p-5 rounded-xl border border-orange-100 shadow-sm">
                          <h4 className="font-bold text-slate-800 mb-1 text-base md:text-lg">Noodle EX 🍜</h4>
                          <p className="text-xs font-semibold text-orange-500 mb-2 md:mb-3 uppercase tracking-wider">Hotel SAHARA</p>
                          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">Comida asiática rápida, reconfortante y deliciosa. Perfecto si regresan muy cansados del evento de Google y buscan cenar rápido pero muy bien dentro del hotel.</p>
                        </div>
                        <div className="bg-orange-50/50 p-4 md:p-5 rounded-xl border border-orange-100 shadow-sm">
                          <h4 className="font-bold text-slate-800 mb-1 text-base md:text-lg">Hell's Kitchen 🔥</h4>
                          <p className="text-xs font-semibold text-orange-500 mb-2 md:mb-3 uppercase tracking-wider">Caesars Palace (Strip)</p>
                          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">El icónico restaurante del Chef Gordon Ramsay. Excelente ambiente para celebrar, la comida y el concepto valen la pena si desean salir a pasear por el Strip.</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* TARJETA: CONTACTOS DE EMERGENCIA */}
                <div className="bg-rose-50/60 rounded-2xl p-6 border border-rose-100 hover:shadow-md transition-shadow md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-rose-100 text-rose-600 rounded-xl"><Phone className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-slate-800">Contactos del Equipo</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-700">
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Joel Cerino
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span> Diego Herrera
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Mohamed
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Rhett Hernan
                    </div>
                    <div className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2.5 rounded-xl shadow-sm ml-auto">
                      🚨 Emergencias Locales: 911
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}