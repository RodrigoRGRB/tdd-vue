<template>
    <div>
        <UserSearchForm @submitted="searchUser" />
        <UserProfile :user="user" />
    </div>
</template>

<script>
import UserSearchForm from '@/components/UserSearchForm'
import UserProfile from '@/components/UserProfile'
import { mapState } from 'vuex'
export default {
    name: 'UserView',
    components: {
        UserSearchForm,
        UserProfile,
    },
    methods: {
        searchUser(username) {
            this.$store.dispatch('SEARCH_USER', { username })
        },
    },
    computed: {
        ...mapState({
            user: 'user',
        }),
    },
}
</script>
