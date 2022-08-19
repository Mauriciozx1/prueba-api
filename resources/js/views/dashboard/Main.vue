<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm">
                    <user-lists ></user-lists>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserLists from '../../components/dashboard/UserLists.vue'
export default {
  components: { UserLists},
    name:"dashboard",
    data(){
        return {
            user:this.$store.state.auth.user
        }
    }
}
</script>