// TODO: Fix issue with scrollTop not registering in certain situations. Maybe use ng2-page-scroll lib instead

import { Directive, ElementRef, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked } from '@angular/core';

import * as $ from 'jquery';

@Directive({
	selector: '[spScroll]'
})
export class ScrollDirective implements OnInit, AfterContentInit, AfterViewInit /*AfterContentChecked */{
	constructor(private _elRef:ElementRef) {}

	ngOnInit(): void {
		this.myScroll();
	}

	ngAfterContentInit(): void {
	}

	ngAfterViewInit(): void {
	}

	myScroll(): void {
		//Get
		let elementOffset = $(this._elRef.nativeElement).offset().top;

		//Set
		$(window).scrollTop(elementOffset);
	}
}