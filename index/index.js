var global_data = null;
var global_page_number = 1;
var global_park_state = 0;

var tab = new Switch_Tab()
$('.stop_car').append(tab.element)

template.defaults.imports.dateFormat = function (date, format) {
    var time = new Date(date)
    let n = time.getFullYear()
    let y = time.getMonth()
    if (y < 10) {
        y = "0" + y
    }
    let r = time.getDate()
    if (r < 10) {
        r = "0" + r
    }
    let s = time.getHours()
    if (s < 10) {
        s = "0" + s
    }
    let f = time.getMinutes()
    if (f < 10) {
        f = "0" + f
    }
    let m = time.getSeconds()
    if (m < 10) {
        m = "0" + m
    }
    return n + '-' + y + '-' + r + ' ' + s + ':' + f + ':' + m
}


$(function () {
    var page = $("#navigation");
    var last_li = $("#navigation_ul").children().last();
    // 处理所有事件
    bingAllEvents();
    $("#enter").click(function () {
        // 1. 拿ID
        var id = put.find("#username")[0].dataset.id
        var name = put.find("#username").val()
        var home_number = put.find("#home_number").val()
        var phone_number = put.find("#phone_number").val()
        var park_lot = put.find("#park_lot").val()
        var park_state = tab.state;
        $.ajax({
            type: 'PUT',
            url: "http://1.14.68.137:8000/api/v0/owner/" + id + "/",
            data: {
                name,
                home_number,
                phone_number,
                park_lot,
                park_state: Number(park_state)
            },
            success() {
                rerenderOwnerTemplate(global_page_number)
                put.hide();
            }
        })
    })

    

    $.get('http://1.14.68.137:8000/api/v0/owner/', function (res) {
        // 渲染数据
        renderOwnerTemplate(res.results);

        var count = res.count;

        if (count < 10) {
            page.hide();
        } else {
            page.show();
            var page_number = Math.ceil(count / 10);

            for (var i = 0; i < page_number; i++) {
                if (i == 0) {
                    var li = $("<li>").addClass("active");
                } else {
                    var li = $("<li>");
                }
                $("<a>").attr("href", "javascript:;").text(i + 1).appendTo(li);
                last_li.before(li);

                li.click(function () {
                    $(this).addClass("active")
                    $(this).siblings().removeClass();

                    var page_number = +$(this).text();
                    global_page_number = page_number;
                    rerenderOwnerTemplate(page_number);
                })


            }
        }
    })
})
var put_add = $('.put_add')
var put = $("#put")
var more_car = $('.more_car')
$('#cancel').click(function () {
    put.hide();
})
$('#cancel_two').click(function () {
    put_add.hide();
})
$('#more_cancel').click(function () {
    more_car.hide()
})

function renderOwnerTemplate(data) {
    global_data = data;
    var renderHTML = template('tpl-owner', data)
    $("tbody").html(renderHTML);
}

function rerenderOwnerTemplate(page_number) {
    var url = 'http://1.14.68.137:8000/api/v0/owner/';
    if (page_number) url += "?page=" + page_number;
    $.get(url, function (res) {
        renderOwnerTemplate(res.results);
    })
}

function bingAllEvents() {
    $("tbody").click(function (e) {
        if ($(e.target).hasClass("btn-danger")) {
            var index = +e.target.dataset.index;
            var id = global_data[index].id;
            deleteOwner(id, function () {
                if (confirm('确定要删除吗？') == true) {
                    alert("删除成功");
                    rerenderOwnerTemplate(global_page_number);
                } else {
                    alert('删除失败')
                }
            });
        }

        if ($(e.target).hasClass('niubi')) {
            var index = +e.target.dataset.index;
            var one_owner = global_data[index];

            put.find("#username")[0].dataset.id = one_owner.id;
            put.find("#username").val(one_owner.name)
            put.find("#home_number").val(one_owner.home_number)
            put.find("#phone_number").val(one_owner.phone_number)
            put.find("#park_lot").val(one_owner.park_lot)

            global_park_state = one_owner.park_state

            // console.log(put.find("#username")[0].dataset.id)

            if (one_owner.park_state == 0) {
                tab.state = false;
                tab.close()
            } else {
                tab.state = true;
                tab.open()
            }

            put.show();
        }

        //更多操作
        if ($(e.target).hasClass('more_operation')) {
            more_car.show()
            var index = +e.target.dataset.index;
            var one_owner = global_data[index];

            more_car.find(".more_name")[0].dataset.id = one_owner.id;
            more_car.find(".more_name").text(one_owner.name)
            more_car.find(".more_home").text(one_owner.home_number)
            more_car.find(".more_number").text(one_owner.phone_number)
            more_car.find(".more_lot").text(one_owner.park_lot)

            var inp = $('.inp').children()

            $('#more_enter').click(function () {
                console.log(one_owner.id)
                var str = ''
                for (let i = 0; i < inp.length; i++) {
                    str += inp.eq(i).val()
                }
                $.ajax({
                    type: 'POST',
                    url: 'http://1.14.68.137:8000/api/v0/license/',
                    data: {
                        license: str,
                        owner: one_owner.id,
                    },
                    success(res) {
                        alert('车牌添加成功')
                        for (let i = 0; i < inp.length; i++) {
                            inp.eq(i).val('')
                        }
                        rerenderOwnerTemplate(global_page_number);
                    }
                })
                more_car.hide()
                
            })
        }
    })

    //添加用户
    $('.add_owner').click(function () {
        put_add.show();
        $('#add_enter').click(function () {
            var data = {
                name: $(".username").val(),
                home_number: $(".home_number").val(),
                phone_number: $(".phone_number").val(),
                park_lot: $(".park_lot").val(),
                park_state: global_park_state,
            }
            addOwner(data)
            put.find("#username").val('')
            put.find("#home_number").val('')
            put.find("#phone_number").val('')
            put.find("#park_lot").val('')

            put_add.hide()

            rerenderOwnerTemplate(global_page_number);

        })
    })
}

function deleteOwner(id, success) {
    $.ajax({
        type: "DELETE",
        url: "http://1.14.68.137:8000/api/v0/owner/" + id,
        success: success
    })
}

function addOwner(res) {
    $.ajax({
        type: 'POST',
        url: 'http://1.14.68.137:8000/api/v0/owner/',
        data: res,
        success(res) {
            alert('添加成功')
        }
    })
}

