(function(){
    "use strict";

angular.module("mineApp").factory("MineService", MineServiceFunc);

function MineServiceFunc(MINE_CONST) {
    return {
        buildMap: buildMap
    };

    /** 创建一个放置好地雷的地图
     *  非负数表示此格周围有多少雷，-1表示雷
     */
    function buildMap(width, height, mineNum) {
        width = (width < 1) ? 1 : width;
        width = (width > 100) ? 100 : width;
        height = (height < 1) ? 1 : height;
        height = (height > 100) ? 100 : height;
        var maxMine = width * height;
        mineNum = (mineNum <= maxMine) ? mineNum : maxMine;

        var map = createArray2D(width, height);
        placeMine(width, height, mineNum, map);
        setPropmtNumber(width, height, map);
        return map;
    }

    function createArray2D(width, height) {
        var arr = new Array();
        for (var i = 0; i < height; i++) {
            arr[i] = new Array();
            for (var j = 0; j < width; j++) {
                arr[i][j] = 0;
            }
        }
        return arr;
    }

    function placeMine(w, h, mineNum, map) {
        var placedCounter = 0;
        while (placedCounter < mineNum) {
            var x = RandNum(w);
            var y = RandNum(h);
            if (map[y][x] === MINE_CONST.MINE) {
                continue;
            }
            map[y][x] = MINE_CONST.MINE;
            ++placedCounter;
        }
    }

    function setPropmtNumber(w, h, map) {
        for (var i = 0; i < h; i++) {
            for (var j = 0; j < w; j++) {
                if (map[i][j] === MINE_CONST.MINE) {
                    calculatePrompt(j, i, w, h, map);
                }
            }
        }
    }

    // 计算雷周围的8个提示数字
    function calculatePrompt(x, y, w, h, map) {
        for (var offsetX = -1; offsetX < 2; offsetX++) {
            for (var offsetY = -1; offsetY < 2; offsetY++) {
                var newX = x + offsetX;
                var newY = y + offsetY;
                if (newX < 0 || newX >= w || newY < 0 || newY >= h) {
                    continue; // 跳过超出边界的坐标
                }
                if (map[newY][newX] === MINE_CONST.MINE) {
                    continue; // 跨过自己和其他雷
                }
                if (map[newY][newX] === 0) { // 相当于跳过了已经计算过的格子
                    map[newY][newX] = countMineNumber(newX, newY, w, h, map);
                }
            }
        }
    }

    // 计算本格周围雷的数量
    function countMineNumber(x, y, w, h, map) {
        var count = 0;
        for (var offsetX = -1; offsetX < 2; offsetX++) {
            for (var offsetY = -1; offsetY < 2; offsetY++) {
                var newX = x + offsetX;
                var newY = y + offsetY;
                if (newX < 0 || newX >= w || newY < 0 || newY >= h) {
                    continue; // 跳过超出边界的坐标
                }
                if (map[newY][newX] === MINE_CONST.MINE) {
                    ++count;
                }
            }
        }
        return count;
    }

    function RandNum(max) {
        return Math.floor(Math.random() * max);
    }
}

})();
