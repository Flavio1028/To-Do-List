import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontWeightResizerDirective } from '../../fontWeightResizer.directive';
import { TestFontWeightResizerDirectiveComponent } from './test-font-weight-resizer-directive.component';

describe('TestFontWeightResizerDirective', () => {

  let fixture: ComponentFixture<TestFontWeightResizerDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestFontWeightResizerDirectiveComponent, FontWeightResizerDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(TestFontWeightResizerDirectiveComponent);
    fixture.detectChanges();
  });

  it('should font-weight to be "BOLD"', () => {
      const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
      const fontWeight = h2.style.fontWeight;

      expect(fontWeight).toEqual('bold');
  });

});
