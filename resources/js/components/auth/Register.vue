<template>
    <div class="container h-100 mt-4">
        <div class="row h-100 justify-content-center">
            <div class="col-12 col-lg-4 col-md-8">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Registro</h1>
                        <hr/>
                        <p class="text-center">Por favor complete el siguiente formulario para realizar el registro</p>
                        <!--Formulario de registro-->
                        <form @submit.prevent="register" class="row" method="post">
                            <!--Lista de errores-->
                            <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                                    </ul>
                                </div>
                            </div>
                            <!--Fin Lista de errores-->
                            <div class="form-group col-12">
                                <label for="name" class="font-weight-bold">Nombre *</label>
                                <input type="text" name="name" v-model="user.name" id="name" placeholder="Ingresa tu nombre" class="form-control">
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="email" class="font-weight-bold">Correo *</label>
                                <input type="email" name="email" v-model="user.email" id="email" placeholder="Ingresa correo electronico" class="form-control">
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="birthdate" class="font-weight-bold">Fecha de nacimiento *</label>
                                <input type="date" name="birthdate" v-model="user.birthdate" id="birthdate" placeholder="Ingresa correo electronico" class="form-control">
                            </div>
                            <div class="form-group col-12">
                                <label for="password" class="font-weight-bold">Contraseña *</label>
                                <input type="password" name="password" v-model="user.password" id="password" placeholder="Ingresa una contraseña" class="form-control">
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="password_confirmation" class="font-weight-bold">Confirmar contraseña *</label>
                                <input type="password_confirmation" name="password_confirmation" v-model="user.password_confirmation" id="password_confirmation" placeholder="Re-ingresa la contraseña" class="form-control">
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" :disabled="processing" class="btn btn-primary btn-block">
                                    {{ processing ? "Espere por favor" : "Registrar" }}
                                </button>
                            </div>
                        </form>
                        <!--Fin Formulario de registro-->
                        <small>* Obligatorio</small>
                        <div class="col-12 text-center">
                            <label><router-link :to="{name:'login'}">Volver al login!</router-link></label>
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
    name:'register',
    data(){
        return {
            user:{
                active:true
            },
            validationErrors:{},
            processing:false
        }
    },
    methods:{
        ...mapActions({
            signIn:'auth/login'
        }),
        async register(){
            this.processing = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/register',this.user).then(response=>{
                this.validationErrors = {}
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
        }
    }
}
</script>