// Global.jsx (o Global.js)

/* * 1. import.meta.env.VITE_APP_API_URL es la variable que Vercel inyectará 
 * (asumiendo que la configuraste en el panel de Vercel).
 * 2. || (OR) 'http://localhost:3900/api/' se usa como valor por defecto 
 * cuando estás desarrollando en local.
 */

var Global = {
    // Lee la variable de entorno de Vite o usa el valor local por defecto
    url: import.meta.env.VITE_APP_API_URL || 'http://localhost:3900/api/'
};

export default Global;