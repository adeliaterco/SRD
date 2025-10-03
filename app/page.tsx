"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Función de login
  const handleLogin = (emailValue) => {
    setUserEmail(emailValue);
    setIsLoggedIn(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('member_email', emailValue);
    }
  };

  // Función de logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('member_email');
    }
  };

  // Verificar localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('member_email');
      if (savedEmail) {
        setUserEmail(savedEmail);
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor, introduce tu correo electrónico');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, introduce un correo electrónico válido');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      handleLogin(email);
      setIsLoading(false);
    }, 1500);
  };

  // Si no está conectado, mostrar pantalla de login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          
          {/* Logo/Foto del Producto */}
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-3xl overflow-hidden border-4 border-red-500 shadow-2xl">
              <img
                src="http://renacer21.shop/wp-content/uploads/2025/10/Generated-Image-October-02-2025-8_45PM.png"
                alt="Método RENACER21"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-red-500 mb-2 uppercase tracking-tight">
              Área de Socios
            </h1>
          </div>

          {/* Formulario de Login */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-2">🔐 Acceso Exclusivo</h2>
              <p className="text-gray-400 text-sm">Introduce tu correo electrónico para acceder a tu contenido</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Correo electrónico de acceso
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verificando acceso...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Acceder a mi área
                    <span className="ml-2">→</span>
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                🔒 Acceso seguro y cifrado
              </p>
            </div>
          </div>

          {/* Información de soporte */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm mb-2">¿Problemas de acceso?</p>
            <a 
              href="mailto:sflourcraft@gmail.com"
              className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-300"
            >
              sflourcraft@gmail.com
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Si está conectado, mostrar área de socios
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Cabecera del Área de Socios */}
        <div className="relative max-w-5xl mx-auto p-6 md:p-8 mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-2xl border border-red-500/30"></div>
          <div className="absolute inset-2 border border-red-500/20 rounded-xl pointer-events-none"></div>
          
          {/* Botón de logout */}
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors duration-300 z-10"
            title="Cerrar sesión"
          >
            <span className="text-xl">⚙️</span>
          </button>
          
          <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-6xl font-black text-red-500 mb-4 uppercase tracking-tight">
              Área de Socios
            </h1>
            <p className="text-lg md:text-2xl text-white font-light mb-6">RENACER21</p>
            
            <div className="bg-white/5 p-4 md:p-6 rounded-xl border-l-4 border-red-500">
              <h3 className="text-red-400 font-bold text-base md:text-xl mb-3">
                🎯 ¡Bienvenido {userEmail ? userEmail.split('@')[0] : 'Usuario'}!
              </h3>
              <p className="text-white leading-relaxed text-sm md:text-base">
                Ahora tienes acceso al sistema más avanzado de regeneración hepática jamás desarrollado. 
                Haz clic en las imágenes de abajo para acceder a tus cursos completos.
              </p>
            </div>
          </div>
        </div>
        
        {/* Tarjeta del MÉTODO RENACER21 - PRODUCTO PRINCIPAL */}
        <div className="mb-12">
          <a 
            href="https://metodo-renacer21-platos--wudz2xr.gamma.site/"
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-red-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20">
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-red-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="http://renacer21.shop/wp-content/uploads/2025/10/Generated-Image-October-02-2025-8_45PM.png"
                    alt="MÉTODO RENACER21"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-red-500 mb-4 leading-tight">
                    🔥 MÉTODO RENACER21
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    "Platos, Pausas, PAS - Normaliza tus enzimas hepáticas en 21 días". El sistema completo de regeneración hepática que ha transformado miles de vidas en todo el mundo.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>Protocolo completo de 21 días</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>Normalización de enzimas hepáticas</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>Sistema Platos, Pausas, PAS</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>Regeneración hepática completa</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>Guías paso a paso detalladas</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">✓</span>
                      <span>Resultados científicamente probados</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-red-600 hover:to-red-500 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder al MÉTODO RENACER21
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Tarjeta LISTA SECRETA DE COMPRAS - BÔNUS 1 */}
        <div className="mb-12">
          <a 
            href="https://el-error-de-200-que-come-q999te2.gamma.site/"
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
              
              <div className="absolute top-5 right-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide z-20">
                🎁 BÔNUS 1
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-blue-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="http://renacer21.shop/wp-content/uploads/2025/10/6483cc44-a27c-4c02-9697-7fddd4ebd21f.png"
                    alt="Lista Secreta de Compras"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-blue-500 mb-4 leading-tight">
                    📋 LISTA SECRETA DE COMPRAS
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    "Alimentación Inteligente - Tu guía de supermercado para un hígado renovado". La lista exacta de alimentos que necesitas para optimizar tu regeneración hepática.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>Guía completa de supermercado</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>Alimentos específicos para el hígado</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>Lista organizada por categorías</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>Alimentación inteligente y estratégica</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-blue-600 hover:to-blue-500 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder a la Lista Secreta
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Tarjeta CALENDARIO DE TRANSFORMACIÓN 21 DÍAS - BÔNUS 2 */}
        <div className="mb-12">
          <a 
            href="https://tu-calendario-exacto-de--kya3n1h.gamma.site/"
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-purple-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
              
              <div className="absolute top-5 right-5 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide z-20">
                🎁 BÔNUS 2
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-purple-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="http://renacer21.shop/wp-content/uploads/2025/10/sRrYbxrUoOMWNwdcjXSc8.png"
                    alt="Calendario de Transformación 21 Días"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-purple-500 mb-4 leading-tight">
                    📅 CALENDARIO DE TRANSFORMACIÓN 21 DÍAS
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    "Tu ruta exacta día a día hacia la regeneración hepática completa". Un cronograma detallado que te guía paso a paso durante toda tu transformación.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>Cronograma día a día de 21 días</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>Ruta exacta de transformación</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>Seguimiento de progreso diario</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>Regeneración hepática completa</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-purple-600 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder al Calendario
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Tarjeta MENÚ MAESTRO SEMANAL - BÔNUS 3 */}
        <div className="mb-12">
          <a 
            href="https://el-chef-que-salvo-1000-h-lttat9y.gamma.site/"
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-green-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20">
              
              <div className="absolute top-5 right-5 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide z-20">
                🎁 BÔNUS 3
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-green-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="http://renacer21.shop/wp-content/uploads/2025/10/WjRNQsdSBbne_cEhcracz.png"
                    alt="Menú Maestro Semanal"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-green-500 mb-4 leading-tight">
                    🍽️ MENÚ MAESTRO SEMANAL
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    "Receitas Equilibradas - 21 días de comidas que sanan y satisfacen". Un menú completo diseñado específicamente para nutrir y regenerar tu hígado.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-green-500 mr-3 flex-shrink-0">✓</span>
                      <span>21 días de menús completos</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-green-500 mr-3 flex-shrink-0">✓</span>
                      <span>Receitas equilibradas y saludables</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-green-500 mr-3 flex-shrink-0">✓</span>
                      <span>Comidas que sanan y satisfacen</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-green-500 mr-3 flex-shrink-0">✓</span>
                      <span>Nutrición específica para el hígado</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-green-600 hover:to-green-500 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder al Menú Maestro
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Tarjeta DIARIO DE EVOLUCIÓN CIENTÍFICA - BÔNUS 4 */}
        <div className="mb-12">
          <a 
            href="https://el-descubrimiento-que-ca-tn2kag0.gamma.site/"
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-orange-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20">
              
              <div className="absolute top-5 right-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide z-20">
                🎁 BÔNUS 4
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-orange-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="http://renacer21.shop/wp-content/uploads/2025/10/6vH_AZmTwESDjXZ-miLEc.png"
                    alt="Diario de Evolución Científica"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-orange-500 mb-4 leading-tight">
                    📊 DIARIO DE EVOLUCIÓN CIENTÍFICA
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    "Metas y Reflexiones - Tu registro personal de la transformación". Un sistema científico para monitorear y documentar tu progreso día a día.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Registro científico de progreso</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Sistema de metas y reflexiones</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Seguimiento personal detallado</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Documentación de transformación</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-orange-600 hover:to-orange-500 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder al Diario
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Tarjeta GUÍA DE SUPERVIVENCIA SOCIAL - BÔNUS 5 */}
        <div className="mb-12">
          <a 
            href="https://el-dilema-de-los-10000-s-e7z8ye2.gamma.site/"
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-yellow-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/20">
              
              <div className="absolute top-5 right-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide z-20">
                🎁 BÔNUS 5
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-yellow-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="http://renacer21.shop/wp-content/uploads/2025/10/xm6KnP7LGLeKzQ8yzYxit.png"
                    alt="Guía de Supervivencia Social"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-yellow-500 mb-4 leading-tight">
                    🎉 GUÍA DE SUPERVIVENCIA SOCIAL
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    "Eventos y Celebraciones - Mantén tu progreso sin perderte la vida". Estrategias inteligentes para navegar situaciones sociales sin comprometer tu regeneración hepática.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-yellow-500 mr-3 flex-shrink-0">✓</span>
                      <span>Estrategias para eventos sociales</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-yellow-500 mr-3 flex-shrink-0">✓</span>
                      <span>Mantén tu progreso en celebraciones</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-yellow-500 mr-3 flex-shrink-0">✓</span>
                      <span>No te pierdas la vida social</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-yellow-500 mr-3 flex-shrink-0">✓</span>
                      <span>Equilibrio perfecto vida-salud</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-yellow-600 hover:to-yellow-500 hover:shadow-lg hover:shadow-yellow-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder a la Guía Social
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Sección de Soporte */}
        <div className="bg-white/5 p-6 md:p-8 rounded-2xl text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-red-400 text-xl md:text-2xl font-bold mb-4">💬 ¿Necesitas Ayuda?</h3>
          <p className="text-white mb-6 leading-relaxed text-sm md:text-base">
            Nuestro equipo de soporte está disponible para aclarar dudas y asistirte en tu viaje de regeneración hepática.
          </p>
          <a 
            href="mailto:sflourcraft@gmail.com"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30 text-sm md:text-base"
          >
            sflourcraft@gmail.com
          </a>
        </div>

        {/* Pie de página */}
        <div className="text-center py-8 md:py-12 border-t border-red-500/30 text-gray-400">
          <p className="mb-2 text-sm md:text-base">© 2025 RENACER21. Todos los derechos reservados.</p>
          <p className="font-semibold text-sm md:text-base">Tu regeneración hepática comienza ahora.</p>
        </div>
      </div>
    </div>
  );
}
