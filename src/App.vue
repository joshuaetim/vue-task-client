<template>
  <div class="container">
    <Header :showAddTask="showAddTask" @toggle-add-task="toggleAddTask" title="Hello World"/>
    <div v-show="showAddTask">
    <AddTask @add-task="addTask"  />
    </div>
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
  </div>
  <router-view/>
</template>

<script>
  import Header from './components/Header'
  import Tasks from './components/Tasks'
  import AddTask from './components/AddTask'

  export default {
    name: 'App',
    components: {
      Header,
      Tasks,
      AddTask
    },
    data() {
      return {
        tasks: [],
        showAddTask: false
      }
    },
    methods: {
      async deleteTask(id) {
        if(confirm("do you want to delete this task?")) {
          const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
          })
          if (res.status === 200) {
            this.tasks = this.tasks.filter((task) => task.id !== id)
          } else {
            alert('Error deleting tasks')
          }
        }
      },
      toggleReminder(id) {
        for (const task of this.tasks) {
          if (task.id == id) {
            task.reminder = !task.reminder
            break
          }
        }
      },
      async addTask(task) {
        task = await this.addTaskAPI(task)
        this.tasks.push(task)
        alert(task.id)
      },
      toggleAddTask() {
        this.showAddTask = !this.showAddTask
      },
      async fetchTasks() {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        return data
      },
      async fetchAndUpdateTasks(that) {
        const tasks = await this.fetchTasks()
        that.tasks = tasks
      },
      async addTaskAPI(task) {
        const responseRaw = await fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        }) 
        const responseJson = await responseRaw.json()
        return task
      }
    },
    created() {
      this.fetchAndUpdateTasks(this)
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Poppins', sans-serif;
  }
  .container {
    max-width: 500px;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
  }
  .btn {
    display: inline-block;
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
  }
  .btn:focus {
    outline: none;
  }
  .btn:active {
    transform: scale(0.98);
  }
  .btn-block {
    display: block;
    width: 100%;
  }
</style>
