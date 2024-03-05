<template>
  <div class="post">
    <p class="text">{{ text }}</p>
    <div v-if="isShowComments">
      <form
        action=""
        @submit="
          (e) => {
            e.preventDefault()
            addComment(commentText)
            commentText = ''
          }
        "
      >
        <input
          placeholder="Новый комментарий ..."
          class="comment_input"
          type="text"
          :value="commentText"
          @change="
            (e) => {
              commentText = e.target.value
            }
          "
        />
        <input class="btn blue" type="submit" value="Добавить" />
      </form>
      <div class="comment" v-for="comment in coments" :key="comment.id">
        <p class="comment_text">{{ comment.commentText }}</p>
        <button class="btn pink" @click="deleteComment(comment.id)">Удалить</button>
      </div>
    </div>
    <div class="controls">
      <div class="comments_controls">
        <button class="btn blue" @click="showComments">
          {{ isShowComments ? 'Спрятать' : 'Комментарии' }}
        </button>
        <p class="comments_count">Количество комментариев - {{ coments.length }}</p>
      </div>
      <div class="post_controls" v-if="!isShowComments">
        <button
          @click="
            () => {
              isChanging = true
            }
          "
          class="btn blue"
        >
          Изменить
        </button>
        <button class="btn pink" @click="deletePost(id)">Удалить</button>
      </div>
    </div>
  </div>
  <div v-if="isChanging" class="change_bg">
    <form
      @submit="
        (e) => {
          e.preventDefault()
          changePost(id, changedText)
          isChanging = false
        }
      "
      class="change_form"
    >
      <textarea @input="handleInput" class="textarea" :value="text"></textarea>
      <div class="change_btns">
        <input class="btn blue" type="submit" value="Подтвердить" />
        <button
          class="btn pink"
          @click="
            () => {
              isChanging = false
            }
          "
        >
          Закрыть
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { v4 as uuid } from 'uuid'
import { usePostsStore } from '@/stores/posts'

const coments = ref([])
const isShowComments = ref(false)
const isChanging = ref(false)
const commentText = ref('')
const postsStore = usePostsStore()
const deletePost = postsStore.deletePost
const changePost = postsStore.changePost
const changedText = ref('')

watchEffect(() => {
  if (isChanging.value) {
    console.log(document)
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'
  } else {
    document.body.style.overflow = 'scroll'
    document.body.style.height = '100%'
  }
})

defineProps({
  text: String,
  id: String
})

function addComment(text) {
  let comment = {
    id: uuid(),
    commentText: text
  }
  coments.value.push(comment)
}

function deleteComment(id) {
  coments.value = coments.value.filter((e) => e.id != id)
}

function showComments() {
  isShowComments.value = !isShowComments.value
}

function handleInput(e) {
  e.target.style.height = e.target.scrollHeight + 'px'
  changedText.value = e.target.value
}
</script>
<style scoped>
.change_btns {
  display: flex;
  gap: 30px;
  margin-top: 15px;
  margin-left: auto;
  width: fit-content;
}

.change_bg {
  z-index: 3;
  background-color: #6c9eff96;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
}

.textarea {
  border: 1px solid #6e6e6e;
  outline: none;
  border-radius: 15px;
  background-color: white;
  resize: none;
  padding: 9px 18px;
  width: 750px !important;
  min-height: 50px;
  overflow: hidden;
}

.change_form {
  width: 800px;
  padding: 30px 30px 20px 20px;
  border: 2px solid #0094ff;
  background-color: #fcfbfb;
  border-radius: 15px;
}

.post {
  border-radius: 15px;
  border: 1px solid #0094ff;
  width: 800px;
  padding: 16px 21px;
  box-shadow: 0px 4px 4px 0px #00000040;
  background-color: #fcfbfb;
  margin-top: 40px;
}

.text {
  font-size: 24px;
  font-weight: 400;
  width: 750px;
  border-bottom: 1px solid #9c9c9c;
  padding-bottom: 20px;
  margin-bottom: 15px;
  word-break: break-all;
  hyphens: auto;
}

.btn {
  padding: 11px 17px;
  border: none;
  outline: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 400;
  color: #fcfbfb;
}

.blue {
  background-color: #216cff;
}

.pink {
  background-color: #ff218b;
}

.controls {
  display: flex;
  justify-content: space-between;
}

.comments_controls {
  display: flex;
  gap: 23px;
  align-items: center;
}

.comments_count {
  font-size: 16px;
  font-weight: 400;
}

.post_controls {
  display: flex;
  gap: 23px;
}

.comment_input {
  border: 1px solid #6e6e6e;
  border-radius: 15px;
  padding: 11px 20px;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 30px;
  width: 610px;
  margin-right: 20px;
  outline: none;
}

.comment_input::placeholder {
  color: black;
}

.comment {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  margin-bottom: 30px;
}

.comment_text {
  padding: 11px 17px;
  border: 2px solid #0094ff;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 15px;
  width: 610px;
}
</style>
