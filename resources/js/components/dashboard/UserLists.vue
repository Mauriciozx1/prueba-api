<template>
    <div class="cotainer">
        <nav class="m-2 ">
        <!--Paginador de la lista de usuarios-->
            <paginate
                v-model="page"
                :page-count="users.last_page+1"
                :click-handler="getResults"
                :prev-text="'Atras'"
                :next-text="'Siguiente'"
                :container-class="'pagination d-flex' "
                :page-class="'page-item'"
                :page-link="'page-link'"
                :page-range="2"
                :margin-pages="1"
                >
            </paginate>
        <!--Fin Paginador de la lista de usuarios-->
        </nav>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="button m-2">
                    <button class="btn btn-primary mx-auto" @click="viewModal(true, {})" data-bs-toggle="modal" data-bs-target="#user-modal"> Agregar usuario <i class="fas fa-plus"></i></button>
            
                </div>
                </div>
            <h2 class="text-center">Lista de usuarios</h2>
            <div class="hr">
                <hr class="m-4 ">
            </div>
            <h4 v-if="!users.data[0]" class="text-center m-4">No existen más datos <i class="fas fa-exclamation"></i></h4>
            <!--Lista de usuarios-->
            <div class="col-md-6 col-lg-4 m-2" v-for="user in users.data" :key="user.id">
                <div class="card shadow p-3 mb-5 bg-body rounded" style="background:#e8e8e8 !important;">
                    <div class="card-body text-center">
                        <div class="buttons">
                            <button class="btn btn-sm btn-warning m-2" @click="viewModal(false, user)" data-bs-toggle="modal" data-bs-target="#user-modal"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger m-2" @click="deleteUser(user.id)"><i class="fas fa-trash"></i></button>
                        </div>
                        <table class="table table-responsive">
                            <tbody>
                                <tr>
                                    <th>Estado:</th>
                                    <td :class="user.active ? 'text-success':'text-danger'">{{user.active ? 'Activado' : 'Desactivado'}}</td>
                                </tr>
                                <tr>
                                    <th>Nombre:</th>
                                    <td>{{user.name}}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{{user.email}}</td>
                                </tr>
                                <tr>
                                    <th>Nacimiento:</th>
                                    <td>{{user.birthdate}}</td>
                                </tr>
                            </tbody>
                        </table>
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
                    console.log(response);
                    
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

</style>