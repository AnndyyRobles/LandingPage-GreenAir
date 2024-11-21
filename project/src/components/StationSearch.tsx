import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';

const stations = [
  { id: 1, name: "Estación de Tlalpan", city: "Ciudad de México", country: "México", aqi: 75 },
  { id: 2, name: "Estación Tacubaya", city: "Ciudad de México", country: "México", aqi: 82 },
  { id: 3, name: "Estación Insurgentes", city: "Ciudad de México", country: "México", aqi: 68 },
  { id: 4, name: "Estación Parque del Retiro", city: "Madrid", country: "España", aqi: 45 },
  { id: 5, name: "Estación Castellana", city: "Madrid", country: "España", aqi: 52 },
  { id: 6, name: "Estación Central Park", city: "Nueva York", country: "Estados Unidos", aqi: 38 },
];

const getAQIStatus = (aqi: number) => {
  if (aqi <= 50) return { color: 'bg-green-500', text: 'Buena' };
  if (aqi <= 100) return { color: 'bg-yellow-500', text: 'Moderada' };
  return { color: 'bg-red-500', text: 'Mala' };
};

export default function StationSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStations, setFilteredStations] = useState(stations);

  useEffect(() => {
    const handleToggleSearch = (event: CustomEvent) => {
      setIsOpen(event.detail.isOpen);
    };

    document.addEventListener('toggleSearch', handleToggleSearch as EventListener);
    return () => {
      document.removeEventListener('toggleSearch', handleToggleSearch as EventListener);
    };
  }, []);

  useEffect(() => {
    setFilteredStations(
      stations.filter(station => 
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const handleStationClick = (stationId: number) => {
    // Cerrar el modal antes de navegar
    setIsOpen(false);
    // Usar navegación con <a> para mantener el comportamiento nativo de Astro
    const link = document.createElement('a');
    link.href = `/dashboard/${stationId}`;
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-40"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Find Station</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/20 rounded-lg focus:border-green-500 text-white placeholder-white/50 text-base outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex-grow overflow-auto custom-scrollbar">
                <div className="grid gap-3">
                  {filteredStations.map((station) => {
                    const aqiStatus = getAQIStatus(station.aqi);
                    return (
                      <motion.button
                        key={station.id}
                        onClick={() => handleStationClick(station.id)}
                        className="w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-all duration-300 border border-white/10 hover:border-white/20"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-white">
                              {station.name}
                            </h3>
                            <p className="text-sm text-white/60">
                              {station.city}, {station.country}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className={`px-2 py-1 rounded-full ${aqiStatus.color} bg-opacity-20 text-white text-sm`}>
                              AQI: {station.aqi}
                            </div>
                            <ArrowRight className="h-4 w-4 text-white/60" />
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}