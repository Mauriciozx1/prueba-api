<template>
    <div class="cotainer">
        <div class="m-2">
            <!--Paginador de la lista de usuarios-->
                <paginate
                    v-model="page"
                    :page-count="10"
                    :click-handler="getResults"
                    :prev-text="'Atras'"
                    :next-text="'Siguiente'"
                    :container-class="'pagination d-flex' "
                    :page-class="'page-item'"
                    :page-range="2"
                    :margin-pages="1"
                    >
                </paginate>
            <!--Fin Paginador de la lista de usuarios-->
            </div>
        <div class="row justify-content-center align-items-center">
            <div class="col-md-12 text-center m-2">
                <button class="btn btn-primary mx-auto" @click="viewModal(true, {})" data-bs-toggle="modal" data-bs-target="#user-modal">Agregar</button>
            </div>
            
            <h3 v-if="!users.data[0]" class="text-center">No existen más datos</h3>
            <!--Lista de usuarios-->
            <div class="col-md-4 m-2" v-for="user in users.data" :key="user.id">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="buttons">
                            <button class="btn btn-secondary m-2" @click="viewModal(false, user)" data-bs-toggle="modal" data-bs-target="#user-modal">Editar</button>
                            <button class="btn btn-danger m-2" @click="deleteUser(user.id)">Eliminar</button>
                        </div>
                        <ul>
                            <li>{{user.name}}</li>
                            <li>{{user.email}}</li>
                            <li>{{user.birthdate}}</li>
                            <li>Estado : {{user.active ? 'Activado' : 'Desactivado'}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--Fin Lista de usuarios-->
        </div>
    </div>

    <user-modal 
        :type="typeModal" 
        :user="userModel"
        @update-list="updateList"
    ></user-modal>


</template> 

<script>
import UserModal from './UserModal.vue';
import Paginate from 'vuejs-paginate-next';

export default {
  components: { UserModal, Paginate},
    data(){
        return{
            userModel:{},
            users: {
                data:''
            },
            typeModal: '',
            page: 1,
            
        }
    },
    methods:{
        async getResults() {
            await axios.get('api/dashboard?page=' + this.page)
                .then(response => {
                    this.users = response.data;
                    
                });
        },
        updateList(users){
            this.users = users;
            this.page = 1;
        },
        viewModal(type, user){
            this.typeModal = type;
            this.userModel = user;
        },
        deleteUser(id){
            this.$swal.fire({
                title: '¿Estás seguro?',
                text: "Se borrara por completo el usuario, ¡No podrás revertir esto!",
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: '¡Sí, bórralo!'
                }).then((result) => {
                    if (result.value) {
                        axios.delete('api/dashboard/'+id).then(response =>{
                            this.$swal.fire(
                            '¡Eliminado!',
                            'El usuario ha sido eliminado.',
                            'success'
                            );
                            this.updateList(response.data);
                        }).catch((response)=> {
                           this.$swal.fire("¡Ha fallado!", response.message, "warning");
                        });
                    }
                })
        }
    },
    created(){
        this.getResults();
        
    }
}
</script>

<style>
.pagination{
    display: inline-block;
    text-align: center;
}
</style>