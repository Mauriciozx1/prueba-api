import { createWebHistory, createRouter } from 'vue-router'
import store from './store/index.js'
import axios from 'axios';
/* componentes sin autenticado */
const Login = () => import('./components/auth/Login.vue')
const Register = () => import('./components/auth/Register.vue')
/* componentes sin autenticado*/

/* Diseño principal */
const DahboardLayout = () => import('./views/LayoutMain.vue')
/* Diseño principal */

/* Componente autenticado */
const Dashboard = () => import('./views/dashboard/Main.vue')
/* Componente autenticado */

/*Diseño de error */
const Forbidden= () => import('./views/errors/403.vue')
/*Diseño de error */
//Rutas de la plataforma
const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        path: "/",
        component: DahboardLayout,
        meta: {
            middleware: "auth"
        },
        children: [
            {
                name: "dashboard",
                path: '/',
                component: Dashboard,
                meta: {
                    title: `Dashboard`
                }
            },
        ]
    },
    {
        name: "403",
        path: "/403",
        component: Forbidden,
        meta: {
            title: `403 - Acceso Denegado`
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

//Validamos el estado de la sesion para ir a la ruta.
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    console.log(document);
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
            next({ name: "dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})
//Verificación de errores en las consultas
axios.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    error => {
        const { status, data } = error.response;
        if (status === 403) {
            router.push("/403");
        }
        return Promise.reject(error);
    }
);
export default router