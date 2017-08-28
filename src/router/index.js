import Vue from 'vue'
import Router from 'vue-router'
import rooms from '@/rooms'
import Home from '@/components/Home'
import Room from '@/components/room/Room'
import MessageList from '@/components/room/MessageList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/r/:room',
      component: Room,
      props: true,
      children: [
          { path: '', name: 'Room', component: MessageList, props: true },
      ],
      beforeEnter: (to, from, next) => {
          let room = to.params.room;

          if (!rooms.hasOwnProperty(room)) {
              console.log('Room not found.')
              return next('/');
          }

          next();
      }
    }
  ]
})
