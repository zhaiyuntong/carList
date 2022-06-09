var data = ['粤', '京', '泸', '津', '浙', '苏', '湘', '赣', '鄂', '豫', '晼', '陕', '甘', '宁', '云', '贵', '川', '渝', '黑', '吉'
    , '辽', '晋', '翼', '鲁', '闽', '琼', '桂', '蒙', '青', '藏', '新', '使', '无']
var keyboard = $('.keyboard')
var keyborad_big = $('.keyborad_big')
var keyboard_two = $('.keyborad_two')
var clone = $('.kelong')
data.forEach(function (item, index) {
    var clone_ = clone.clone()
    clone_.html(item)
    keyboard.append(clone_)
})
keyboard.children().eq(0).remove()

var num = $('.num')
var letter = $('.letter')
var number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
var lette = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
number.forEach(function (item) {
    $(`<div class="kelong_two">${item}</div>`).appendTo(num)
})
lette.forEach(function (item) {
    $(`<div class="kelong_two">${item}</div>`).appendTo(letter)
})



//输入框绑定点击事件
var inp = $('.inp')
inp.children().eq(0).click(function () {
    keyboard_two.hide()
    keyborad_big.show()
    keyboard.css({ zIndex: 2 })
    keyboard_two.css({ zIndex: 1 })
})

for (let i = 1; i < inp.children().length; i++) {
    inp.children().eq(i).click(function () {
        keyboard_two.show()
        keyborad_big.hide()
        keyboard.css({ zIndex: 1 })
        keyboard_two.css({ zIndex: 2 })
    })
}

function checked() {
    for (let i = 0; i < inp.children().length; i++) {
        if (inp.children().eq(i).val()) {
            inp.children().eq(i).next().focus()
        }
    }
}

//第一个键盘绑定事件
for (let i = 0; i < keyboard.children().length; i++) {
    keyboard.children().eq(i).click(function () {
        inp.children().eq(0).val(this.innerHTML)
        keyboard_two.show()
        keyborad_big.hide()
        keyboard.css({ zIndex: 1 })
        keyboard_two.css({ zIndex: 2 })
        checked()
    })
}

//第二个键盘绑定事件
var index = 1
var twochildren = keyboard_two.find('.kelong_two')
for (let i = 0; i < twochildren.length; i++) {
    twochildren.eq(i).click(function () {
        inp.children().eq(index).val(this.innerHTML)
        index++;
        checked()
    })
}

//删除
var remove = $('.remove')
var index_ = 0
remove.click(function () {
    inp.children().eq(inp.children().length-1).val().remove()
})