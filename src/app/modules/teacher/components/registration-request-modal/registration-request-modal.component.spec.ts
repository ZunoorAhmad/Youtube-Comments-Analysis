import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRequestModalComponent } from './registration-request-modal.component';

describe('RegistrationRequestModalComponent', () => {
    let component: RegistrationRequestModalComponent;
    let fixture: ComponentFixture<RegistrationRequestModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RegistrationRequestModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RegistrationRequestModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
