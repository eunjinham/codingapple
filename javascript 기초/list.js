var products = [
    { id : 0, price : 70000, title : 'Blossom Dress' },
    { id : 1, price : 50000, title : 'Springfield Shirt' },
    { id : 2, price : 60000, title : 'Black Monastery' }
  ];

for(let i=0; i<products.length; i++) {
    // document.querySelectorAll('.card-body h5')[i].innerHTML = products[i].title;
    // document.querySelectorAll('.card-body p')[i].innerHTML = '가격 : ' + products[i].price;
    $('.card-body h5').eq(i).html(products[i].title);
    $('.card-body p').eq(i).html(`가격 : ${products[i].price}`);
}

$.get('https://codingapple1.github.io/hello.txt').done(function(data){
  console.log(data);
}).fail(function(){
  console.log('실패');
});

fetch('https://codingapple1.github.io/price.json')
.then(res => res.json())
.then(data => {
  console.log(data.price);
}).catch(error => {
  console.log('실패');
});
