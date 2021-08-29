document.getElementById('error-msg').style.display='none'
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
    const info = data.teams;
    // console.log(info)
    const sportsContainer = document.getElementById('sports-container')
    sportsContainer.textContent=" "
    if(info==null){
        document.getElementById('error-msg').style.display='block'
    }
    else {
        info.forEach(element => {
            // console.log(element)
            document.getElementById('error-msg').style.display='none'
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
}

const loadSportsDetails = async teamId =>{
    const url= `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`
    // console.log(url)

    const res =await fetch(url)
    const data =await res.json()
    displaySportsData(data.teams[0])
    
}
loadSportsDetails()
const displaySportsData = data =>{
    // console.log(data)
         const sportsDiv = document.getElementById('sports-details');
         sportsDiv.textContent=' '
         const div = document.createElement('div') ;
         div.classList.add=('card')
         div.style.padding='20px'
         div.style.borderRadius='20px'
         div.style.background='lightblue'
         div.style.marginBottom='5px'
         div.innerHTML=`
            <div class='mx-auto w-25'> 
                    <img src="${data.strTeamBadge}" class="card-img-top" alt="">
            </div> 
            <div class="card-body text-center">
                    <h3 class="card-title">${data.strTeam}</h3>
                    <p class="card-text">${data.strDescriptionEN.slice(0,100)}</p>
                    <h5 class="text-danger">${data.strCountry}</h5>
                    <h5 class="text-danger">${data.strAlternate}</h5>
                <div>
                    <a href="${data.strFacebook}" class="btn btn-danger"><i class="fab fa-facebook-square"></i></a>
                    <a href="${data.strFacebook}" class="btn btn-warning"><i class="fab fa-instagram-square"></i></a>
                    <a href="${data.strFacebook}" class="btn btn-primary"><i class="fab fa-twitter-square"></i></a>
                </div>
            </div>`
     sportsDiv.appendChild(div)
}