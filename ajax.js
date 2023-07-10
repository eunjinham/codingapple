var products = [
    { id : 0, price : 70000, title : 'Blossom Dress' },
    { id : 1, price : 50000, title : 'Springfield Shirt' },
    { id : 2, price : 60000, title : 'Black Monastery' }
];

function 템플릿추가(tempData) {
    tempData.forEach((a, i)=>{
        var 템플릿 = 
        `<div class="col-sm-4">
          <img src="https://via.placeholder.com/600" class="w-100">
          <h5>${a.title}</h5>
          <p>가격 : ${a.price}</p>
          <button class="buy">구매</button>
        </div>`;
        $('.row').append(템플릿)
    });
}

/*localStorage.setItem('num',[1,2,3]); //배열로 저장시 배열로 저장 안됨. string 저장
var arr = [1,2,3];
var newArr = JSON.stringify(arr);
localStorage.setItem('newnum',newArr); //json으로 감싸면 배열형식으로 저장
                                       //하지만 배열은 아님

console.log(JSON.parse(localStorage.getItem('newnum'))[0]);   
//json 파싱으로 배열로 인식하게 만듬!                                    

//console.log(localStorage.getItem('이름'));
//localStorage.removeItem('이름'); */

템플릿추가(products);

var cnt = 0;

$('#more').on('click', function(){
    cnt++;

    if(cnt == 1) {
        $.get('https://codingapple1.github.io/js/more1.json').done((data) => {
        템플릿추가(data);
        });
    } else if(cnt == 2) {
        $.get('https://codingapple1.github.io/js/more2.json').done((data) => {
        템플릿추가(data);
        });
        $('#more').css('display','none');
    }  
});

$('#price').click(function(){
    products.sort(function(a,b){
        return a.price - b.price 
    });
    $('.row').html('');
    템플릿추가(products);
});

$('#korSort').click(function(){
    products.sort(function(a,b){
        if(b.title<a.title) return -1;
    });
    $('.row').html('');
    템플릿추가(products);
});

$('#priceFilter').click(function(){
    var reproducts = products.filter(function(a){
        return a.price <= 60000
    });
    $('.row').html('');
    템플릿추가(reproducts);
});

/*var 어레이 = [7, 3, 5, 2, 40];
var 어레이2 = ['a','c','b'];

어레이.sort(function(a,b){
    return a - b //오름차순
    //return b - a //내림차순
}); 

console.log(어레이);

var 새어레이 = 어레이.filter(function(a){
    return a < 4
});

console.log(새어레이);

var 맵어레이 = 어레이.map(function(a){
    return a * 4
});

console.log(맵어레이);

어레이2.sort(function(a,b){
    if(b<a) return -1;
});

console.log(어레이2); */

$('.buy').click(function(){   
    var sibling =  {name : $(this).siblings('h5').html(), count : 0};

    if(localStorage.getItem('cart') == null){
        localStorage.setItem('cart',JSON.stringify([sibling]));
    } else {
        var presibling = JSON.parse(localStorage.cart);

        console.log(presibling[0].name);
        console.log(sibling.name);

        var cnt = presibling.findIndex((i)=> i.name ==sibling.name);
        if(cnt >= 0) {
            presibling[cnt].count += 1;
            localStorage.setItem('cart',JSON.stringify(presibling));
        } else {
            presibling.push(sibling);
            localStorage.setItem('cart',JSON.stringify(presibling));
        }             
    }
});

