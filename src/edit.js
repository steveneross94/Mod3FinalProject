const editProfileBtn = document.querySelector("#edit-info")
const userInfo = document.querySelector(".user-info")

document.addEventListener("click", e => {
   if (e.target.id=== "edit-info"){
       console.log(e.target)
       let editForm = document.createElement("form")
       editForm.innerHTML = `
       <label>Profile Picture:</label>
       <input type="text" name="img" id="img_url"><br>
       <label>Username: </label>
       <input type="text" name="username" id="uname-form"><br>
       <label>Location: </label>
       <input type="text" name="location" id="location-form"><br>
       <label>About: </label>
       <input type="text"  name="about" id="about-form"><br>
       <label>Interests: </label>
       <input type="text" name="interests" id="interest-form"><br>
       <input type="submit" class="submit">
       `
       editForm.id = "edit-form"
       editForm.img.value = document.querySelector("#imgurl").src
       editForm.username.value = document.querySelector("#username").innerText
       editForm.location.value = document.querySelector("#location").innerText
       editForm.about.value = document.querySelector("#about").innerText
       editForm.interests.value = document.querySelector("#interests").innerText
        userInfo.append(editForm)
   }
})

document.addEventListener("submit", e => {
    e.preventDefault()
    console.log(e.target);
    
    if (e.target.id = "edit-form"){
        let form = e.target
        
       
        let newPic = form.img_url.value
        let newUsername = form.username.value
        let newLocation = form.location.value
        let newAbout = form.about.value
        let newInterests = form.interests.value

        let newUserInfo = {
            img_url: newPic,
            username: newUsername,
            location: newLocation,
            about: newAbout,
            interest: newInterests
        }
        let userId = document.querySelector(".user-info").id
        fetch(`http://localhost:3000/api/v1/users/${userId}`, {
            method: 'PATCH', 
                headers: {"content-type": "application/json"},
                body: JSON.stringify(newUserInfo)  
        })
        .then(r => r.json())
        .then(user => {
        
            
            
            userInfo.innerHTML = `
            <img src='${user.img_url}'>
            <h3 id="username">${user.username}</h3>
            <h6 id="location">Location: ${user.location}</h6> 
            <h6 id="about">About: ${user.about}</h6>
            <h6 id="interests">Interests: ${user.interest}</h6>
            `
        })
    } 
    
})