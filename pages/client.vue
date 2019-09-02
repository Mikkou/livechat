<template>
  <div>
    <v-app-bar
      color="red darken-3"
      dark
      class="header"
    >
      <v-icon>mdi-arrow-left</v-icon>

      <v-toolbar-title>Blake</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-layout
      color="gray"
      class="content ma-3"
      column
    >
      <v-flex>
        <v-layout class="message">
          <v-flex class="message__logo-section">
            <div class="message__logo"/>
          </v-flex>
          <v-flex>Привет</v-flex>
          <v-flex class="message__logo-section">
            <div class="message__logo"/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-row class="footer">
      <v-col cols="11">
        <v-text-field/>
      </v-col>
      <v-col ma-3 cols="1">
        <v-btn text icon color="error">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class extends Vue {
    constructor () {
      super()
    }
  }
</script>

<style lang="scss" scoped>

  .header {
    height: 8vh;
  }

  .content {
    height: 80vh;
  }

  .message {
    height: 50px;

    &__logo {
      @extend .message;
      width: 50px;
      background: red;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
    }
  }
</style>
