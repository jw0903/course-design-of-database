
window.onload = function() {
    let list = document.getElementById('list');
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');
    function animate(offset){
        let newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        if(newLeft <= -3000){
            list.style.left = 0 + 'px';
        }
        if(newLeft >= 0){
            list.style.left = -2400 + 'px';
        }
    }


    let timer;
    var go = function() {
        timer = setInterval(function(){
            next.onclick()
        },2000);
    }
    go();

    let con = document.getElementById('con');
    function stop(){
        clearInterval(timer);
    }
    con.onmouseover = stop;
    con.onmouseout = go;

    let buttons = document.getElementById('buttons').getElementsByTagName('span');
    let index = 1;

    prev.onclick = function(){
        index -= 1;
        if(index < 1) {
            index = 5;
        }
        buttonsShow();
        animate(600);
    }
    next.onclick = function(){
        index += 1;
        if(index > 5){
            index =1;
        }
        buttonsShow();
        animate(-600);
    }

    function buttonsShow(){
        for(let i = 0;i < buttons.length; i++){
            if(buttons[i].className == 'on'){
                buttons[i].className = '';
            }
            buttons[index - 1].className = 'on';
        }
    }
    for(let i = 0; i < buttons.length; i++){
        buttons[i].onclick = function(){
          index = parseInt(this.getAttribute('index'));
          let newLeft = (index-1) * (-600);
          anni(newLeft);
          buttonsShow();
        }
    }
    function anni(newLeft){
      list.style.left = newLeft + 'px';
      if(list.style.left <= -3000){
        list.style.left = 0 + 'px';
      }
      if(list.style.left > 0){
        list.style.left = -2400 + 'px';
      }
    }
}