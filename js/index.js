let trendingNews = []

const loadNews = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then(res => res.json())
        .then(data => {
            uploadData(data)
        })
}

function newsId(newsId, newsName) {
    fetch(`https://openapi.programming-hero.com/api/news/category/${newsId }`)
        .then(res => res.json())
        .then(numOfNews =>{
            trendingNews = numOfNews.data
             showNewsLengthAndName(numOfNews, newsName)
            })
}

const uploadData = (data) => {

    let item = data.data.news_category;
    item.forEach((item) => {
        displayNewsName(item)
    })
}


function displayNewsName(singleNews) {
    const newsName = document.getElementById('news-catagory')
    newsName.innerHTML += `<a onclick="newsId('${singleNews.category_id}','${singleNews.category_name}')" class="nav-link fs-6 fw-bold" href="#">${singleNews.category_name}</a>`

}


function showNewsLengthAndName(news, name) {
    document.getElementById('item-number').innerText = news.data.length;
    document.getElementById("item-name").innerText = name
    showNewsOnDisplay(news.data)
}


function showNewsOnDisplay(news) {
    const newsCard = document.getElementById("news-cards");
    newsCard.innerHTML = ""
    news.forEach((item) => {
        const {image_url,title,details,total_view,_id} = item
        let div = document.createElement("div");
        div.classList.add('card', 'mb-3', 'w-100');
        div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
             <img src="${image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 d-flex flex-column">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.slice(0, 200)} .....</p>
                </div>
                <div class=" d-flex justify-content-between align-items-center p-3">
                    <div class="d-flex align-items-center gap-2 text-muted">
                        <img class="img-fluid rounded-circle" style="width:40px" src="${item.author.img}">
                        <div>
                        <p>${item.author.name? item.author.name:"Not Available"} <br> <small>${item.author.published_date? item.author.published_date:"Not Available" }</small></p>
                        </div>
                    </div>
                    <div>
                        <i class="fa-solid fa-eye"></i>
                        <span class="ml-2">${total_view ? total_view: "not available"}</span>
                    </div>
                    <div class="text-warning">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <div class="text-warning">
                        <i onclick="fetchDetails('${_id}')" class="fa-solid fa-arrow-right fs-4" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>
                </div>
            </div>
        </div>
        
        `

        newsCard.appendChild(div)
    })
    
}

const fetchDetails = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res=>res.json())
    .then(newsDatails=>{
        showNewsDetails(newsDatails.data[0])

    })
}
//News Modal......

function showNewsDetails(newsDetails){
    const {image_url,title,details,total_view,_id} = newsDetails;
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
     <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-12">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-12 d-flex flex-column">
                <div class="card-body">
                    <h5 class="card-title">${title}<span class="badge text-bg-warning ms-2">${newsDetails.others_info.is_trending ? "Trending" : ""}</span></h5>
                    <p class="card-text">${details}</p>
                </div>
                <div class=" d-flex justify-content-between align-items-center p-3">
                    <div class="d-flex align-items-center gap-2 text-muted">
                        <img class="img-fluid rounded-circle" style="width:40px" src="${newsDetails.author.img}">
                        <div>
                        <p>${newsDetails.author.name} <br> <small>${newsDetails.author.published_date}</small></p>
                        </div>
                    </div>
                    <div>
                        <i class="fa-solid fa-eye"></i>
                        <span class="ml-2">${total_view}</span>
                    </div>
                    <div class="text-warning">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                    </div>
                </div>
            </div>
         </div>
    </div>
    `
        
}


document.getElementById("trending").addEventListener("click",()=>{
    
    let trendingFilter = trendingNews.filter((singleData =>singleData.others_info.is_trending === true)) 
    showNewsOnDisplay(trendingFilter)
})

document.getElementById("todays-pic").addEventListener("click",()=>{
    
    let todaysFilter = trendingNews.filter((singleData=>singleData.others_info.is_todays_pick===true))
    showNewsOnDisplay(todaysFilter)
})

