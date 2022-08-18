<template>
  <!-- Modal -->
    <div class="modal fade" id="user-modal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="userModalLabel">{{type ? 'Crear nuevo usuario' : 'Actualizar información'}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
                <!--Formulario-->
                <form @submit.prevent="type ? createUser() : updateUser()" class="row" >
                    <!--Lista de errores-->
                    <div class="col-12" v-if="user.validationErrors">
                        <div class="alert alert-danger">
                            <ul class="mb-0">
                                <li v-for="(value, key) in user.validationErrors" :key="key">{{ value[0] }}</li>
                            </ul>
                        </div>
                    </div>
                    <!--Fin Lista de errores-->
                    
                    <div class="form-group col-12">
                        <label for="name" class="font-weight-bold">Nombre</label>
                        <input type="text" name="name" v-model="user.name" id="name" placeholder="Ingresa tu nombre" class="form-control" required>
                    </div>
                    <div class="form-group col-12 my-2">
                        <label for="email" class="font-weight-bold">Correo</label>
                        <input type="email" name="email" v-model="user.email" id="email" placeholder="Ingresa correo electronico" class="form-control" required>
                    </div>
                    <div class="form-group col-12 my-2">
                        <label for="birthdate" class="font-weight-bold">Fecha de nacimiento</label>
                        <input type="date" name="birthdate" v-model="user.birthdate" id="birthdate"  class="form-control" required>
                    </div>
                    <div class="form-group col-12">
                        <label for="password" class="font-weight-bold">{{type ? 'Contraseña' : 'Nueva contraseña'}}</label>
                        <input type="password" name="password" v-model="user.password" id="password" placeholder="Ingresa una contraseña" class="form-control" :required="type">
                    </div>
                    <div class="form-group col-12 my-2">
                        <label for="password_confirmation" class="font-weight-bold">Confirmar contraseña</label>
                        <input type="password_confirmation" name="password_confirmation" v-model="user.password_confirmation" id="password_confirmation" placeholder="Re-ingresa la contraseña" class="form-control" :required="type">
                    </div>
                    <div class="form-group col-12">
                        <label for="name" class="font-weight-bold">Estado</label>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" :checked="user.active" :true-value="true" :false-value="false" v-model="user.active">
                            <label class="form-check-label" for="flexSwitchCheckDefault">{{user.active ? 'Activado' : 'Desactivado'}}</label>
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" class="btn btn-primary" :disabled="processing">{{type ? 'Crear usuario' : 'Actualizar usuario'}}</button>
                        </div>
                    </div>
                </form>
                <!--Fin Formulario-->
            </div>
                
            </div>
        </div>
    </div>
    <!--Fin Modal-->
</template>

<script>
import { Modal } from 'bootstrap';
import { useToast } from 'vue-toastification'
export default {
    props:{
        type:{},
        user: {
            default: function(){
                return{
                    names:'',
                    email:'',
                    birthdate:'',
                    password:'',
                    password_confirmation:'',
                    validationErrors:{}
                }
            }
        },
    },
    data(){
        return{
            toast: useToast(),
            processing: false,
        }
    },
    mounted() {
        this.theModal = new Modal(document.getElementById('user-modal'));
    },
    methods:{
        async createUser(){
            this.processing = true;
            axios.post('api/dashboard',this.user).then(response => {
                this.toast.success('Usuario creado con exito');
                this.updateData(response.data);
            }).catch(({response})=>{
                if(response.status === 422){
                    this.user.validationErrors = response.data.errors;
                    
                }else{
                    this.user.validationErrors = {}
                    alert(response.data.message)
                }
            }).finally(()=>{
                this.processing = false
            })
        },
        async updateUser(){
            this.processing = true;
            axios.put('api/dashboard/'+this.user.id,this.user).then(response => {
                this.toast.success('Usuario actualizado con exito');
                this.updateData(response.data);
                
            }).catch(({response})=>{
                if(response.status===422){
                    this.user.validationErrors = response.data.errors;
                    
                }else{
                    this.user.validationErrors = {}
                    alert(response.data.message)
                }
            }).finally(()=>{
                this.processing = false
            })
        },
        updateData(data){
            this.theModal.hide();
            this.$emit('update-list', data);
        }
    }
}
</script>

<style>

</style>