import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { NotificationProvider } from "./contexts/NotificationContext"

console.log('Main.tsx: NotificationProvider imported:', NotificationProvider);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
    <Toaster />
  </StrictMode>,
)