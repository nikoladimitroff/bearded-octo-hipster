var BindCircularMenu = function (button, wrapper){

    //open and close menu when the button is clicked
    var open = false;
    button.addEventListener('click', handler, false);

    function handler(){
      if(!open){
        this.textContent = "Close";
        addRadialTransforms(document.querySelector(".cn-wrapper ul"));
        wrapper.classList.add('opened-circular-nav');
      }
      else{
        this.textContent = "Menu";
        wrapper.classList.remove('opened-circular-nav');
        removeRadialTransforms(document.querySelector(".cn-wrapper ul"));
      }
      open = !open;
    }
    function closeWrapper(){
        wrapper.classList.remove('opened-circular-nav');
    }

function addRadialTransforms(menu) {
    var children = menu.children;
    var n = children.length;
    var angularSize = 2 * 180 / n;
    var skew = 90 - angularSize;
    for (var i = 0; i < children.length; i++) {
        var angle = 90 - angularSize / 2 + i * angularSize;
        var unrotationAngle = -(90 - angularSize / 2);
        var transform = "rotate(" + angle + "deg) skew(" + skew + "deg)";
        var inverseTransfom =  "skew(" + (-skew) + "deg) " +
                               "rotate(" + unrotationAngle + "deg) " +
                               "scale(1)";
        var unrotateText = "rotate(" + (-unrotationAngle - angle) + "deg)";
        children[i].style.transform = transform;
        children[i].querySelector("a").style.transform = inverseTransfom;
        children[i].querySelector("span").style.transform = unrotateText;
    }
}
function removeRadialTransforms(menu) {
    var children = menu.children;
    var n = children.length;
    for (var i = 0; i < children.length; i++) {
    
        children[i].style.transform = "";
    }
}
};
