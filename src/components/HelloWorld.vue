<template>
  <v-card class="mx-auto overflow-hidden" height="auto" max-width="500">
    <v-system-bar color="deep-purple darken-3"></v-system-bar>

    <v-app-bar color="deep-purple accent-4" dark prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title> My Books </v-toolbar-title>

      <v-spacer></v-spacer>

        <!-- btn-fix pq esta re bugueado y se queda resaltado despues de ser seleccionado el boton -->
        <v-btn class="btn-fix" icon>
          <v-icon> mdi-magnify </v-icon>
        </v-btn>

        <!-- coso raro -->
        <!-- <v-btn icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn> -->

        <!-- tres puntitos verticales -->
        <!-- <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->
  
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title> About </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <div class="text-center">
      <v-tabs fixed-tabs>
        <v-tab> This Month </v-tab>
        <!-- Add Book Button -->
        

        <v-tab-item>
          
          <br />
          <v-card
            v-for="{ id, title, author } in books"
            :key="id"
            elevation="8"
            outlined
            class="mb-2"
          >
            <v-card-title> {{ title }} </v-card-title>
            <v-card-subtitle align="Left"> {{ author }} </v-card-subtitle>
            <v-card-actions>
              <v-col class="text-left">
                <font-awesome-icon icon="calendar-alt" /> Jan 14 - Jan 20
              </v-col>
              <!-- delete button -->
              <v-col class="text-right">
                <v-btn class="btn-fix" text> 
                  <font-awesome-icon v-on:click="deleteBook(id)" icon="trash-alt" />
                </v-btn> 
              </v-col>
            </v-card-actions>
          </v-card>

          <!-- Add Book Button -->
          <v-btn class="btn-fix"
                 dark
                 fab
                 fixed
                 bottom
                 right
                 color="indigo">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>

        </v-tab-item>

        <v-tab> This Year </v-tab>
        <v-tab-item>
          <br />
          <v-card
            v-for="{ id, title, author } in books"
            :key="id"
            elevation="8"
            outlined
            class="mb-2"
          >
            <v-card-title> {{ title }} </v-card-title>
            <v-card-subtitle align="Left"> {{ author }} </v-card-subtitle>
            <v-card-actions>
              <v-col class="text-left">
                <font-awesome-icon icon="calendar-alt" /> Jan 14 - Jan 20
              </v-col>

              <!-- Delete button -->
              <v-col class="text-right">
                <!-- <v-btn fab> -->
                  <font-awesome-icon icon="trash-alt" />
                <!-- </v-btn> -->
              </v-col>
            </v-card-actions>
          </v-card>
        </v-tab-item>

      </v-tabs>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    drawer: false,
    group: null,
    books: [ 
      {
        id: 0,
        author: "Stephen King",
        title: "El Resplandor",
      },
      {
        id: 1,
        author: "Paul Auster",
        title: "El País de las Últimas Cosas",
      },
      {
        id: 2,
        author: "George Orwell",
        title: "1984",
      },
      {
        id: 3,
        author: "Aldous Huxley",
        title: "Un Mundo Feliz",
      },
      {
        id: 4,
        author: "Isaac Asimov",
        title: "El Fin de la Eternidad",
      },
    ],
  }),

  methods: {
    deleteBook: function (index)
    {
      this.$delete(this.books, index)
    }
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style>
  .btn-fix:focus::before { opacity: 0 !important; }
</style>