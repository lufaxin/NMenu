function nmenu() {}

nmenu.container;

nmenu.showNmenu = function() {
    if (!nmenu.container) {
        nmenu_createMenu();
        document.getElementsByTagName("body")[0].appendChild(nmenu.container);
    }
};

nmenu.hideNmenu = function() {
    if (nmenu.container) {
        document.getElementsByTagName("body")[0].removeChild(nmenu.container);
        nmenu.container = null;
    }
};

nmenu.openNmenu = function() {
    var nmenu = document.getElementById('nmenu');
    var cont = document.getElementById('memu_container');
    if ($(cont).hasClass("none")) {
        $(nmenu).removeClass("hide");
        $(nmenu).addClass("show");
        $(cont).removeClass("none");
        $(cont).addClass("block");
    }
};

nmenu.closeNmenu = function() {
    var nmenu = document.getElementById('nmenu');
    var cont = document.getElementById('memu_container');
    if (!$(cont).hasClass("none")) {
        $(nmenu).removeClass("show");
        $(cont).removeClass("block");
        $(nmenu).addClass("hide");
        setTimeout(nmenu_disshowMenu, 480);
    }
};




function nmenu_disshowMenu() {
    var cont = document.getElementById('memu_container')
    $(cont).addClass("none");
    $(cont).removeClass("hide");
}

function main_button_click() {
    try {
        var nmenu = document.getElementById('nmenu');
        var cont = document.getElementById('memu_container');
        if ($(cont).hasClass("none")) {
            $(nmenu).removeClass("hide");
            $(nmenu).addClass("show");
            $(cont).removeClass("none");
            $(cont).addClass("block");
        } else {
            $(nmenu).removeClass("show");
            $(cont).removeClass("block");
            $(nmenu).addClass("hide");
            setTimeout(nmenu_disshowMenu, 480);
        }
    } catch (e) {
        alert(e);
    }
}

function nmenu_createMenu() {
    //容器
    var container = nmenu_createElement('div', 'nmenu', 'nmenu');
    //按钮
    var main_button = nmenu_createElement('div', 'main_button', 'main_button');
    //为按钮绑定事件
    nmenu_bindEvent(main_button, 'click', main_button_click);
    //将按钮添加到容器中
    container.appendChild(main_button);
    //菜单项容器
    var memu_container = nmenu_createElement('div', 'memu_container none', 'memu_container');
    //背景遮罩
    var nmenu_back = nmenu_createElement('div', 'back', 'nmenu_back');
    //为遮罩绑定事件
    nmenu_bindEvent(nmenu_back, 'click', main_button_click);
    //将背景遮罩添加到菜单项容器中
    memu_container.appendChild(nmenu_back);
    //菜单项内容
    var nmenu_inner = nmenu_createElement('div', 'inner', 'nmenu_inner');
    //创建菜单分项
    for (var i = 1; i < 5; i++) {
        var itemClass = 'item' + i + ' hinge showItem' + i;
        var itemBtnClass = 'item_btn btn' + i + ' hinge scroll';
        var item = nmenu_createElement('div', itemClass, '');
        var itemInner = nmenu_createElement('div', 'item_inner', '');
        var itemBtn = nmenu_createElement('div', itemBtnClass, '');
        itemBtn.id = 'menubtn' + i;
        itemInner.appendChild(itemBtn);
        item.appendChild(itemInner);
        nmenu_inner.appendChild(item);
    }
    //container.appendChild(nmenu_back);
    memu_container.appendChild(nmenu_inner);
    container.appendChild(memu_container);
    nmenu.container = container;
}
//创建元素
function nmenu_createElement(tag, className, id) {
    var ele = document.createElement(tag);
    ele.className = className;
    ele.setAttribute('id', id);
    if (ele) {
        return ele;
    }
    return undefined;
}
//为元素绑定事件
function nmenu_bindEvent(ele, eventTag, callback) {
    if (ele) {
        $(ele).bind(eventTag, callback);
    }
}