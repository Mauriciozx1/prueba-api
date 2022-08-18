import { createWebHistory, createRouter } from 'vue-router'
import store from './store/index.js'

/* componentes sin autenticado */
const Login = () => import('./components/auth/Login.vue')
const Register = () => import('./components/auth/Register.vue')
/* componentes sin autenticado*/

/* Diseño principal */
const DahboardLayout = () => import('./views/Main.vue')
/* Diseño principal */

/* Componente autenticado */
const Dashboard = () => import('./views/dashboard/Main.vue')
/* Componente autenticado */


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
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

//Validamos el estado de la sesion para ir a la ruta.
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
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

export default router