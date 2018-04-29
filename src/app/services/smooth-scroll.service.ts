import { Inject, Injectable } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

// Service to handle use of Ng2PageScrollModule
@Injectable()
export class SmoothScrollService {
	constructor(
    private pageScrollService: PageScrollService, 
    @Inject(DOCUMENT) private document: any
  ){}

  duration: number = 350;
  
  easingLogic: any = {
    ease: (t: number, b: number, c: number, d: number): number => {
      // quadratic ease in/out
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    }
  };

  scrollTo(id: string): void {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, id);
    this.pageScrollService.start(pageScrollInstance);
  }

}