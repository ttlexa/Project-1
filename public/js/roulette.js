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
	    {'fillStyle' : '#008000', 'text' : '0', 'textFillStyle' : '#FFFFFF'},	//segment[1]
	    {'fillStyle' : '#ff0000', 'text' : '32', 'textFillStyle' : '#FFFFFF'},	//segment[2]
	    {'fillStyle' : '#000000', 'text' : '15', 'textFillStyle' : '#FFFFFF'},	//segment[3]
	    {'fillStyle' : '#ff0000', 'text' : '19', 'textFillStyle' : '#FFFFFF'},	//segment[4]
	    {'fillStyle' : '#000000', 'text' : '4', 'textFillStyle' : '#FFFFFF'},	//segment[5]
	    {'fillStyle' : '#ff0000', 'text' : '21', 'textFillStyle' : '#FFFFFF'},	//segment[6]
	    {'fillStyle' : '#000000', 'text' : '2', 'textFillStyle' : '#FFFFFF'},	//segment[7]
	    {'fillStyle' : '#ff0000', 'text' : '25', 'textFillStyle' : '#FFFFFF'},	//segment[8]
	    {'fillStyle' : '#000000', 'text' : '17', 'textFillStyle' : '#FFFFFF'},	//segment[9]
	    {'fillStyle' : '#ff0000', 'text' : '34', 'textFillStyle' : '#FFFFFF'},	//segment[10]
	    {'fillStyle' : '#000000', 'text' : '6', 'textFillStyle' : '#FFFFFF'},	//segment[11]
	    {'fillStyle' : '#ff0000', 'text' : '27', 'textFillStyle' : '#FFFFFF'},	//segment[12]
	    {'fillStyle' : '#000000', 'text' : '13', 'textFillStyle' : '#FFFFFF'},	//segment[13]
	    {'fillStyle' : '#ff0000', 'text' : '36', 'textFillStyle' : '#FFFFFF'},	//segment[14]
	    {'fillStyle' : '#000000', 'text' : '11', 'textFillStyle' : '#FFFFFF'},	//segment[15]
	    {'fillStyle' : '#ff0000', 'text' : '30', 'textFillStyle' : '#FFFFFF'},	//segment[16]
	    {'fillStyle' : '#000000', 'text' : '8', 'textFillStyle' : '#FFFFFF'},	//segment[17]
	    {'fillStyle' : '#ff0000', 'text' : '23', 'textFillStyle' : '#FFFFFF'},	//segment[18]
	    {'fillStyle' : '#000000', 'text' : '10', 'textFillStyle' : '#FFFFFF'},	//segment[19]
	    {'fillStyle' : '#ff0000', 'text' : '5', 'textFillStyle' : '#FFFFFF'},	//segment[20]
	    {'fillStyle' : '#000000', 'text' : '24', 'textFillStyle' : '#FFFFFF'},	//segment[21]
	    {'fillStyle' : '#ff0000', 'text' : '16', 'textFillStyle' : '#FFFFFF'},	//segment[22]
	    {'fillStyle' : '#000000', 'text' : '33', 'textFillStyle' : '#FFFFFF'},	//segment[23]
	    {'fillStyle' : '#ff0000', 'text' : '1', 'textFillStyle' : '#FFFFFF'},	//segment[24]
	    {'fillStyle' : '#000000', 'text' : '20', 'textFillStyle' : '#FFFFFF'},	//segment[25]
	    {'fillStyle' : '#ff0000', 'text' : '14', 'textFillStyle' : '#FFFFFF'},	//segment[26]
	    {'fillStyle' : '#000000', 'text' : '31', 'textFillStyle' : '#FFFFFF'},	//segment[27]
	    {'fillStyle' : '#ff0000', 'text' : '9', 'textFillStyle' : '#FFFFFF'},	//segment[28]
	    {'fillStyle' : '#000000', 'text' : '22', 'textFillStyle' : '#FFFFFF'},	//segment[29]
	    {'fillStyle' : '#ff0000', 'text' : '18', 'textFillStyle' : '#FFFFFF'},	//segment[30]
	    {'fillStyle' : '#000000', 'text' : '29', 'textFillStyle' : '#FFFFFF'},	//segment[31]
	    {'fillStyle' : '#ff0000', 'text' : '7', 'textFillStyle' : '#FFFFFF'},	//segment[32]
	    {'fillStyle' : '#000000', 'text' : '28', 'textFillStyle' : '#FFFFFF'},	//segment[33]
	    {'fillStyle' : '#ff0000', 'text' : '12', 'textFillStyle' : '#FFFFFF'},	//segment[34]
	    {'fillStyle' : '#000000', 'text' : '35', 'textFillStyle' : '#FFFFFF'},	//segment[35]
	    {'fillStyle' : '#ff0000', 'text' : '3', 'textFillStyle' : '#FFFFFF'},	//segment[36]
	    {'fillStyle' : '#000000', 'text' : '26', 'textFillStyle' : '#FFFFFF'}	//segment[37]
	],
	'animation'     :                   // параметры для анимации
	{
	    'type'      :   'spinToStop',   // тип анимации
	    'duration'  :   2,              // длительность анимации (сек)
	    'spins'     :   2,              // кол-во пройденных полных оборотов
	    'delay'     :   0.5             // задержка перед запуском
	}
	});

Winwheel.prototype.getWinSegmentFromServerAndStart = function (numWinSegment){
    // сброс колеса рулекти в начальное положение
    if (winwheelToDrawDuringAnimation != null) {
        spinWheel.stopAnimation();
        spinWheel.rotationAngle=0;
        spinWheel.draw();
    };
    // получение случайного угла внутри заданного сегмента
    var stopAt = spinWheel.getRandomForSegment(numWinSegment);
    // задаем угол для остановки колеса, перед его запуском
    spinWheel.animation.stopAngle = stopAt;
    // запуск колеса рулетки
    spinWheel.startAnimation();
};