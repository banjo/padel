<template>
    <Nav></Nav>
    <router-view />
</template>

<script>
import store from "./store/index";
import Nav from "./views/Nav.vue";

export default {
    beforeCreate() {
        store.commit.americanoStore.LOAD_STATE();
    },
    components: {
        Nav,
    },
};
</script>

<style>
:root {
    --main-gray: #2f3640;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

@media (max-width: 623px) {
    html {
        font-size: 10px;
    }
}
</style>
