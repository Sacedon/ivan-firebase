<template>
    <div class="register-form mt-5">
        <div v-show="error" class="alert alert-danger">
            {{ errorMsg }}
        </div>
        <div v-show="success" class="alert alert-success">
            {{ successMsg }}
        </div>
      <h2 class="register-form__title">Register an Account</h2>
      <form class="register-form__form" @submit.prevent="registerUser">
        
        <div class="register-form__input-group">
          <label for="email" class="register-form__label">Email:</label>
          <input type="email" id="email" class="register-form__input" v-model="email">
        </div>
        <div class="register-form__input-group">
          <label for="password" class="register-form__label">Password:</label>
          <input type="password" id="password" class="register-form__input" v-model="password">
        </div>
        
        
        <div class="register-form__submit">
          <button class="register-form__button" type="submit">Register</button>
        </div>
      </form>
      <div class="register-form__login-link mt-3">
        <router-link to="login" style="color:black;">Already have an account?</router-link>
      </div>
    </div>
  </template>


<script setup>
  import { ref } from 'vue'
  import { db } from '../Firebase/index.js'
  import { collection, addDoc } from 'firebase/firestore'
  import { auth } from '../Firebase/index.js'
  import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
  import router from '../router'

  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const errorMsg = ref('')
  const success = ref('')
  const successMsg = ref('')

  const registerUser = async() => {
  if (email.value != '' || password.value !=''){
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async (cred) => {
        email.value = ''
        password.value = ''
        sendEmailVerification(cred.user)
        error.value = false
        success.value = true
        successMsg.value = "Registered Successfully, A Verification link has been sent into your email!"
      })
      .catch((err) => {
        error.value = true
        errorMsg.value = err.message
      })

  } else {
    error.value = true
    errorMsg.value = "Please fill out all the fields"
  }
}
</script>


<style scoped>
  .register-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 1.5rem;
    border: 2px solid #e3e7ee;
    border-radius: 0.5rem;
    background-color: #fff;
    font-family: Arial, sans-serif;
  }

  .register-form__title {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #121213;
    font-size: 2rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .register-form__form {
    display: flex;
    flex-direction: column;
  }

  .register-form__input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .register-form__label {
    margin-bottom: 0.5rem;
    color: #121213;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .register-form__input {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
    font-family: Arial, sans-serif;
  }

  .register-form__submit {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .register-form__button {
    padding: 0.5rem 1rem;
    background-color:#2563eb;
    color: #fff;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .register-form__button:hover {
    background-color: #1d4ed8;
    color: #fff;
  }

  .register-form__login-link {
    text-align: center;
    margin-top: 1rem;
    color: #1d4ed8;
    font-weight: bold;
    text-decoration: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .register-form__login-link:hover {
    color: #39548a;
    text-decoration: underline;
  }
</style>
