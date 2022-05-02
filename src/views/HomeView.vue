<template>
  <div>
    <div v-show="showAddTask">
    <AddTask v-show="showAddTask" @add-task="addTask"  />
    </div>
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" :key="tasks"/>
  </div>
</template>

<script>
 import Tasks from '../components/Tasks'
  import AddTask from '../components/AddTask'
export default {
  name: 'Home',
  props: {
    showAddTask: Boolean
  },
  components: {
    Tasks,
    AddTask 
  },
  data() {
    return {
      tasks: [],
      // showAddTask: false
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
            alert('Error deleting task')
          }
        }
      },
      async toggleReminder(id) {
        const task = await this.fetchTask(id)
        task.reminder = !task.reminder

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task)
        })
        const data = await res.json()

        // update for local effects
        for (const localTask of this.tasks) {
          if (localTask.id == id) {
            localTask.reminder = data.reminder
            break
          }
        }
      },
      async addTask(task) {
        task = await this.addTaskAPI(task)
        // this.tasks.push(task)
        this.fetchAndUpdateTasks(this)
      },
      async fetchTasks() {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        return data
      },
      async fetchTask(id) {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
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