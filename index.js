let count = 0;
let val = 'https://crudcrud.com/api/c176718c3a8f4345be5817083287c782/Movie_ticket/'
function handleAdd(event)
{
    event.preventDefault();
    count++;
    const details = {
        name : event.target.name.value,
        seat : event.target.seat.value,
        count : count
    }
    
    
    var already = true;
    axios.get(val)
    .then(res=>{
        for (let i = 0; i <res.data.length; i++) {
            if (res.data[i].seat==details.seat)
            {
                already = false;
                window.alert('Already booked kindly select any other seats');
                break;
            }
        }
        if (already)
        {
            showBookingDetails(details);
            axios.post(val,details)
                .then(console.log('added'))
                .catch(err=>console.log(err))
        }
    });
    document.getElementById('header').innerHTML='';
    document.getElementById('name').value=''
    document.getElementById('seat').value=0
    if (count>5) window.alert('House Full');
}
function showBookingDetails(details)
{
    const newlist = document.createElement('li');
    newlist.id = details.seat;
    newlist.innerHTML = details.name+'-'+details.seat;
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    const delBtn = document.createElement("button");
    delBtn.appendChild(document.createTextNode("Delete"));
    newlist.appendChild(editBtn);
    newlist.appendChild(delBtn);
    const listmain = document.getElementById('list');
    listmain.appendChild(newlist);
    document.getElementById("clicks").innerHTML = count;
    editBtn.addEventListener('click',function(event){      
        document.getElementById('name').value=details.name;
        document.getElementById('seat').value=details.seat; 
        listmain.removeChild(event.target.parentElement);
        count = count-1;
        document.getElementById("clicks").innerHTML = count;
        if (!count) document.getElementById('header').innerHTML='Not found';
        axios.get(val)
        .then(res=>{
            for (let i = 0; i <res.data.length; i++) {
                if (res.data[i].name==details.name)
                {
                    val+=res.data[i]._id;
                    axios.delete(val).then(console.log('deleted'))
                    val = 'https://crudcrud.com/api/c176718c3a8f4345be5817083287c782/Movie_ticket/'
                }
            }
        });
       
    })
    delBtn.addEventListener('click',function(event){
        listmain.removeChild(event.target.parentElement);
        count = count-1;
        document.getElementById("clicks").innerHTML = count;
        if (!count) document.getElementById('header').innerHTML='Not found';
        axios.get(val)
        .then(res=>{
            for (let i = 0; i <res.data.length; i++) {
                if (res.data[i].name==details.name)
                {
                    val+=res.data[i]._id;
                    axios.delete(val).then(console.log('deleted'))
                    val = 'https://crudcrud.com/api/c176718c3a8f4345be5817083287c782/Movie_ticket/'
                }
            }
        })
        
        
    })
    const searchtab = document.getElementById('search');
        searchtab.addEventListener("keyup",(event)=>{
            if (document.getElementById(event.target.value))
            {
                let listof = document.getElementById(event.target.value)
                listof.classList.add("toggle");
                document.getElementById('list').classList.add("hide");
            }
            else if (!event.target.value)
            {
                document.getElementById('list').classList.remove("hide");
                if ( document.getElementsByClassName('toggle')[0]) document.getElementsByClassName('toggle')[0].classList.remove('toggle');
            }
        })
}
document.addEventListener("DOMContentLoaded", function(){
    axios.get(val)
        .then(res=>{
            if (res.data.length==0) document.getElementById('header').innerHTML='Not found';
            for (let i = 0; i <res.data.length; i++) {
                const newli = {
                    name : res.data[i].name,
                    seat : res.data[i].seat,
                    count : count++
                }
                showBookingDetails(newli);
            }
        })

});
