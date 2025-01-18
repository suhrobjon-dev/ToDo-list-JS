const API = "http://localhost:3000/data";
let root = document.querySelector(".root");
const modal = document.querySelector("#myModal");
const span = document.querySelector(".close");
const btn = document.querySelector("#myBtn");
let save = document.querySelector("#save");
let cancel = document.querySelector("#cancel");
let main = document.querySelector(".main")
let inpAdd1 = document.querySelector("#inpAdd1");
let inpAdd2 = document.querySelector("#inpAdd2");
let modalEdit = document.querySelector(".modal_edit");
let inpEdit1 = document.querySelector(".inpEdit1");
let inpEdit2 = document.querySelector(".inpEdit2");
let edit = document.querySelector(".edit");
let cancelEdit = document.querySelector(".cancel")



// async getData //
async function getData() {
    try {
        let { data } = await axios.get(API)
        get(data)
    } catch (error) {
        console.log(error);
    }
}



// async deletFunc //
async function deletFunc(id) {
    try {
        let { data } = await axios.delete(`${API}/${id}`)
        get(data)
    } catch (error) {
        console.log(error);
    }
}



// async addFunc //
async function addTodo(user){
    try {
        let {data} = await axios.post(API , user)
        get(data)
    } catch (error) {
        console.log(error);
    }
}



function add(data) {
    let user = {
        id: new Date().getDate() + "",
        title: inpAdd1.value,
        desc: inpAdd2.value,
        complete: false
    }
    addTodo(user)
    getData(data)
    modal.style.display = "none"
    inpAdd1.value = ""
    inpAdd2.value = ""
}
save.onclick = add
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
cancel.onclick = () => {
    modal.style.display = "none"
}



// async Edit //
async function editFunc(id, user2){
    try {
        let {data} = await axios.put(`${API}/${id}`, user2)
        get(data)
    } catch (error) {
        console.log(error);
    }
}
cancelEdit.onclick = () => {
    modalEdit.style.display = "none"
}



// func get //
function get(data) { 
    data.forEach((e) => {
        let firstName = document.createElement("h1");
        firstName.innerHTML = e.title;
        firstName.style.fontSize = "24px"
        firstName.style.fontWeight = "bold"
        let secondDesc = document.createElement("p");
        secondDesc.innerHTML = e.desc;
        secondDesc.style.marginTop = "10px"
        let btnDelet = document.createElement("img");
        btnDelet.src = "./img/DeleteFilled.png"
        btnDelet.style.cursor = "pointer"
        btnDelet.style.width = "30px"
        btnDelet.style.marginRight = "10px"
        btnDelet.onclick = () => {
            deletFunc(e.id)
        }
        let btnEdit = document.createElement("img");
        btnEdit.src = "./img/EditFilled.png"
        btnEdit.style.cursor = "pointer"
        btnEdit.style.width = "30px"
        btnEdit.onclick = () => {
            modalEdit.style.display = "block"
            inpEdit1.value = e.title
            inpEdit2.value = e.desc
            edit.onclick=()=>{
                let user2={
                    title: inpEdit1.value,
                    desc: inpEdit2.value
                }
                editFunc(e.id, user2)
                modalEdit.close()
            }
        }
        let span = document.createElement("p");
        span.innerHTML = "done"
        span.style.fontWeight = "bold"
        span.style.fontSize = "18px"
        let div1 = document.createElement("div");
        div1.classList.add("div1");
        let div2 = document.createElement("div");
        div2.classList.add("div2");
        let div3 = document.createElement("div");
        div3.classList.add("div3");
        let div4 = document.createElement("div");
        div4.classList.add("div4");
        div1.appendChild(firstName);
        div1.appendChild(secondDesc);
        div3.appendChild(btnDelet);
        div3.appendChild(btnEdit);
        div4.appendChild(span);
        div2.appendChild(div3);
        div2.appendChild(div4);
        div1.appendChild(div2);
        root.appendChild(div1);
    });
}
getData()