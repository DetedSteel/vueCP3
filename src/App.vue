<script setup>
import { ref } from 'vue'
import { usePostsStore } from './stores/posts'
import { v4 as uuid } from 'uuid'
import PostItem from './components/PostItem.vue'

const postText = ref('')

const postsStore = usePostsStore()

function addPost(e) {
  e.preventDefault()
  let post = {
    id: uuid(),
    postText: postText.value
  }
  postsStore.addPost(post)
  postText.value = ''
}
</script>

<template>
  <div class="container">
    <form class="post_form" @submit="addPost">
      <input
        class="post_input"
        required
        type="text"
        placeholder="Новый пост ..."
        :value="postText"
        @change="
          (e) => {
            postText = e.target.value
          }
        "
      />
      <input class="add_post_btn" type="submit" value="Добавить" />
    </form>
    <div>
      <post-item
        v-for="post in postsStore.posts"
        :key="post.id"
        :text="post.postText"
        :id="post.id"
      ></post-item>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post_form {
  width: 800px;
  height: 90px;
  margin-top: 30px;
  border: 2px solid #0094ff;
  border-radius: 15px;
  background-color: #fcfbfb;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  box-shadow: 0px 4px 4px 0px #00000040;
}

.post_input {
  font-size: 24px;
  padding: 11px 10px;
  border-radius: 15px;
  border: 1px solid #6e6e6e;
  outline: none;
  background-color: transparent;
  width: 560px;
}

.post_input::placeholder {
  color: black;
}

.add_post_btn {
  border-radius: 15px;
  background-color: #216cff;
  color: #fcfbfb;
  border: none;
  outline: none;
  width: 177px;
  height: 51px;
  font-size: 24px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
