const techtabs = (id) => {
    document.getElementById('tech-title').innerText = "The Best Managed Cloud Hosting for " + id;
    document.querySelector('.tech-group-row-active').classList.remove('tech-group-row-active');
    document.getElementById(id).classList.add('tech-group-row-active');
}

const scroller = (id) =>{
    if(id == "left"){
        document.getElementById("infinite-row").scrollLeft -= 200;
    }else if(id == "right"){
        document.getElementById("infinite-row").scrollLeft += 200;
    }
}