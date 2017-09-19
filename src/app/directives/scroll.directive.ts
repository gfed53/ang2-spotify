import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[spScroll]'
})
export class ScrollDirective {
	constructor(private elRef:ElementRef) {}

	ngAfterViewInit() {
		console.log('after view init fired');
		this.myScroll();
	}

	myScroll(): void {
		console.log('should scroll to top of element');
		// console.log('this.elRef.nativeElement.scrollHeight',this.elRef.nativeElement.scrollHeight);
		//Get
		let distance = this.elRef.nativeElement.getBoundingClientRect().top;
		console.log('distance of element from top?',distance);
		//Set
		window.scrollTo(0, distance);
		console.log('should be done, window.scrollY:',window.scrollY);
	}
}