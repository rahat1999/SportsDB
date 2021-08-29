const loadSportsDb =async ()=>{

    const sportsSearch =document.getElementById('sports-search')
    const searchSportsName =sportsSearch.value //.toUpperCase()
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchSportsName}`
    try{
        const response = await fetch(url); 
        const data = await response.json(); 
        displaySportsDb(data)
    }
    catch (error){
        console.log(error)
    }
    sportsSearch.value=' ';
}
const displaySportsDb = data =>{
    console.log(data)
    const info = data.teams;
    const sportsContainer = document.getElementById('sports-container')
    sportsContainer.textContent=""
    info.forEach(element => {
        // console.log(element)
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML= `
        <div onclick="loadSportsDetails('${element.idTeam}')" class="card h-100 text-center bg-secondary p-3">
        <img class='w-50 mx-auto' src="${element.strTeamBadge}" class="card-img-top" alt="Team Badge">
        <div class="card-body">
          <h5 class="card-title text-warning">${element.strTeam}</h5>
          <p class="card-text text-white">${element.strDescriptionEN.slice(0,150)}</p>
          <p class="text-danger fw-bolder ">${element.strCountry}</P>
        </div>
      </div>
        `;
        sportsContainer.appendChild(div)
    });
}

const loadSportsDetails = teamId =>{
    //  console.log(teamId)
    const url= `https://www.thesportsdb.com/api/v1/json/{APIKEY}/searchteams.php?sname=${teamId}`
    //  console.log(url)
     fetch(url)
     .then(res=>res.json())
     .then(data=>console.log(data))
} 
loadSportsDetails()