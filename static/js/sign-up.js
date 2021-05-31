const userPw1 = document.getElementById("new_userPw1");
const userPw2 = document.getElementById("new_userPw2");
const pwWrong = document.querySelector(".pwWrong");
const submit = document.querySelector(".sign_up_btn");

function init() {
    if(userPw1.value !== userPw2.value) {
        pwWrong.innerHTML = "처음 입력하신 비밀번호와 동일하게 입력해주세요.";
    } else {
        pwWrong.innerHTML = "";
    }
};


submit.addEventListener("click", function(e) {
    if(userPw1.value !== userPw2.value) {
        e.preventDefault();
        e.stopPropagation();
        alert("비밀번호를 다시 확인해주세요!");
    }
});


setInterval(init, 1000);