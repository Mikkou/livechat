<template>
  <v-list
    nav
    dense
  >
    <v-list-item-group v-model="item" color="primary">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
  import {Component, Vue} from 'vue-property-decorator'
  import axios from 'axios'

  @Component
  export default class extends Vue {

    item = 0
    items = []

    constructor () {
      super()
    }

    created () {
      this.run()
    }

    async run () {
      const { data: { users } } = await axios.get('/users')
      this.items = users
    }
  }
</script>
