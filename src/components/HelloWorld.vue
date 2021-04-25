<template>
  <v-card class="mx-auto overflow-hidden" height="100%" max-width="500">
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
            class="mb-2">

            

           <v-card-actions> 
            <v-row>
              <!-- Titulo -->
              <v-col class="text-left">
                <v-card-title> {{ title }} </v-card-title>
              </v-col>

              <!-- Menú de opciones -->
              <v-col class="text-right">  
                  <v-menu bottom v-model="closeOnClick" style="max-width: 600px"> 
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn class="btn-fix" v-bind="attrs" v-on="on" icon>
                        <v-icon>mdi-dots-vertical</v-icon>

                      </v-btn>
                    </template> 
                    <!-- Options -->
                    <v-list>
                      <!-- Delete -->
                      <v-list-item> 
                        <v-btn class="btn-fix" text v-on:click="deleteBook(id)"> 
                          Delete
                        </v-btn> 
                      </v-list-item>
                      <!-- Edit -->
                      <v-list-item> 
                        <v-btn class="btn-fix" text v-on:click="showUpdateForm(id)"> 
                          Edit
                        </v-btn> 
                      </v-list-item>
                    </v-list>
                  </v-menu>
              </v-col>
            </v-row>
           </v-card-actions>
            <!-- Autor -->
            <v-card-subtitle class="text-left"> {{ author }} </v-card-subtitle>

            <v-card-actions>
              <!-- Fecha -->
              <v-col class="text-left">
                <font-awesome-icon icon="calendar-alt" /> Jan 14 - Jan 20
              </v-col>
              <!-- Delete button -->
              <!-- <v-col class="text-right">
                <v-btn class="btn-fix" text> 
                  <font-awesome-icon v-on:click="deleteBook(id)" icon="trash-alt" />
                </v-btn> 
              </v-col> -->
            </v-card-actions>

          </v-card>

         

          

           

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

    <!-- Add Book Button -->
    <v-btn class="btn-fix"
            @click="showForm()"
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

    <!-- Overlay for displaying AddBook Form -->
          <v-overlay :absolute="absolute"
                     :value="overlay">

            <div>
              <!-- Title -->
              <v-text-field label="Title"
                            :rules="rules"
                            v-model="title"
                            hide-details="auto">
              </v-text-field>
              <!-- Author -->
              <v-text-field label="Author" v-model="author" ></v-text-field>
            </div>

            <v-row>
              <v-col>
                <v-btn color="success"
                       @click="createBook()">
                  Save
                </v-btn>
              </v-col>

              <v-col>
                <v-btn color="success"
                       @click="cancelCreate()">
                  Cancel
                </v-btn>
              </v-col>

            </v-row>
          </v-overlay>
    <!-- Overlay for updating form -->
    <v-overlay :absolute="absoluteUpdate"
                     :value="overlayUpdate">

            <div>
              <!-- Title -->
              <v-text-field label="Title"
                            :rules="rules"
                            v-model="upTitle"
                            hide-details="auto">
              </v-text-field>
              <!-- Author -->
              <v-text-field label="Author" v-model="upAuthor" ></v-text-field>
            </div>

            <v-row>
              <v-col>
                <v-btn color="success"
                       @click="updateBook(upTitle, upAuthor)">
                  Save
                </v-btn>
              </v-col>

              <v-col>
                <v-btn color="success"
                       @click="cancelCreate()">
                  Cancel
                </v-btn>
              </v-col>

            </v-row>
          </v-overlay>
  </v-card>
</template>

<script>
import firebase from "../firebaseConfig";

const db = firebase.firestore();

export default {
  name: "HelloWorld",
  data: () => ({
    absolute: true,
    overlay: false,
    overlayUpdate: false, 
    absoluteUpdate: true,
    drawer: false,
    group: null,
    closeOnClick: false,
    title: "",
    author: "",
    upTitle:"",
    upAuthor: "",
    idUpdate: -1,
    rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
    ],
    books: [],
    
  }),

  methods: {
    // Actualizar un libro de la base de datos
    updateBook: function(title, author)
    {
      db.collection("books")
        .doc(this.id)
        .update({
          title: title, 
          author: author,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    },

    // Eliminar un libro de la base de datos (se actualiza la vista)
    deleteBook: function (id)
    {
      db.collection("books")
        .doc(id)
        .delete()
        .then(() => {
          var i = -1;
          this.books.forEach(function (book, index) {
            if (book.id === id)
            {
              i = index;
            }
          });
          if (i >= 0)
          {
            this.$delete(this.books, i);
          }
          console.log("Book deleted");
        })
        .catch((error) => {
          console.error("Error while deleting book ", error);
        });
    },

    // Agregar un libro a la base de datos (se actualiza la vista)
    createBook: function()
    {
      var obj = {title: this.title, author: this.author};
      db.collection("books")
        .add(obj);
      this.books.push(obj)
      this.overlay = false;
    },

    // Obtener todos los libros de la base de datos (se llama al iniciar la app)
    readBooks: function()
    {
      this.books = []
      db.collection("books")
        .get()
        .then((querySnapshot => {
          querySnapshot.forEach((doc) => {
            this.books.push({
              id: doc.id,
              title: doc.data().title,
              author: doc.data().author,
            });
            console.log("Added");
          });
        })
        )
        .catch((error) => {
          console.log("Error getting books ", error);
        });
    },

    // Muestra el formulario para agregar un libro, se llama al apretar el botón '+'
    showForm: function()
    {
      this.title = "";
      this.author = ""; 
      this.overlay = !this.overlay
    },

    // Muestra form para actualizar
    showUpdateForm: function(id)
    {
      this.idUpdate = id;
      this.books.forEach(function (book) {
        if (book.id === id)
        {
          this.upTitle = book.title;
          this.upAuthor = book.author; 
          this.overlayUpdate = !this.overlayUpdate
        }
      })
    },

    // Comando ejecutado al apretar el botón de cancelar en la form
    // para agregar un libro
    cancelCreate: function()
    {
      this.title = "";
      this.author = "";
      this.overlay = false;
    },
    
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },

  // Se leen todos los libros de la db al arrancar la app
  mounted(){
      this.readBooks();
  },
};

</script>

<style>
  .btn-fix:focus::before { opacity: 0 !important; }

  .overlay {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: blue;
  }

</style>