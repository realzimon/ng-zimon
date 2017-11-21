export class ColorPair {

    constructor(public color: string, public hex: string) {

    }
}

export let colorPalette: ColorPair[]  = [
    new ColorPair('red', '#f44336'),
    new ColorPair('pink', '#e91e63'),
    new ColorPair('purple', '#9c27b0'),
    new ColorPair('deep-purple', '#673ab7'),
    new ColorPair('indigo', '#3f51b5'),
    new ColorPair('blue', '#2196f3'),
    new ColorPair('light-blue', '#03a9f4'),
    new ColorPair('cyan', '#00bcd4'),
    new ColorPair('teal', '#009688'),
    new ColorPair('green', '#4caf50'),
    new ColorPair('light-green', '#8bc34a'),
    new ColorPair('lime', '#cddc39'),
    new ColorPair('yellow', '#ffeb3b'),
    new ColorPair('amber', '#ffc107'),
    new ColorPair('orange', '#ff9800'),
    new ColorPair('deep-orange', '#ff5722'),
    new ColorPair('brown', '#795548'),
    new ColorPair('grey', '#9e9e9e'),
    new ColorPair('blue-grey', '#607d8b')
];
