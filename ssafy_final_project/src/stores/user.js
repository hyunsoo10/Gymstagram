import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {
    const REST_USER_API = `http://localhost:8080/user-api/user`

    const users = ref([])
    const router = useRouter();

    const loginUser = ref(null)

    // const loginUser = ref({
    //     userId: "",
    //     userPassword: "",
    //     userName: "",
    //     nickName: "",
    //     profileImage:"",
    //     registerDate: "",
    //     permission: "",
    //     avtyCode: "",
    //     activate: ""
    // })

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
    // onMounted(() => {
    //     const savedUser = localStorage.getItem("loginUser");
    //     if (savedUser) {
    //         console.log(savedUser)
    //         loginUser.value = JSON.parse(savedUser);
    //     }
    // });
    
    let user = null
    onMounted (()=> {
        
        if(sessionStorage.getItem('access-token')){
            const token = sessionStorage.getItem('access-token').split('.')
            let user = token[1]
            user = decodeURIComponent(escape(atob(user)));
            user = JSON.parse(user)
            user = user["user"]
            loginUser.value = Object.assign({}, user);
            console.log(loginUser.value)
        }
    })

    //JwtLogin
    const login = (user) => {
        axios.post(`${REST_USER_API}/jwtlogin`, user)
        .then((response)=>{
        //   console.log(response.data)
        //   console.log(atob(response.data['access-token'].split('.')[1]))
          sessionStorage.setItem('access-token', response.data["access-token"])
    
          const token = response.data['access-token'].split('.')
          let user = token[1]
          // user = atob(user)
          //디코딩
          user = decodeURIComponent(escape(atob(user)));
          user = JSON.parse(user)
          user = user["user"]
          console.log(user)
          loginUser.value = Object.assign({}, user);
          console.log(loginUser.value)
          alert(loginUser.value.userName + "님 환영합니다!");
        //   localStorage.setItem('loginUser', user);
          router.push('/');
    
        })
        .catch(()=>{
    
        })
      }

    // //로그인
    // //user 객체를 인자로 받아서 DB에서 아이디 일치하는 회원 가져온 후에 비밀번호 검사
    // const login = (user) => {
    //     // user 정보 요청 api 주소
    //     // axios 요청
    //     axios.get(`${REST_USER_API}/${user.id}`)
    //         .then((res) => {
    //             console.log(user)
    //             //db에서 해당하는 id의 회원 찾아오기
    //             let dbUser = res.data;

    //             if (dbUser) {
    //                 if (user.password === dbUser.userPassword) {
    //                     user.value = dbUser;
    //                     localStorage.setItem('loginUser', JSON.stringify(dbUser));
    //                     alert(dbUser.userName + "님 환영합니다!");
    //                     axios.post(`${REST_USER_API}/login`, user.value)
    //                     loginUser.value = dbUser;
    //                     router.push('/');
    //                 } else {
    //                     alert("비밀번호가 틀렸습니다");
    //                 }
    //             } else {
    //                 alert('해당 ID와 일치하는 회원이 없습니다.');
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             alert("로그인 실패: 서버 에러");
    //         });
    // };

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
                // localStorage에 저장된 정보도 변경하기
                // const localUser = JSON.parse(localStorage.getItem('loginUser'))
                axios.get(`${REST_USER_API}/${loginUser.value.userId}`, {headers: {
                'access-token': sessionStorage.getItem('access-token')
            }})
            .then((res) => {
                //업데이트 했던 비밀번호 넘겨줘야됌
                let user =  {
                    userId: loginUser.value.userId,
                    userPassword: newPassword
                }
                console.log(user)
                axios.post(`${REST_USER_API}/jwtlogin`, user)
                .then((response)=>{
                  console.log(response.data)
                //   console.log(atob(response.data['access-token'].split('.')[1]))
                  sessionStorage.setItem('access-token', response.data["access-token"])
            
                  const token = response.data['access-token'].split('.')
                  let user = token[1]
                  // user = atob(user)
                  //디코딩
                  user = decodeURIComponent(escape(atob(user)));
                  user = JSON.parse(user)
                  user = user["user"]
                  console.log(user)
                  loginUser.value = Object.assign({}, user);
            
                })
                router.push('/');
                // loginUser.value = dbUser;
            })
            })
            .catch(() => {
                console.log("정보수정에 실패하였습니다!")
            })
    }

    //로그아웃
    const logout = () => {
        loginUser.value = null;
        sessionStorage.removeItem('access-token');
        router.push({ name: "home" });
        console.log("?")
    };

    //기존 로그아웃
    // const logout = () => {
    //     loginUser.value = null;
    //     localStorage.removeItem("loginUser");
    //     router.push({ name: "home" });
    //     console.log("?")
    // };

    // const user = ref([])
    const getUser = function (id) {
        axios.get(`${REST_USER_API}/${id}`)
            .then((res) => {
                user.value = res.data
            })
    }
    return { users, getUserList, user, getUser, login, loginUser, logout, update }
})
