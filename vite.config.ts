import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          services: path.resolve(__dirname, 'services.html'),
          products: path.resolve(__dirname, 'products.html'),
          productDetails: path.resolve(__dirname, 'product-details.html'),
          events: path.resolve(__dirname, 'events.html'),
          packages: path.resolve(__dirname, 'packages.html'),
          locations: path.resolve(__dirname, 'locations.html'),
          hyderabad: path.resolve(__dirname, 'hyderabad.html'),
          bangalore: path.resolve(__dirname, 'bangalore.html'),
          mumbai: path.resolve(__dirname, 'mumbai.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          about: path.resolve(__dirname, 'about.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          privacy: path.resolve(__dirname, 'privacy.html'),
          terms: path.resolve(__dirname, 'terms.html'),
          admin: path.resolve(__dirname, 'admin.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: true,
    },
  };
});
