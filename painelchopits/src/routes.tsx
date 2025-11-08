import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
//import { Home } from "./pages/Home"
import { Categorias } from "./pages/Categorias"
import { Usuarios } from "./pages/Usuarios"
import GerenciarUsuarios from "./pages/Usuarios/Gerenciar"
import { Clients } from "./pages/Clients"
import GerenciarClients from "./pages/Clients/Gerenciar"
import Login from "./pages/Login"

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login/>}
                />
                <Route
                    path="/categorias/:id"
                    element={<Categorias/>}
                />
                <Route
                    path="/usuarios"
                    element={<Usuarios/>}
                />
                <Route
                    path="/usuarios/:id"
                    element={<GerenciarUsuarios/>}
                />
                <Route
                    path="*"
                    element={<h1>404</h1>}
                />
                <Route
                    path="/clients"
                    element={<Clients/>}
                />
                <Route
                    path="/clients/:id"
                    element={<GerenciarClients/>}
                />
            </Routes>
        </BrowserRouter>
    )
}