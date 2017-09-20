import { Directive, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';

@Directive({
	selector: '[spScroll]'
})
export class ScrollDirective implements AfterContentInit {
	constructor(private elRef:ElementRef) {}

	ngAfterContentInit() {
		console.log('after content init fired');
		this.myScroll();
	}

	myScroll(): void {
		console.log('should scroll to top of element');
		// console.log('this.elRef.nativeElement.scrollHeight',this.elRef.nativeElement.scrollHeight);
		//Get
		let distance = this.elRef.nativeElement.getBoundingClientRect().top;
		console.log('distance of element from top',distance);
		console.log('window.scrollY:',window.scrollY);

		//Set
		window.scrollTo(0, distance);
		// window.scrollBy(0, distance);

		console.log('should be done, window.scrollY:',window.scrollY);
	}
}