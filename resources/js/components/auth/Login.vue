<template>
    <div class="container h-100 mt-4 ">
        <div class="row align-items-center justify-content-center">
            <div class="col-12 col-lg-4 col-md-8">
                <div class="card shawdow sm">
                    <div class="card-body">
                        <h1 class="text-center">Iniciar sesion</h1>
                        <hr/>
                        <form @submit.prevent="login" class="row">
                            <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group col-12">
                                <label for="email" class="font-weight-bold">Correo electronico</label>
                                <input type="text" v-model="auth.email" name="email" id="email" class="form-control">
                                <small>Email test: demoprueba@test.cl</small>
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="password" class="font-weight-bold">Contraseña</label>
                                <input type="password" v-model="auth.password" name="password" id="password" class="form-control">
                                <small>Contraseña test: password</small>
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" :disabled="processing" class="btn btn-primary btn-block">
                                    {{ processing ? "Espere por favor" : "Ingresar" }}
                                </button>
                            </div>
                        </form>
                        <div class="col-12 text-center">
                            <label><router-link :to="{name:'register'}">Registrate aquí</router-link></label>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name:"login",
    data(){
        return {
            auth:{
                email:"",
                password:""
            },
            validationErrors:{},
            processing:false
        }
    },
    methods:{
        ...mapActions({
            signIn:'auth/login'
        }),
        async login(){
            this.processing = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/login',this.auth).then(({data})=>{
                this.signIn()
            }).catch(({response})=>{
                if(response.status===422){
                    this.validationErrors = response.data.errors
                }else{
                    this.validationErrors = {}
                    alert(response.data.message)
                }
            }).finally(()=>{
                this.processing = false
            })
        },
    }
}
</script>