console.log("Hi")

document.addEventListener("DOMContentLoaded", () => {
    let userName = document.querySelector("#username")
    let location = document.querySelector("#location")
    let about = document.querySelector("#about")
    let bio = document.querySelector("#bio")
    let userInfo = document.querySelector(".user-info")


    const getUserInfo = () => {
        fetch('http://localhost:3000/api/v1/users')
        .then (resp=>resp.json())
        .then (users => {
            let user = users[0]
            renderUserInfo(user)}
        )
    }

    const renderUserInfo = (user) => {

        let getUl = document.getElementById('posts')
        document.addEventListener('submit',function(e){
        console.log(e.target.post.value)
        e.preventDefault()
        let newLi = document.createElement('div')
        newLi.innerHTML = `<div class="media text-muted pt-3">
        <img src="${user.img_url}" alt="" class="mr-2 rounded" width="32" height="32">
        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong class="d-block text-gray-dark">@${user.username}</strong>
           ${e.target.post.value}
        </p>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path class = 'outer' fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path class= 'inner' fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
    <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
  </svg>
        <small class="text-muted pull-right">${user.location}</small>
        </div>`
        getUl.append(newLi)
        
        fetch('http://localhost:3000/api/v1/comments',{
            method: 'POST',
            body: JSON.stringify({
               user_id:`${user.id}`,
               text : `${e.target.post.value}`
            }),
            headers: {'content-type':'application/json'}
        })
        e.target.reset()
        })

        userInfo.innerHTML = `
        <img src='${user.img_url}'>
        <h3 id="username">${user.username}</h3>
        <h6 id="location">Location: ${user.location}</h6> 
        <h6 id="about">About: ${user.about}</h6>
        <h6 id="interests">Interests: ${user.interest}</h6>
        `
    }

getUserInfo()
})