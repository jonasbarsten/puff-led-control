const logUpdate = require('log-update');

const updateRate = 500;
const outputRate = 80;
const ledsInRow = 4;
let rgb = 2;

let state = {
	'0': {
		'0': [0, 0, 0, 0],
		'1': [0, 0, 0, 0],
		'2': [0, 0, 0, 0]
	},
	'1': {
		'0': [0, 0, 0, 0],
		'1': [0, 0, 0, 0],
		'2': [0, 0, 0, 0]
	},
	'2': {
		'0': [0, 0, 0, 0],
		'1': [0, 0, 0, 0],
		'2': [0, 0, 0, 0]
	},
	'3': {
		'0': [0, 0, 0, 0],
		'1': [0, 0, 0, 0],
		'2': [0, 0, 0, 0]
	},
}

const rotatePuffHorizontally = (puffNumber, reverse, preDelayTics, postDelayTics) => {

	if (!reverse) {
		let reverse = false;
	}

	Object.keys(state[puffNumber]).map((key, index) => {
		rotateLineHorisontally(puffNumber, key, reverse, preDelayTics, postDelayTics);
	});
};

const rotatePuffVertically = (puffNumber, reverse) => {
	
	let puff = state[puffNumber];
	let tic = 1;

	if (reverse) {
		tic = 3;
	}

	setInterval(() => {

		puff['0'] = [0,0,0,0];
		puff['1'] = [0,0,0,0];
		puff['2'] = [0,0,0,0];

		if (tic == 1) {puff['0'] = [rgb,rgb,rgb,rgb]};
		if (tic == 2) {puff['1'] = [rgb,rgb,rgb,rgb]};
		if (tic == 3) {puff['2'] = [rgb,rgb,rgb,rgb]};

		
		if (reverse) {
			tic = tic - 1;
		} else {
			tic = tic + 1;
		}
		
		if (reverse) {
			if (tic == 0) {tic = 3};
		} else {
			if (tic == ledsInRow) {tic = 1};
		}
	}, updateRate)
};

const rotatePuffDiagonally = (puffNumber, mode, preDelayTics, postDelayTics) => {

	if (!mode) {
		let mode = 1;
	}

	if (!preDelayTics) {
		let preDelayTics = 0;
	}

	if (!postDelayTics) {
		let postDelayTics = 0;
	}

	if (mode == 1) {
		rotateLineHorisontally(puffNumber, '0', false, 0, 2);
		rotateLineHorisontally(puffNumber, '1', false, 1, 2);
		rotateLineHorisontally(puffNumber, '2', false, 2, 2);
	}

	if (mode == 2) {
		rotateLineHorisontally(puffNumber, '0', true, 0, 2);
		rotateLineHorisontally(puffNumber, '1', true, 1, 2);
		rotateLineHorisontally(puffNumber, '2', true, 2, 2);
	}

	if (mode == 3) {
		rotateLineHorisontally(puffNumber, '0', false, 2, 2);
		rotateLineHorisontally(puffNumber, '1', false, 1, 2);
		rotateLineHorisontally(puffNumber, '2', false, 0, 2);
	}

	if (mode == 4) {
		rotateLineHorisontally(puffNumber, '0', true, 2, 2);
		rotateLineHorisontally(puffNumber, '1', true, 1, 2);
		rotateLineHorisontally(puffNumber, '2', true, 0, 2);
	}

};

const rotateLineHorisontally = (puffNumber, lineNumber, reverse, preDelayTics, postDelayTics) => {

	let tics = 1;

	if (preDelayTics) {
		tics = tics - preDelayTics;
	};

	setInterval(() => {

		if (tics > 0 && tics < ledsInRow + 1) {

			if (reverse) {
				if (tics == 1) {
					state[puffNumber][lineNumber] = [0,0,0,rgb];
				} else {
					state[puffNumber][lineNumber].push(state[puffNumber][lineNumber].shift());
				}
			} else {
				if (tics == 1) {
					state[puffNumber][lineNumber] = [rgb,0,0,0];
				} else {
					state[puffNumber][lineNumber].unshift(state[puffNumber][lineNumber].pop());
				}
			}

		} else {
			state[puffNumber][lineNumber] = [0,0,0,0];
		};

		tics = tics + 1;

		if (postDelayTics) {
			if (tics == ledsInRow + 1 + postDelayTics) {
				tics = 1;
			};
		} else {
			if (tics == ledsInRow + 1) {
				if (preDelayTics) {
					tics = tics - preDelayTics;
				} else {
					tics = 1;
				};
			}
		}

	}, updateRate);
};

rotatePuffDiagonally('0', 2);

setInterval(() => {
    const lineOne = state['0']['0'];
    const lineTwo = state['0']['1'];
    const lineThree = state['0']['2'];
 
    logUpdate(
`
   ${lineOne}
   ${lineTwo}
   ${lineThree}
`
    );
}, outputRate);

