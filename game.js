document.addEventListener("DOMContentLoaded", main)

var boundaries
var i
var can_win = true
var score = 0
var last_boundary
var tag_added = document.createElement("p")
var lose_interval
var timer_button
var hard_difficulty = false
var username
var save_button
var users_data

function main(){
    users_data = document.cookie
    users_data = users_data.split("; ")
    console.log(users_data)
    initialise_mouseovers()
    last_boundary = boundaries[boundaries.length -1]
    last_boundary.style.textAlign = "center"
    add_button_timer()
    add_button_save()
    while (!username){
        username = prompt("Please enter your username")
    }
    identify_user()
    add_tag()
}

function initialise_mouseovers(){
    document.getElementById("start").onmouseover = start
    document.getElementById("start").onclick = restart
    document.getElementById("end").onmouseover = check_win
    document.body.onmouseover = cannot_win
    boundaries = document.getElementsByClassName("boundary")
    i = 0
    console.log(boundaries.length)
    for (i; i<boundaries.length-1; i++){
        boundaries[i].onmouseover = wrong_place
    }
}

function start(){
    console.log("right place")
    i =0
    for(i; i<boundaries.length-1; i++){
        boundaries[i].style.backgroundColor = "#eeeeee"
    }
    can_win = true
    if (hard_difficulty){
        lose_timer()
    }
}

function restart(){
    score = 0
    change_score()
}

function wrong_place(){
    i = 0 
    if (can_win){
        score -= 10
        can_win = false
        for(i; i<boundaries.length-1; i++){
            boundaries[i].style.backgroundColor = "red"
        }
        lose_content()
    }
}

function cannot_win(event){
    if (can_win && document.body == event.target){
        can_win = false
    }
}

function check_win(){
    if (can_win){
        score += 5
        can_win = false
        win_content()
    }
}

function win_content(){
    change_score()
    last_boundary.textContent = "You won"
}

function lose_content(){
    change_score()
    last_boundary.textContent = "You lost"
}

function add_tag(){
    tag_added.id = "tag_added"
    var text = document.createTextNode("Score is " + score)
    tag_added.appendChild(text)
    document.body.appendChild(tag_added)
}

function change_score(){
    tag_added.innerText = "Score is " + score
}

function lose_timer(){
    if(lose_interval){
        clearInterval(lose_interval)
    }
    lose_interval = setInterval(wrong_place, 60000)
}

function add_button_timer(){
    timer_button = document.createElement("button")
    timer_button.innerHTML = "Difficulity: Normal"
    timer_button.style.position = "absolute"
    timer_button.style.top = "500px"
    timer_button.style.left = "60%"
    timer_button.style.height = "25px"
    timer_button.style.width = "150px"
    timer_button.onclick = switch_difficulty
    document.body.appendChild(timer_button)
}

function add_button_save(){
    save_button = document.createElement("button")
    save_button.innerHTML = "Save score"
    save_button.style.position = "absolute"
    save_button.style.top = "500px"
    save_button.style.left = "25%"
    save_button.style.height = "25px"
    save_button.style.width = "100px"
    save_button.onclick = save_data
    document.body.appendChild(save_button)
}

function switch_difficulty(){
    if (hard_difficulty){
        hard_difficulty = false
        if(lose_interval){
            clearInterval(lose_interval)
        }
        timer_button.innerHTML = "Difficulty: normal"
    }else{
        hard_difficulty = true
        timer_button.innerHTML = "Difficulty: hard"
    }
}

function save_data(){
    document.cookie = username + "="+ score + "; expires= Thu, 28 Nov 2030 12:00:00; path=/"
}

function identify_user(){
    i = 0
    for (i; i<users_data.length; i++){
        if (username == users_data[i].split("=")[0]){
            score = Number(users_data[i].split("=")[1])
            break
        }
    }
}