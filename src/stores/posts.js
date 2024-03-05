import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  function addPost(post) {
    posts.value.push(post)
  }

  function deletePost(id) {
    posts.value = posts.value.filter((e) => e.id != id)
  }

  function changePost(id, text) {
    posts.value.map((e) => {
      if (e.id == id) {
        e.postText = text
      }
      return e
    })
  }

  return { posts, addPost, deletePost, changePost }
})
