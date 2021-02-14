<script>
export default {
    name: 'UserSearchForm',
    data() {
        return {
            username: '',
        }
    },
}
</script>

<template>
    <div>
        <form @submit.prevent="$emit('submitted', username)">
            <input type="text" v-model="username" />
            <button type="submit">Enviar</button>
        </form>
    </div>
</template>
