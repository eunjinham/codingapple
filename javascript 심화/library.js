var a = 10;
var b = 20;
var c = 30;
export default a;
export {b,c};
//default로 적으면 import할 때 이름 바꿔도 됨
//export daefault는 1번만 가능
//또는 export var a = 10; 이런식으로 변수 선언할때 export도 가능