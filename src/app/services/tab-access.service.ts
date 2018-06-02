import { Injectable } from '@angular/core';

@Injectable()
export class TabAccessService {
  constructor(){}

  setFocusBoundary(parentEl) {
    let element = parentEl[0],
    focusableEls = element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');

    // Automatically set focus to first element in group
    focusableEls[0].focus();

    parentEl.on('keydown', (e) => {
      this.handleKeyDown(focusableEls, e);
    });
  }

  handleKeyDown(focusableEls, e) {

    let KEY_TAB = 9,
        KEY_ESC = 27,
        firstFocusableEl = focusableEls[0],
        lastFocusableEl = focusableEls[focusableEls.length - 1];
  
    function handleBackwardTab() {
      if ( document.activeElement === firstFocusableEl ) {
        e.preventDefault();
        lastFocusableEl.focus();
      }
    }
    function handleForwardTab() {
      if ( document.activeElement === lastFocusableEl ) {
        e.preventDefault();
        firstFocusableEl.focus();
      }
    }
  
    switch(e.keyCode) {
      case KEY_TAB:
        if ( focusableEls.length === 1 ) {
          e.preventDefault();
          break;
        } 
  
        if ( e.shiftKey ) {
          handleBackwardTab();
        } else {
          handleForwardTab();
        }
      
        break;

      // case KEY_ESC:
      //   closeCB();
      //   break;
        
      default:
        break;
    } // end switch
  }
}