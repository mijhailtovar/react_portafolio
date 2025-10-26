var Global = {
    // 1. Lee la variable de entorno de Vercel (o localhost por defecto)
    // 2. Asegúrate de que el valor termine con la ruta base de la API '/api/'
    //    Si VERCEL_URL es: https://backend...railway.app
    //    Entonces this.url será: https://backend...railway.app/api/

        url: (import.meta.env.VITE_APP_API_URL || 'http://localhost:3900') + '/api/'

};

export default Global;
