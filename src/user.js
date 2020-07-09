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
        userInfo.id = `${user.id}`
        let getUl = document.getElementById('posts')
        document.addEventListener('submit',function(e){
        // console.log(e.target.post.value)
        e.preventDefault()
        let newLi = document.createElement('div')
        newLi.innerHTML = `<div class="media text-muted pt-3">
        <img src="${user.img_url}" alt="" class="mr-2 rounded" width="32" height="32">
        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong class="d-block text-gray-dark">@${user.username}</strong>
           ${e.target.post.value}
        </p>
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
        
        <img id="imgurl" name='${user.img_url}'src='${user.img_url}'>
        <div class='user-traits'>
            <h3 id="username">${user.username}</h3>
            <h6 id="location">Location: ${user.location}</h6> 
            <h6 id="about">About: ${user.about}</h6>
            <h6 id="interests">Interests: ${user.interest}</h6>
        </div>
        `
    }

getUserInfo()
})