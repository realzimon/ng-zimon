/**
 * Created by DZDomi on 10.02.17.
 */
import {Component} from '@angular/core';
import {Zivi, ZiviService} from '../../services/zivi.service';
import {PostlerService} from "../../services/postler.service";
import {NetUsageService, NetUpdate} from "../../services/netusage.service";

@Component({
    selector: 'netusage',
    templateUrl: 'app/dash/stats/netusage.component.html'
})
export class NetUsage {
    public barChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    min: 0,
                    fontColor: '#ffffff'
                },
                gridLines: {
                    color: 'rgba(255,255,255,0.4)',
                    zeroLineColor: '#ffffff'
                }
            }]
        }
    };

    public barChartLabels: string[] = [];
    public barChartColors: any[] = [];
    public barChartData: any[] = [{data: [], label: ''}];

    public netUpdate: NetUpdate;

    constructor(private netUsageService: NetUsageService) {
        this.netUpdate = this.netUsageService.getNetUsageUpdates().subscribe((data: any) => {
            this.barChartData = [];
            data.netUsage.forEach((netData: any) => {
                console.log(netData);
                this.barChartData.push({
                    data: [netData.download],
                    label: netData.hostname
                });
                this.barChartColors.push({
                    backgroundColor: '#ffffff',
                    fontColor: '#ffffff'
                });
            });
        })
    }


}
