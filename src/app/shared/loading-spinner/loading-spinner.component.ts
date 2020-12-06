import { Component }  from '@angular/core'

@Component({
    selector: 'app-loading-spinner',
    template: 
    `
        <div class="box">
            <div class="shadow"></div>
            <div class="gravity">
                <div class="ball"></div>
            </div>
        </div>
    `,
    styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

}