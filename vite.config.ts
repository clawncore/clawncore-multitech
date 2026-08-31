import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    base: '/',
    plugins: [
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "src"),
        },
    },
    build: {
        outDir: path.resolve(import.meta.dirname, "dist"),
        emptyOutDir: true,
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
                    let extType = assetInfo.name.split('.').at(1);
                    if (!extType || /png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'img';
                    }
                    return `assets/${extType}/[name]-[hash][extname]`;
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                manualChunks: {
                    'three': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
                    'framer': ['framer-motion', 'framer-motion-3d'],
                },
            },
        },
    },
    server: {
        fs: {
            strict: true,
            deny: ["**/.*"],
        },
        watch: {
            ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/backend/**'],
        },
    },
});