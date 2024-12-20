import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router";

import { DashboardPage } from '@/pages/DashboardPage.tsx';
import { DashboardHome } from './components/pages/dashboard-home';
import { InvoicesList } from './components/pages/invoices/list';
import { InvoicesNew } from './components/pages/invoices/new';
import { InvoicesView } from './components/pages/invoices/view';
import { InvoicesEdit } from './components/pages/invoices/edit';
import { ClientsHome } from './components/pages/clients-home';
import { SettingsHome } from './components/pages/settings-home';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardPage />}>
        <Route index element={<DashboardHome />} />

        <Route path="invoices" element={<InvoicesList />} />
        <Route path="invoices/new" element={<InvoicesNew />} />
        <Route path="invoices/:id/view" element={<InvoicesView />} />
        <Route path="invoices/:id/edit" element={<InvoicesEdit />} />

        <Route path="clients" element={<ClientsHome />} />

        <Route path="settings" element={<SettingsHome />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
