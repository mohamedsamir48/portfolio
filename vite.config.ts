import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // depending on your application, base can also be "/"
  clearScreen: false,
  envPrefix: 'APP_',
  css: {
    devSourcemap: true,
  },
})
// export default defineConfig(async({command,mode})=>{
//   // depending on your application, base can also be "/"
//   const env = loadEnv(mode, process.cwd(), "")
//   console.log(env)
//   return {

//   };
// })
