import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHeaderComponent } from './teacher-header.component';

describe('TeacherHeaderComponent', () => {
    let component: TeacherHeaderComponent;
    let fixture: ComponentFixture<TeacherHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TeacherHeaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TeacherHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
