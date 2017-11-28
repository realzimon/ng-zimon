import {
    Component,
    OnInit,
    Input,
    Output,
    OnChanges
    ElementRef,
    EventEmitter
} from '@angular/core';

import {colorPalette} from '../classes/colorPair';

@Component({
    selector: 'colorpicker',
    templateUrl: 'app/settings/colorpicker.component.html',
    styleUrls: ['app/settings/colorpicker.component.css']
})

export class ColorpickerComponent implements OnInit, OnChanges {

    public let colorPalette;

    @Input() value: string;
    @Output() valueChange: EventEmitter = new EventEmitter();

    constructor(public elementRef: ElementRef) {}

    ngOnInit() {
        this.colorPalette = colorPalette;
    }

    ngOnChanges(changes: SimpleChanges) {
        let colorpicker = this.elementRef.nativeElement;
        let selecter = $(colorpicker).find('#colorpicker-picked-color');

        let pickedColor = changes['value'].currentValue;
        let oldColor = changes['value'].previousValue;

        selecter.find('p').html(pickedColor);

        selecter.find('div.color-display').removeClass(oldColor);
        selecter.find('div.color-display').addClass(pickedColor);

        $(colorpicker).find('#colorpicker-list').children('.selected').removeClass('selected');
        $(colorpicker).find('#colorpicker-list').children('[value="' + pickedColor + '"]').addClass('selected');
    }

    togglePicker($event) {
        let picker = $($event.currentTarget);
        if (picker.hasClass('selected')) {
            picker.removeClass('selected');
        } else {
            picker.addClass('selected');
        }
        picker.siblings('ul#colorpicker-list').slideToggle();
    }

    selectColor($event) {
        let listElement = $event.currentTarget;
        let colorpicker = $(listElement).parent().parent();

        this.value = $(listElement).attr('value');
        this.valueChange.emit(this.value);

        colorpicker.find('#colorpicker-picked-color').removeClass('selected');
        $(listElement).parent().slideUp();
    }
}
