console.log(this); // 보통 자바스크립트에서는 윈도우 전역객체
console.log(this === module.exports);
function a(){
    console.log(this === global);  // 함수내에서는 글로벌 
    // console.log(this);
}


a();
