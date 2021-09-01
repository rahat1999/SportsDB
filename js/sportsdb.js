// document.getElementById('error-msg').innerText=''
document.getElementById('spinner').style.display='none'
const loadSportsDb =async ()=>{

    const sportsSearch =document.getElementById('sports-search')
    // clear team details/ এটা লেখা হয় নাই

    const searchSportsName =sportsSearch.value ;  
    if(searchSportsName===''){
        document.getElementById('error-msg').innerText='Search field Empty'
        // return
    }
    else{
        document.getElementById('spinner').style.display='block';// spinner shows
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchSportsName}`
        const response = await fetch(url); 
        const data = await response.json(); 
        displaySportsDb(data)
       document.getElementById('spinner').style.display='none'; // spinner stop
        sportsSearch.value='';
        document.getElementById('team-details').textContent=''
    }
   
}
const displaySportsDb = data =>{
   
    const info = data.teams;
    //  console.log(data)
    const sportsContainer = document.getElementById('sports-container')
    sportsContainer.textContent=" "
    if(info==null){
        document.getElementById('error-msg').innerText='Wrong Input'
    }
    else {
        info.forEach(element => {
           
            //  console.log(element.strTeam)
            document.getElementById('error-msg').innerText=''
            // document.getElementById('error-msg').style.display='none'
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML= `
                <div onclick="loadSportsDetails('${element.idTeam}')" class="h-100 text-center bg-secondary p-3">
                        <img class='w-50 mx-auto' src="${element.strTeamBadge}" class="card-img-top" alt="Team Badge">
                    <div class="card-body">
                        <h5 class="card-title text-warning">${element.strTeam}</h5>
                        <p class="card-text text-white">${element.strLeague}</p>
                        <p class="text-danger fw-bolder ">${element.strStadium?element.strStadium:element='N/a'}</P>
                    </div>
                </div>
            `;
            sportsContainer.appendChild(div)
        });
    }
}
    /* fetch team details */
const loadSportsDetails = async teamId =>{
    const url= `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`
    // console.log(url)

    const res =await fetch(url)
    const data =await res.json()
    displayTeamDetails(data)
    
}
const displayTeamDetails = teamDetails =>{
    const teams= teamDetails.teams[0]
    const teamDiv = document.getElementById('team-details');
    teamDiv.textContent=''
    const div = document.createElement('div') 
    div.classList.add=("card")
    div.innerHTML=`
            <img src="${teams.strStadiumThumb?teams.strStadiumThumb:teams.strTeamBadge}" class="card-img-top align-items-center" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title ">Title :${teams.strTeam}</h5>
                <p class="card-text">${teams.strStadium?teams.strStadium:team='N/a'}</p>
                <p class="card-text">${teams.strDescriptionEN?.slice(0,150)?teams.strDescriptionEN.slice(0,150):team='N/a'}</p>
            </div>
            <div class="card-footer text-center">
                <a class="btn bg-primary" href="https://${teams.strYoutube}"  target="_blank">Watch Videos</a>
            </div>
    `
    teamDiv.appendChild(div)

}
