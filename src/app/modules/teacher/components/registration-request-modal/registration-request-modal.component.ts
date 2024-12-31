import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GlobalService } from 'src/app/services/global.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-registration-request-modal',
    templateUrl: './registration-request-modal.component.html',
    styleUrl: './registration-request-modal.component.scss',
})
export class RegistrationRequestModalComponent implements OnInit {
    students: any[] = [];

    constructor(
        private httpService: HttpService,
        private globalService: GlobalService,
        private dialogReference: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        this.students = this.dialogConfig.data.students;
    }

    notificationAction(notification: any) {
        try {
            if (notification.classId && notification.id) {
                this.globalService.setObservable('isLoading', true);
                this.httpService
                    .post(environment.baseUrl + 'class-batch-students/get_batch_student_by_class_id', {
                        studentId: notification.id,
                        classId: notification.classId,
                    })
                    .then((res: any) => {
                        if (res) {
                            const classBatchStudent = res;
                            // classBatchStudent.status = ClassBatchStatus.joined;
                            this.httpService
                                .post(
                                    environment.baseUrl + 'class-batch-students/update/' + classBatchStudent.id,
                                    classBatchStudent
                                )
                                .then(() => {
                                    const idx = this.students.findIndex(noti => noti.id == notification.id);
                                    this.students.splice(idx, notification);
                                    this.globalService.setObservable('isLoading', false);
                                    this.closeModal();
                                })
                                .catch(er => {
                                    this.globalService.setObservable('isLoading', false);
                                });
                        }
                    })
                    .catch(err => {
                        this.globalService.setObservable('isLoading', false);
                    });
            }
        } catch (error) {
            this.globalService.setObservable('isLoading', false);
        }
    }

    closeModal() {
        this.dialogReference.close();
    }
}
