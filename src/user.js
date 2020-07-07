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