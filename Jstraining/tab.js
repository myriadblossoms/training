// 버튼0 누르면
// 모든 버튼에 붙은 orange 클래스명 제거
// 버튼0에 orange 클래스명 추가
// 모든 div에붙은 show 클래스명 제거
// div0에 show 클래스명 추가
let btn = $('.tab-button')
let content = $('.tab-content')

for(let i=0; i<btn.length; i++){
    btn.eq(i).on('click',function(){
        btn.removeClass('orange');
        btn.eq(i).addClass('orange');
        content.removeClass('show');
        content.eq(i).addClass('show')
    })
}

// document.querySelector('.tab-button').addEventListener('click',function(){
//     document.querySelector('.tab-button').classList.remove('orange')
// })