<script setup>
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { auth } from './Firebase/index.js';
import router from  './router';
const isSignedIn = ref(false)

onMounted(() =>{
  onAuthStateChanged(auth, function (user) {
    if (user) {
      if(user.emailVerified) {
        isSignedIn.value = true
        router.push('/home')
      }
    } else {
      router.push('/login')
    }
  })
})
const logout = () => {
    signOut(auth)
      .then(() => {
        isSignedIn.value = false
      })
  }
</script>
<template>
  <header>
    <nav class="nav-container">
      <div class="nav-left">
        <h1 class="app-name">My App</h1>
      </div>
      <div class="nav-right">
        <ul v-show="!isSignedIn">
          <li>
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li>
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
        <ul v-show="isSignedIn">
          <li>
            <router-link to="/home" class="nav-link">Home</router-link>
          </li>
          <li>
            <a href="/login" class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <router-view />
</template>

<style scoped>
  header {
    background-color: #ebebeb;
    color: #111;
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    font-family: 'Montserrat', sans-serif;
  }

  .nav-container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-left {
    display: flex;
    align-items: center;
  }

  .logo {
    height: 3rem;
    margin-right: 1rem;
  }

  .app-name {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 0;
  }

  .nav-right {
    display: flex;
    align-items: center;
  }

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0 0.5rem;
  }

  .nav-link {
    text-decoration: none;
    color: #111;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    transition: all 0.2s ease-in-out;
  }

  .nav-link:hover {
    background-color: #111;
    color: #fff;
  }
</style>

