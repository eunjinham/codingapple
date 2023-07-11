//상품 html 세팅
function tempAdd(tempData) {
    tempData.forEach((a,i) => {
        var temp = 
        `<div class="item" draggable="true" data-id="${a.id}">
            <img src="${a.photo}" class="photo">
            <h4>${a.title}</h4>
            <p>${a.brand}</p>
            <h5>가격 : ${a.price}</h5>
            <button class="btn btn-dark basket">담기</button>
        </div>`;
        $('.main').append(temp);
    });
}

let products = []; //json 초기화

//처음 상품 세팅
$.get('store.json').done(data => {
    products = data.products;   
    tempAdd(products);

    products.forEach((a,i) => {
        a.cnt = 0;
    });

    //드래그 이벤트
    $('.item').on('dragstart', function(e){
        e.originalEvent.dataTransfer.setData('id', e.target.dataset.id);
    });

    $('.beg').on('dragover', function(e) {
        e.preventDefault();
    });

    $('.beg').on('drop', function(e) {
        var begid = e.originalEvent.dataTransfer.getData('id');

        $('.beg h3').css('display','none');
        var begproducts = products.filter((a)=>{
            return a.id == begid
        });

        begproducts.forEach((a,i) => {
            var temp = 
            `<div class="item" data-id="${a.id}">
            <img src="${a.photo}" class="photo">
            <h4>${a.title}</h4>
            <p>${a.brand}</p>
            <h5>가격 : ${a.price}</h5>       
            </div>`;
            $('.beg').append(temp);
        });
    });
});

//검색 이벤트
$('#search').on('input', function(){
    let searchitem = $('#search').val();
    
    let newProducts = products.filter((a)=>{
      return a.title.includes(searchitem) || a.brand.includes(searchitem)
    });

    $('.main').html('');
    tempAdd(newProducts);

    //검색 시 제목, 브랜드 색처리
    $('.item h4').each(function(i, a){
        let title = a.innerHTML;
        title = title.replace(searchitem, `<span style="background : yellow">${searchitem}</span>`);
        a.innerHTML = title;
    });

    $('.item p').each(function(i, a){
        let brand = a.innerHTML;
        brand = brand.replace(searchitem, `<span style="background : yellow">${searchitem}</span>`);
        a.innerHTML = brand;
    });
});

