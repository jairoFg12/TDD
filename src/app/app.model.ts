export interface Nomina {
    codigo: string;
    nombre: string;
}


export interface SincoAutocompleteOptions {
    value: string;
    text: string;
    dataSource: any[];
    selectFirst: boolean;
    viewalldata: boolean;
    placeholder: string;
    onselected: any;
}
