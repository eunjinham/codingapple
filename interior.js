//상품 html 세팅
function tempAdd(tempData) {
    tempData.forEach((a,i) => {
        var temp = 
        `<div class="item" draggable="true" data-id="${a.id}">
            <img src="${a.photo}" class="photo" draggable="false">
            <h4>${a.title}</h4>
            <p>${a.brand}</p>
            <h5>가격 : ${a.price}</h5>
            <button class="btn btn-dark basket" data-beg="${a.id}">담기</button>
        </div>`;
        $('.main').append(temp);
    });
}

//장바구니 html 세팅
function begAdd(tempData) {
    var total = 0;
    tempData.forEach((a,i) => {
        var temp = 
        `<div class="begitem" data-id="${a.id}">
        <img src="${a.photo}" class="photo">
        <h4>${a.title}</h4>
        <p>${a.brand}</p>
        <h5>가격 : ${a.price}</h5>  
        <h5>${a.cnt}개</h5>      
        </div>`;
        $('.beg').append(temp);     
        
        total += a.price * a.cnt;
        $('.final h6').html(`합계 : ${total}`); 
    });
}

let products = []; //json 초기화
let begproducts = [];

//처음 상품 세팅
$.get('store.json').done(data => {
    products = data.products;   
    tempAdd(products);

    //배열에 cnt 세팅
    products.forEach((a,i) => {
        a.cnt = 1;
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
        
        var begproduct = products.filter((a)=>{
            return a.id == begid
        });

        //동일한 물건이 장바구니에 있는지 확인
        var dupindex = begproducts.findIndex((i)=> i.id == begid);

        if(dupindex >= 0) {            
            begproducts[dupindex].cnt += 1; //있을 경우 카운트 증가
        } else {
            begproducts.push(begproduct[0]); //없을 경우 장바구니 추가
        }

        $('.beg').html(''); //장바구니 초기화
        begAdd(begproducts); //장바구니 추가        
    });

    $('.basket').click(function(e) {        
        var begid = e.target.dataset.beg;
        $('.beg h3').css('display','none');       
        
        var begproduct = products.filter((a)=>{
            return a.id == begid
        });

        //동일한 물건이 장바구니에 있는지 확인
        var dupindex = begproducts.findIndex((i)=> i.id == begid);

        if(dupindex >= 0) {            
            begproducts[dupindex].cnt += 1; //있을 경우 카운트 증가
        } else {
            begproducts.push(begproduct[0]); //없을 경우 장바구니 추가
        }

        $('.beg').html(''); //장바구니 초기화
        begAdd(begproducts); //장바구니 추가   
    });

    var canvas = document.getElementById('canvas'); 
    var c = canvas.getContext('2d');
    c.font = '15px dotum';
    var date = new Date();

    var ycnt = 20;

    c.fillText(`주문일 : ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, 10, ycnt);
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

let nameval = '';
let phonenumber = '';

$('#name').on('input', function(){
    nameval = $('#name').val();
});

$('#phone').on('input', function(){
    phonenumber = $('#phone').val();
});

