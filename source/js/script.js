( () => {
	const page = document.documentElement;

	// прокрутка страницы

	const scroll = ( link, distance ) => {
		const step = distance / 100;

		let stepCounter = 0;

		link.addEventListener( `click`, ( evt ) => {
			evt.preventDefault();

			const timer = setInterval( () => {
				page.scrollTop += step;

				if ( stepCounter > 100 ) {
					clearInterval( timer );
					stepCounter = 0;

					return;
				}

				stepCounter++;
			}, 1 );
		});
	};

	const toFooterLink = document.getElementById( `to-footer` );
	const toFooterDistance = Math.floor(document.getElementById( `footer` ).getBoundingClientRect().top - page.getBoundingClientRect().top);

	scroll( toFooterLink, toFooterDistance );

	const toFormLink = document.getElementById( `to-form` );
	const toFormDistance = Math.floor(document.getElementById( `form-section` ).getBoundingClientRect().top - page.getBoundingClientRect().top) - 100;

	scroll( toFormLink, toFormDistance );

	const scroller = document.getElementById( `scroller` );
	const screenHeight = window.innerHeight;

	scroll( scroller, screenHeight );

	// запуск видео

	const video = document.getElementById( `video` );
	const videoButton = document.getElementById( `video-button` );

	videoButton.addEventListener( `click`, () => {
		video.style.display = `block`;
		videoButton.style.display = `none`;
		video.play();
	} );

	// слайдер

	const slider = document.getElementById( `slider` );
	const container = slider.children[1];
	const slides = container.querySelectorAll( `figure` );

	let currentIndex = 1;
	let currentPosition = -916;

	slider.addEventListener( `click`, ( evt ) => {
		if ( evt.target.tagName.toLowerCase() === `button` ) {
			if ( evt.target.id === `previous` && currentIndex > 0 ) {
				slides[currentIndex].classList.remove( `show` );
				currentIndex -= 1;
				slides[currentIndex].classList.add( `show` );
				currentPosition += 916;
				container.style.left = `${currentPosition}px`;
			} else if ( currentIndex < 2 ) {
				slides[currentIndex].classList.remove( `show` );
				currentIndex += 1;
				slides[currentIndex].classList.add( `show` );
				currentPosition -= 916;
				container.style.left = `${currentPosition}px`;
			}

		}
	} );

	// форма

	const form = document.getElementById( `form` );
	const nameField = document.getElementById( `name` );
	const emailField = document.getElementById( `email` );
	const success = document.getElementById( `success` );

	let errors = false;

	const validateEmail = ( email ) => {
		var regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regularExpression.test(String( email ).toLowerCase());
	}

	form.addEventListener( `submit`, ( evt ) => {
		evt.preventDefault();
		errors = false;
		nameField.classList.remove( `error` );
		emailField.classList.remove( `error` );

		if ( nameField.value === `` ) {
			nameField.classList.add( `error` );
			errors = true;
		}

		if ( emailField.value === `` || !validateEmail( emailField.value ) ) {
			emailField.classList.add( `error` );
			errors = true;
		}

		if ( !errors ) {
			success.style.display = `block`;
		}
	} );
} )();
