
function refreshMe(){
    window.location.href = "http://localhost:3000"
}
var url = "http://localhost:3000"
function createRecord(){
    var req = {
        'mode':'create',
        name: document.querySelector("#name").value,
        age: document.querySelector("#age").value
    }
    console.log(req);
    console.log(JSON.stringify(req));
    fetch(url,{
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(req)
    })
}
function updateRecord(){

}
function deleteRecord(id){
    fetch(url + '/api',{
        method: "delete",
        body: JSON.stringify({
            'id': id
        })
    })
}