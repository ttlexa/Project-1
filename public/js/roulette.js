// <!-- public/js/roulette.js -->
// <!-- скрипт для настройки, создания и запуска колеса рулетки -->
"use strict"

var spinWheel = new Winwheel({
	'numSegments'       :   37,         // кол-во сегментов
	'textAlignment'     :   'outer',    // где будет написан текст (ближе/дальше от центра)
	'textOrientation'   :   'curved',   // направление текста (по кругу)
	'textMargin'        :   20,         // отступ текста от края
	'textFontSize'      :   15,         // размер текста
	'innerRadius'       :   140,        // внутренний радиус
	'segments'       	:                 // описание каждого сегмента : цвет сегмента, содержание, цвет текста
	[
	    {'fillStyle' : '#008000', 'text' : '0', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '32', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '15', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '19', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '4', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '21', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '2', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '25', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '17', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '34', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '6', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '27', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '13', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '36', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '11', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '30', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '8', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '23', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '10', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '5', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '24', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '16', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '33', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '1', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '20', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '14', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '31', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '9', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '22', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '18', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '29', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '7', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '28', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '12', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '35', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#ff0000', 'text' : '3', 'textFillStyle' : '#FFFFFF'},
	    {'fillStyle' : '#000000', 'text' : '26', 'textFillStyle' : '#FFFFFF'}
	],
	'animation'     :                   // параметры для анимации
	{
	    'type'      :   'spinToStop',   // тип анимации
	    'duration'  :   2,              // длительность анимации (сек)
	    'spins'     :   2,              // кол-во пройденных полных оборотов
	    'delay'     :   0.5             // задержка перед запуском
	}
	});

function getWinSegmentFromServerAndStart(){
    // сброс колеса рулекти в начальное положение
    if (winwheelToDrawDuringAnimation != null) {
        spinWheel.stopAnimation();
        spinWheel.rotationAngle=0;
        spinWheel.draw();
    };
    // получение случайного угла внутри заданного сегмента
    var stopAt = spinWheel.getRandomForSegment(36);
    // задаем угол для остановки колеса, перед его запуском
    spinWheel.animation.stopAngle = stopAt;
    // запуск колеса рулетки
    spinWheel.startAnimation();
};