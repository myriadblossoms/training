// 버튼0 누르면
// 모든 버튼에 붙은 orange 클래스명 제거
// 버튼0에 orange 클래스명 추가
// 모든 div에붙은 show 클래스명 제거
// div0에 show 클래스명 추가
    // let btn = document.querySelectorAll('.tab-button')
    // let content = document.querySelectorAll('.tab-content')

    // for(let i = 0 ; i< btn.length; i++){
    //     btn[i].addEventListener('click', function(){
    //         if(this.classList.contains('orange')){
    //             this.classList.remove('orange')
    //         }else{
    //             this.classList.add('orange')
    //         }
    //     })
    // }

//     let btns = document.querySelectorAll('.tab-button');
// let content = document.querySelectorAll('.tab-content');

// for (let i = 0; i < btns.length; i++) {
//     btns[i].addEventListener('click', function() {
//         // 모든 버튼과 콘텐츠에서 'orange' 및 'show' 클래스를 제거
//         for (let j = 0; j < btns.length; j++) {
//             btns[j].classList.remove('orange');
//             content[j].classList.remove('show');
//         }

//         // 클릭된 버튼과 해당하는 콘텐츠에 'orange' 및 'show' 클래스를 추가
//         btns[i].classList.add('orange');
//         content[i].classList.add('show');
//     });
// }
// let btn = $('.tab-button')
// let content = $('.tab-content')

// let car = ['소나타',50000,'white'];
// let car2 = {name:'소나타', price : 50000, clor : 'white'}
// // for(let i=0; i<btn.length; i++){
// //     btn.eq(i).on('click',function(){
// //         탭열기(i);
// //     })
// // }
// document.querySelector('.carname').innerHTML = car2.name;
// document.querySelector('.carprice').innerHTML = car2.price;
$('.list').click(function(e){
    탭열기(e.target.dataset.id)
})

function 탭열기(숫자){
    btn.removeClass('orange');
    btn.eq(숫자).addClass('orange');
    content.removeClass('show');
    content.eq(숫자).addClass('show')
}
// document.querySelector('.tab-button').addEventListener('click',function(){
//     document.querySelector('.tab-button').classList.remove('orange')
// })
$('.form-select').eq(0).on('input',function(e){
    let value =e.currentTarget.value;
    let sizeJean = [28, 30, 32]
    let sizeShirt =[95,100,105]

    if( value == '셔츠'){
        $('.form-select').eq(1).removeClass('form-hide');
    }else{
        $('.form-select').eq(1).addClass('form-hide');
    }

    if( value == '바지'){
        $('.form-select').eq(1).removeClass('form-hide');
        $('.form-select').eq(1).html('');
        sizeJean.forEach(function(){

        })
     }
     
    })

    var 출석부 = ['흥민', '영희', '철수', '재석'];

    function 이름찾기(e){
      if ( 출석부[2] == e ){
        // console.log('있어요')
      }else{
        // console.log('없어요')
      }
    }
    이름찾기('철수');

    for( k = 2; k <10; k++){
        for( i = 1; i<10; i++){
            // console.log(k * i);
        }
    }

    function 시험점수(a,b){
        var result= 0;
        for(i=0;i < a.length; i++){
            result = result + a[i]
        }
        console.log(result)
        
        if(result/a.length < b){
            console.log('점수업')
        }else{
            console.log('재수강')
        }
    }
    시험점수([2,3,4],10)