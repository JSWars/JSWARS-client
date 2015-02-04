define([
	'directives/Directives',
	'components/kineticjs/kinetic',
	'factories/CountriesFactory'
], function (Directives, Kinetic) {
	Directives.directive("game", ['Countries', function (Countries) {
		return {
			restrict: 'A',
			link: function ($scope, element, attrs) {

				var SQUARE_PX = 20; //PX
				var SQUARE_STROKE = 2; //PX

				var stage;

				function drawPlayers(layer, players) {
					var blockSize = 70 / 5;
					var randomColor = get_random_color();
					var group = new Kinetic.Group({
						id: new Date().getTime(),
						x: blockSize / 2,
						y: blockSize / 2
					});

					var circle = new Kinetic.Arc({
							x: players.x * blockSize,
							y: players.y * blockSize,
							outerRadius: blockSize / 2,
							fill: randomColor,
							angle: 360
						}
					);

					group.add(circle);
					layer.add(group);
				}

				function drawMap(layer, map) {

					var blockSize = SQUARE_PX;
					var counterY = 0;
					var counterX = 0;
					var randomColor = get_random_color();


					var group = new Kinetic.Group({
						id: new Date().getTime(),
						x: 0,
						y: 0
					});

					for (var i = 0; i < map.length; i = i + 1) {
						for (var j = 0; j < map[i].length; j = j + 1) {
							var mapItem = map[i][j];

							if (mapItem !== 0) {
								var rectOptions = {
										x: counterX * blockSize,
										y: counterY * blockSize,
										width: blockSize,
										height: blockSize,
										fill: randomColor,
										stroke: '#000000',
										strokeWidth: SQUARE_STROKE
									};
								group.add(new Kinetic.Rect(rectOptions));
							}

							counterX += 1;
						}
						counterY += 1;
						counterX = 0;
					}

					layer.add(group);
					layer.draw();

				}

				function get_random_color() {
					var letters = '0123456789ABCDEF'.split('');
					var color = '#';
					for (var i = 0; i < 6; i = i + 1) {
						color += letters[Math.round(Math.random() * 15)];
					}
					return color;
				}

				function mockMap(width, height) {
					var map = [];
					for (var i = 0; i < width; i += 1) {
						map[i] = [];
						for (var j = 0; j < height; j += 1) {
							if (i === 0 || i === width - 1 || j === 0 || j === height - 1) {
								map[i][j] = 1;
							} else {
								map[i][j] = 0;
							}

						}
					}
					return map;
				}

				var colMap = mockMap(30, 30);

				stage = new Kinetic.Stage({
					container: element[0],
					width: colMap.length * SQUARE_PX,
					height: colMap[0].length * SQUARE_PX
				});

				element
					.css('background-image', 'url("img/map/background.jpg")');

				var layers = {
					map: new Kinetic.Layer(),
					players: new Kinetic.Layer()
				};


				//Draw map layer
				drawMap(layers.map, colMap);
				stage.add(layers.map);

				//Draw players layer
				var players = {x: 5, y: 5};
				drawPlayers(layers.players, players);
				stage.add(layers.players);


			}
		};
	}])
	;
})
;
