<template>
  <div>
    <v-app-bar
      class="header"
      color="red darken-3"
      dark
    >
      <v-icon>mdi-arrow-left</v-icon>

      <v-toolbar-title>Blake</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-layout
      class="content ma-3"
      color="gray"
      column
    >
      <v-flex>
        <v-layout
          :key="index"
          class="message my-3"
          v-for="(message, index) in messages"
        >
          <v-flex class="message__logo-section">
            <div
              :class="message.nick.split('-')[0]"
              class="message__logo"
              v-if="message.nick !== profile.nick"
            />
          </v-flex>
          <v-flex>{{ message.text }}</v-flex>
          <v-flex class="message__logo-section">
            <div
              :class="message.nick.split('-')[0]"
              class="message__logo"
              v-if="message.nick === profile.nick"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-row class="footer">
      <v-col cols="11">
        <v-text-field
          @keyup.enter="sendMessage"
          v-model="message"
        />
      </v-col>
      <v-col cols="1" ma-3>
        <v-btn
          @click="sendMessage"
          color="error" icon text
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>

</template>

<script>
  import {Component, Vue} from 'vue-property-decorator'
  import io from 'socket.io-client'

  @Component
  export default class extends Vue {

    message = ''
    profile = {
      color: '',
      nick: ''
    }
    messages = []

    constructor () {
      super()
    }

    mounted () {
      this.socket = io('http://127.0.0.1:3000')
      this.socket.on('chat message', (message) => {
        this.messages.push(message)
      })
      this.socket.on('nick', (nick) => {
        if (!this.profile.nick) {
          this.profile.color = nick.split('-')[0]
          console.log(nick)
          this.profile.nick = nick
        }

      })
      this.socket.on('messages', (messages) => {
        this.messages = messages
      })
    }

    sendMessage () {
      this.socket.emit('chat message', {
        nick: this.profile.nick,
        text: this.message
      })
      this.message = ''
    }
  }
</script>

<style lang="scss" scoped>

  .header {
    min-height: 60px;
  }

  .content {
    height: 80vh;
  }

  .message {
    height: 50px;

    &__logo {
      @extend .message;
      width: 50px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
    }
  }
</style>
