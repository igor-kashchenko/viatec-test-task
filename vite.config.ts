import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/viatec-test-task/',
  plugins: [react()],
})
