document.addEventListener('DOMContentLoaded',function(){
  let button = document.getElementById('showMore')
  let content = document.getElementById("model");
  let song = document.getElementById('song')
  let play = document.querySelector('.centered')
  let post = document.getElementById('posts')
  button.addEventListener('click',function(e){
    if(content.className == "row text-center text-lg-left open"){
      content.className = "row text-center text-lg-left close";
      content.style.overflow = 'scroll'
      content.style.maxHeight = "550px"
      button.innerHTML = `Show Less <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
    <path class="play" fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
  </svg>`
    }
    else if(content.className == "row text-center text-lg-left close"){
      content.className = "row text-center text-lg-left open";
      content.style.overflow = "hidden"
      content.style.maxHeight = "350px"
      button.innerHTML = ` Show More <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
      <path fill-rule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>`
    }
  })
  const getInfo = ()=>{fetch('http://localhost:3000/api/v1/users')
  .then (resp=>resp.json())
  .then (json => json.forEach(user=>showUser(user)))}
  function showUser(user){
    console.log(user.songs)
    let getUl = document.getElementById('posts')
    user.comments.forEach(function(e) {
      let newLi = document.createElement('div')
      newLi.innerHTML = `<div data-id=${e.id} class="media text-muted pt-3">
      <img src="${user.img_url}" alt="" class="mr-2 rounded" width="32" height="32">
      <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
      <strong class="d-block text-gray-dark">@${user.username}</strong> 
         ${e.text}
      </p>
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path class = 'outer' fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path  class = 'inner' fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
      <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
    </svg>
      <small class="text-muted pull-right">${user.location}</small>
      </div>`
      getUl.append(newLi)
    })
    user.songs.forEach(function(e){
      let newDiv = document.createElement('div')
      newDiv.className = "col-lg-3 col-md-4 col-6"
      newDiv.innerHTML = `<audio loop src ='${e.file}' id="song.${e.id}"></audio>
            <img class="img-fluid img-thumbnail" src="${e.img_url}" height="500" width="500"alt="">
            <svg id=${e.id} class="centered"width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path class="playB"d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
            <svg id=${e.id+1} class="next"width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-double-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
              <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            <svg id=${e.id-1} class="prev"width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-double-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
           `
            content.append(newDiv)
    })
  }
  getInfo()
  var playIt = true
  var playItNext = true
  content.addEventListener('click', function(e){
    if(e.target.className.baseVal == "playB" ){
      let song = document.getElementById(`song.${e.target.parentNode.id}`)
    if(playIt){ 
    let play = e.target.parentNode.innerHTML =`
    <path class="pauseB" d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
  </svg>`
  song.play()
  playIt = false
  //next song click//////
    content.addEventListener('click',function(e){
      if(e.target.className.baseVal == "next"){
        song.parentElement.childNodes[4].innerHTML = `<path class="playB" d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>`
            song.pause()
        playIt=true
        let song1 = document.getElementById(`song.${e.target.id}`)
          if(playIt){
            playIt=false
            let play1 = song1.parentElement.childNodes[4].innerHTML =`
            <path class="pauseB" d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
          </svg>`
            song1.play()
          }
      }
      else if(e.target.className.baseVal == "prev"){
        song.parentElement.childNodes[4].innerHTML = `<path class="playB" d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>`
            song.pause()
        playIt=true
        let song1 = document.getElementById(`song.${e.target.id}`)
          if(playIt){
            playIt=false
            let play1 = song1.parentElement.childNodes[4].innerHTML =`
            <path class="pauseB" d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
          </svg>`
            song1.play()
          }
      }
      })
  }} else if (e.target.className.baseVal == "pauseB"){
      let song = document.getElementById(`song.${e.target.parentNode.id}`)
    song.pause()
    playIt=true
    let play = e.target.parentNode.innerHTML = `<path class="playB" d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>`}
  })
  post.addEventListener('click',function(e){
  if(e.target.className.baseVal == 'bi bi-x-circle'){
    console.log(e.target.parentNode.dataset.id)
    fetch(`http://localhost:3000/api/v1/comments/${e.target.parentNode.dataset.id}`,{
      method: 'DELETE'
    })
    e.target.parentNode.remove()
  }
  })
  })
