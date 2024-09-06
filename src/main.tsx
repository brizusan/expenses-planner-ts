import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BudgeProvider } from './context/Budgetcontext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudgeProvider>
      <App />
    </BudgeProvider>
  </StrictMode>,
)
