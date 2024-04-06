import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'


export default defineConfig(({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())}

    return {
        // depending on your application, base can also be "/"
        base: '',
        plugins: [
            react(), 
            viteTsconfigPaths(),
            TanStackRouterVite()
        ],
        server: {            
            open: true, // this ensures that the browser opens upon server start
            port: parseInt(process.env.VITE_PORT ?? '8080'), 
        }
    }
})