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
        },
        animation: false
    };

    public barChartLabels: string[] = [];
    public barChartColors: any[] = [];
    public barChartData: any[] = [
        {
            data: [],
            label: ''
        }
    ];

    public netUpdate: NetUpdate;

    constructor(private netUsageService: NetUsageService, private ziviService: ZiviService) {
        this.netUpdate = this.netUsageService.getNetUsageUpdates().subscribe((data: any) => {
            let tempData: any[] = [];
            let tempColor: any[] = [];
            ziviService.getAllZivis().subscribe((zivis) => {
                data.netUsage.forEach((netData: any) => {
                    tempData.push({
                        data: [Math.round(netData.download / 1000)],
                        label: netData.hostname
                    });
                    let worked: boolean = false;
                    zivis.forEach((zivi: any) => {
                        zivi.addresses.forEach((address: string) => {
                            if (address === netData.mac) {
                                tempColor.push({
                                    backgroundColor: zivi.colorHex,
                                    fontColor: '#ffffff'
                                });
                                worked = true;
                            }
                        });
                    });
                    if (!worked) {
                        tempColor.push({
                            backgroundColor: '#ffffff',
                            fontColor: '#ffffff'
                        });
                    }
                });
                this.barChartData = tempData;
                this.barChartColors = tempColor;
            });
        })
    }


}
