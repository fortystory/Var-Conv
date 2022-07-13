// 解析对象
let VarConv = function (var_name) {
    // 保留原始字符串
    // this.origin_var_name = var_name;
    this.dollar = '';
    if(var_name.slice(0,1) == '$'){
        this.dollar = '$';
        var_name = var_name.slice(1);
    }

    // 尝试拆分
    let var_split = [];
    ['-', '_', ' '].forEach((splitter) => {
        if (var_name.indexOf(splitter) > 0) {
            var_split = var_name.split(splitter);
        }
    });

    // 不行就 正则表达式 大小写拆
    if (var_split.length <= 0) {
        var_split = var_name.match(/(^[A-Z]|^|[A-Z])([a-z]+)?/g);
    }

    this.var_split = var_split.join('-').toLocaleLowerCase().split('-');
}

VarConv.prototype.maps = {
    UpperCamelCase: { title: '大驼峰 帕斯卡命名法', search: 'dtf,datuofeng,psk,pasika,ucc,uppercamelcase' },
    CamelCase     : { title: '小驼峰 驼峰命名法', search: 'xtf,xiaotuofeng,cc,camelcase' },
    Snake         : { title: '蛇形法 下划线命名法', search: 'sx,shexing,xhx,xiahuaxian,snake,_' },
    Hyphen        : { title: '连字符 中划线命名法', search: 'l,h,lzf,lianzifu,zhx,zhonghuaxian,hyphen,-' },
    ConstType     : { title: '常量式', search: 'clm,changliangming,const' },
//     LocaleLowerCase: { title: '全小写', search: 'qxx,quanxiaoxie,llc,localelowercase' },
//     LocaleUpperCase: { title: '全大写', search: 'qdx,quandaxie,luc,localeuppercase' },
//     SpaceUpperCase: { title: '空格 全大写', search: ' dx, qdx,kdx,kqd,kgqdx,kongquandaxie,konggequandaxie' },
//     SpaceLowerCase: { title: '空格 全小写', search: ' xx, qxx,kxx,kqx,kgqxx,kongquanxiao,konggequanxiaoxie' },
//     SpaceUpperCamelCase: { title: '空格 大驼峰', search: ' dtf,kdtf,kgdtf,kongdatuofeng,konggedatuofeng' },
//     SpaceCamelCase: { title: '空格 小驼峰', search: ' xtf,kxtf,kongxiaotuofeng,konggexiaotuofeng' },
}

// 大驼峰写法 帕斯卡命名法 VariableName
VarConv.prototype.toUpperCamelCase = function (separator) {
    let vars = [];
    this.var_split.forEach(item => {
        item = item.replace(/(^[a-z])/, (match) => {
            return match.toLocaleUpperCase()
        });
        vars.push(item)
    });
    return this.dollar + vars.join(separator || '');
}

// 小驼峰写法 驼峰命名法 variableName
VarConv.prototype.toCamelCase = function (separator) {
    let vars = [];
    this.var_split.forEach((item, index) => {
        if (index != 0) {
            item = item.replace(/(^[a-z])/, (match) => {
                return match.toLocaleUpperCase()
            });
        }
        vars.push(item)
    });
    return this.dollar + vars.join(separator || '');
}

// 蛇形写法 下划线 variable_name
VarConv.prototype.toSnake = function () {
    return this.dollar + this.var_split.join('_');
}

// 连字符 variable-name
VarConv.prototype.toHyphen = function () {
    return this.dollar + this.var_split.join('-');
}

// 常量写法 全大写+下划线 VARIABLE_NAME
VarConv.prototype.toConstType = function () {
    return this.dollar + this.var_split.join('_').toLocaleUpperCase();
}

// // 全小写
// VarConv.prototype.toLocaleLowerCase = function () {
//     return this.dollar + this.origin_var_name.toLocaleLowerCase();
// }

// // 全大写
// VarConv.prototype.toLocaleUpperCase = function () {
//     return this.dollar + this.origin_var_name.toLocaleUpperCase();
// }

// // 空格 全小写
// VarConv.prototype.toSpaceLowerCase = function () {
//     return this.dollar + this.var_split.join(' ').toLocaleLowerCase();
// }
// // 空格 全大写
// VarConv.prototype.toSpaceUpperCase = function () {
//     return this.dollar + this.var_split.join(' ').toLocaleUpperCase();
// }
// // 空格 大驼峰
// VarConv.prototype.toSpaceUpperCamelCase = function () {
//     return this.dollar + this.toUpperCamelCase(' ');
// }

// // 空格 小驼峰写法
// VarConv.prototype.toSpaceCamelCase = function () {
//     return this.dollar + this.toCamelCase(' ');
// }

module.exports = VarConv;