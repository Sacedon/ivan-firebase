<template>
    <div class="login-form mt-5">
        <div v-show="error" class="alert alert-danger">
            {{ errorMsg }}
        </div>
        <div v-show="success" class="alert alert-success">
            {{ successMsg }}
        </div>
      <h2 class="login-form__title">Login</h2>
      <form class="login-form__form" @submit.prevent="loginUser">
        <div class="login-form__input-group">
          <label for="email" class="login-form__label">Email:</label>
          <input type="email" id="email" class="login-form__input" v-model="email">
        </div>
        <div class="login-form__input-group">
          <label for="password" class="login-form__label">Password:</label>
          <input type="password" id="password" class="login-form__input" v-model="password">
        </div>
        <div class="login-form__submit">
          <button class="login-form__button mb-2" type="submit">Login</button>
        </div>
        <div class="form-group">
        <button class="btn btn-secondary" type="button" @click.prevent="signInWithGoogle">
          <i class="fab fa-google"></i> Google Sign-In
        </button>
      </div>
      
      </form>
      <div class="login-form__register-link">
        <router-link to="register" style="color:black;">Don't have an account yet?</router-link>
      </div>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  import { auth } from '../Firebase/index.js' 
  import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithEmailAndPassword, signInWithPopup, getAuth} from '@firebase/auth'
  import router from '../router/index.js'
  

  const email = ref('')
  const password = ref('')
  const error = ref('')
  const errorMsg = ref('')
  const success = ref('')
  const successMsg = ref('')

  const loginUser = () => {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((cred) => {
            if (cred.user.emailVerified) {
                router.push('/home')
            } else {
                error.value = true
                errorMsg.value = "Your account is not yet verified!"
                email.value = ''
                password.value = ''
            }
        })
        .catch((err) => {
          error.value = true
          errorMsg.value = err.message
        })
    } 
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    signInWithPopup(auth, provider)
        .then((cred) => {
            console.log(cred.user)
            router.push('/home')
        })
        .catch((err) => {
            error.value = true
            errorMsg.value = err.message
        })
  }
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider()
    provider.setCustomParameters({ prompt: 'select_facebook_account' })
    signInWithPopup(auth, provider)
        .then((cred) => {
            console.log(cred.user)
            router.push('/home')
        })
        .catch((err) => {
            error.value = true
            errorMsg.value = err.message
        })
  }
  const signInWithTwitter = () => {
    const provider = new TwitterAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    signInWithPopup(auth, provider)
        .then((cred) => {
            console.log(cred.user)
            router.push('/home')
        })
        .catch((err) => {
            error.value = true
            errorMsg.value = err.message
        })
  }
  const signInWithGithub = () => {
    const provider = new GithubAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    signInWithPopup(auth, provider)
        .then((cred) => {
            console.log(cred.user)
            router.push('/home')
        })
        .catch((err) => {
            error.value = true
            errorMsg.value = err.message
        })
  }
</script>

<style scoped>
.login-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #f3f4f6;
}

.login-form__title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
}

.login-form__form {
  display: flex;
  flex-direction: column;
}

.login-form__input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.login-form__label {
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.login-form__input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
}

.login-form__submit {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.login-form__button {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: #fff;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.login-form__button:hover {
  background-color: #1d4ed8;
}

.login-form__register-link {
  text-align: center;
  margin-top: 1rem;
  color: #1f2937;
  font-size: 0.9rem;
}

.login-form__register-link a {
  color: #2563eb;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.login-form__register-link a:hover {
  color: #1d4ed8;
}
</style>