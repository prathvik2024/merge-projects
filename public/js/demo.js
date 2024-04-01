var user = localStorage.getItem('userDetails');
if(user !== null){
    user = JSON.parse(user);
    if(user.status){
        const projectsRoutes = ["../html/todo.html", "../html/post.html",
            "../html/timezone.html", "http://localhost:8000/table", "http://localhost:8000/",
            "http://localhost:8000/combo", "http://localhost:8000/filter", "http://localhost:8000/showstudents",
            "../../HTML Projects/AwanHoster webpage/awanhoster.html",
            "../../HTML Projects/ehya webpage/ehya.html", "../../HTML Projects/HireX Webpage/hireX.html",
            "../../HTML Projects/HTML Structure Practice/structure3.html", "../../HTML Projects/Html tags/index.html",
            "../../HTML Projects/Job Application Form/job_application_form.html", "../../Javascript projects/dom Manipulation/index.html",
            "../../Javascript projects/Js Events/js events.html", "../../Javascript projects/koo koo cube/index.html",
            "../../Javascript projects/sorting algorithm/sort.html",
            "../../Javascript projects/tic tac tio/game.html"];

        const projectNames = ["1. Todo Notes Web App", "2. Json Placeholder API",
            "3. Timezon Calculator", "4. Dyanmic Grid Generator", "5. Delimiter Search on Grid",
            "6. Auto Generate Combos (select, radio, checkbox)", "7. Filter Searching on table",
            "8. Student Management", "9. Awanhost static Webpage", "10. ehya static Webpage",
            "11. Hirex static Webpage", "12. HTML Structure Practice", "13. HTML Tags Practice", "14. Job App Form"
            , "15. Dom Manipulations", "16. javascript Events", "17. Koo koo cube Game", "18. Sorting Algorithms", "19. Tic Tac Tio Game"]

        projectNames.forEach((project, i) => {
            document.getElementById((i < 8) ? "nodejs" : (i >= 8 && i <= 14) ? "html" : "javascript").insertAdjacentHTML("beforebegin", `<div class="col-6 mt-5"><div class="card bg-dark p-3">
                        <div class="d-flex align-items-center">
                            <h5 class="card-title text-white col-10 fs-4">${project}</h5>
                            <input class="btn btn-success text-white mx-1 col-2" type="button" value="View Project" onclick='viewProjects(${i})'>
                        </div>
                        <p class="card-text my-2">
                            <img class="card-img-top" src="../assets/${i + 1}.png" alt="">
                        </p>
                    </div></div>`);
        })
        window.viewProjects = (projectNo) => {
            window.open(projectsRoutes[projectNo], '_blank');
        }
    }else{
        window.location.href = "http://127.0.0.1:5500/public/html/register.html";
    }
}else{
    window.location.href = "http://127.0.0.1:5500/public/html/register.html";
}


