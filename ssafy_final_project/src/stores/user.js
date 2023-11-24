import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {
  const REST_USER_API = `http://localhost:8080/user-api/user`

  const users = ref([])
  const router = useRouter();

  const loginUser = ref(null)

  const getUserList = function () {
    axios({
      url: REST_USER_API,
      method: 'GET',
      headers: {
        'access-token': sessionStorage.getItem('access-token')
      }
    })
      .then((res) => {
        users.value = res.data
      })
  }

  let user = null
  onMounted(() => {

    if (sessionStorage.getItem('access-token')) {
      const token = sessionStorage.getItem('access-token').split('.')
      let user = token[1]
      user = decodeURIComponent(escape(atob(user)));
      user = JSON.parse(user)
      user = user["user"]
      loginUser.value = Object.assign({}, user);
      console.log(loginUser.value)
    }
  })

  //Jwt 토큰 인증 Login
  const login = (user) => {
    axios.post(`${REST_USER_API}/jwtlogin`, user)
      .then((response) => {

        let message = response.data['message']

        if (message != "success") {
          alert(message)
        }
        else {
          sessionStorage.setItem('access-token', response.data["access-token"])

          const token = response.data['access-token'].split('.')
          let user = token[1]
          //디코딩
          user = decodeURIComponent(escape(atob(user)));
          user = JSON.parse(user)
          user = user["user"]
          loginUser.value = Object.assign({}, user);
          console.log(loginUser.value)
          // alert(loginUser.value.userName + "님 환영합니다!");

          router.push('/');
        }
      })
      .catch(() => {

      })
  }
  const refreshLogin = (user) => {
    axios.post(`${REST_USER_API}/jwtlogin`, user)
      .then((response) => {
        let message = response.data['message']

        if (message != "success") {
          alert(message)
        }
        else {
          sessionStorage.setItem('access-token', response.data["access-token"])
          const token = response.data['access-token'].split('.')
          let user = token[1]
          user = decodeURIComponent(escape(atob(user)));
          user = JSON.parse(user)
          user = user["user"]
          loginUser.value = Object.assign({}, user);
        }
      })
      .catch(() => {

      })
  }

  // 정보수정
  const update = (formData, newPassword) => {
    axios
      .put(`${REST_USER_API}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'access-token': sessionStorage.getItem('access-token')
        }
      })
      .then(() => {
        alert('정보수정에 성공하였습니다!');
        axios.get(`${REST_USER_API}/${loginUser.value.userId}`, {
          headers: {
            'access-token': sessionStorage.getItem('access-token')
          }
        })
          .then((res) => {
            //업데이트 했던 비밀번호 넘겨줘야됌
            let user = {
              userId: loginUser.value.userId,
              userPassword: newPassword
            }
            console.log(user)
            axios.post(`${REST_USER_API}/jwtlogin`, user)
              .then((response) => {
                console.log(response.data)
                sessionStorage.setItem('access-token', response.data["access-token"])

                const token = response.data['access-token'].split('.')
                let user = token[1]
                //디코딩
                user = decodeURIComponent(escape(atob(user)));
                user = JSON.parse(user)
                user = user["user"]
                console.log(user)
                loginUser.value = Object.assign({}, user);

              })
            router.push('/');
          })
      })
      .catch(() => {
        console.log("정보수정에 실패하였습니다!")
      })
  }

  //sessionStore로부터 로그아웃
  const logout = () => {
    loginUser.value = null;
    sessionStorage.removeItem('access-token');
    router.push({ name: "home" });
    console.log("?")
  };

  const getUser = function (id) {
    axios.get(`${REST_USER_API}/${id}`)
      .then((res) => {
        user.value = res.data
      })
  }
  return { users, getUserList, user, getUser, login, loginUser, logout, update, refreshLogin }
})
