//TODO: Fix issue with scrollTop not registering in certain situations

import { Directive, ElementRef, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked } from '@angular/core';

import * as $ from 'jquery';

@Directive({
	selector: '[spScroll]'
})
export class ScrollDirective implements OnInit, AfterContentInit, AfterViewInit /*AfterContentChecked */{
	constructor(private _elRef:ElementRef) {}

	ngOnInit(): void {
		console.log('after on init fired');
		console.log('this._elRef.nativeElement',this._elRef.nativeElement);
		this.myScroll();
	}

	ngAfterContentInit(): void {
		console.log('after content init fired');
		console.log('this._elRef.nativeElement',this._elRef.nativeElement);
	}

	// ngAfterContentChecked(): void {
	// 	console.log('after content checked fired');
	// 	this.myScroll();
	// }

	ngAfterViewInit(): void {
		console.log('after view init fired');
		console.log('this._elRef.nativeElement',this._elRef.nativeElement);
		
	}

	// ngAfterViewChecked(): void {
	// 	console.log('after view checked fired');
	// 	this.myScroll();
	// }

	myScroll(): void {
		console.log('this._elRef.nativeElement',this._elRef.nativeElement);

		//Get
		let elementOffset = $(this._elRef.nativeElement).offset().top;
		
		console.log('elementOffset',elementOffset);

		//Set
		$(window).scrollTop(elementOffset);
		console.log('done');
		// console.log('$(document).scrollTop():',$(window).scrollTop());
	}
}