import { createRoot } from 'react-dom/client'
import './index.css'
import Approutes from './routes/Approutes.tsx'
import "./services/Interceptors.ts"

const savedTheme = localStorage.getItem("theme") || "light"
document.documentElement.setAttribute("data-theme", savedTheme)

createRoot(document.getElementById('root')!).render(
    <Approutes/>
)
