// var len = $('.tab-button').length;

// for(let i=0; i<len; i++){
//     $('.tab-button').eq(i).on('click', function(){
//        tabOpen(i);
//     });
// }

$('.list').click(function(e){
     tabOpen(e.target.dataset.id);
});

function tabOpen(i) {
    $('.tab-button').removeClass('orange');
    $('.tab-button').eq(i).addClass('orange');
    $('.tab-content').removeClass('show');
    $('.tab-content').eq(i).addClass('show');
}

var pants = [28, 30, 32, 34];

$('.form-select').eq(0).on('input',function(e){
    var value = e.currentTarget.value;

    if(value == '셔츠') {
        $('.form-select').eq(1).removeClass('shirt');
        $('.form-select').eq(1).empty();
        $('.form-select').eq(1).append(`<Option>95</Option>
                                        <Option>100</Option>`);
    } else if(value == '바지') {
        $('.form-select').eq(1).removeClass('shirt');
        $('.form-select').eq(1).empty();
        pants.forEach((a) => {
            $('.form-select').eq(1).append(`<option>${a}</option>`);
        });
    } else if(value == '모자') {
        $('.form-select').eq(1).addClass('shirt');
    }
});

var obj = {name : 'kim', age : 20};

for(var key in obj) {
    console.log(obj[key]);
}

var 템플릿 = '<p>안녕</p>';
document.querySelector('#test').insertAdjacentHTML('beforeend',템플릿);
$('#test').append(템플릿);
