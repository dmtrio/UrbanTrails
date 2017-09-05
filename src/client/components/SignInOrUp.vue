<template>
  <div>
    <h2> Urban Trails </h2>
    <h3>Sign in</h3>
    <v-form v-model="valid" ref="form">
      <v-text-field
        label="E-mail"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        :rules="nameRules"
        :counter="10"
        required
      ></v-text-field>


    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          valid: false,
          name: '',
          nameRules: [
          (v) => !!v || 'Username is required',
          (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
          ],
          email: '',
          emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
          ],
          select: null,
          items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4'
          ],
          checkbox: false
        }
      },
      computed: {
        countTwo() {
          return this.$store.state.count
        }
      },
      methods: {
        submit () {
          this.$refs.form.validate()
        },
        clear () {
          this.$refs.form.reset()
        }
      }
    }
  </script>
