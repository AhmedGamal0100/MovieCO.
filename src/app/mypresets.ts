import { definePreset } from '@primeng/themes';
import Lara from '@primeng/themes/Lara';

export const MyPreset = definePreset(Lara, {
    semantic: {
        colorScheme: {
            light: {
                surface: {
                    // 0: '#ffffff',           // input background (light mode)
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',      // input border (light mode)
                    300: '{zinc.300}',
                    // ...
                    color: '{slate.100}',   // input text color (light mode)
                    inverseColor: '#ffffff',
                    hoverColor: '{slate.100}',
                    activeColor: '{slate.950}',
                },
                primary: {
                    // Used for focus, active, and accent states
                    // 0: '#ffffff',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}',
                    color: '{slate.700}',
                    inverseColor: '{slate.900}',
                    hoverColor: '{slate.900}',
                    activeColor: '{slate.100}',
                }
                // primary: {
                //     0: '#ffffff',
                //     50: '{slate.50}',
                //     100: '{slate.100}',
                //     200: '{slate.200}',
                //     300: '{slate.300}',
                //     400: '{slate.400}',
                //     500: '{slate.500}',
                //     600: '{slate.600}',
                //     700: '{slate.700}',
                //     800: '{slate.800}',
                //     900: '{slate.900}',
                //     950: '{slate.950}',
                //     color: '{slate.700}',
                //     inverseColor: '#ffffff',
                //     hoverColor: '{slate.900}',
                //     activeColor: '{slate.100}',
                // },
                //                 surface: {
                //                     0: '#ffffff',
                //                     50: '{zinc.50}',
                //                     100: '{zinc.100}',
                //                     200: '{zinc.200}',
                //                     300: '{zinc.300}',
                //                     400: '{zinc.400}',
                //                     500: '{zinc.500}',
                //                     600: '{zinc.600}',
                //                     700: '{zinc.700}',
                //                     800: '{zinc.800}',
                //                     900: '{zinc.900}',
                //                     950: '{zinc.950}',
                //                     color: '{slate.100}',
                //                     inverseColor: '#ffffff',
                //                     hoverColor: '{slate.100}',
                //                     activeColor: '{slate.950}',
            },
            //                 highlight: {
            //                     background: '{zinc.900}',
            //                     focusBackground: '{zinc.700}',
            //                     color: '#ffffff',
            //                     focusColor: '#ffffff'
        },
        //                 // focusRing: {
        //                 //     width: '2px',
        //                 //     style: 'dashed',
        //                 //     color: '{zinc.950}',
        //                 //     offset: '1px'
        //                 // }
    },
    //             dark: {
    //                 surface: {
    //                     0: '#ffffff',
    //                     50: '{slate.50}',
    //                     100: '{slate.100}',
    //                     200: '{slate.200}',
    //                     300: '{slate.300}',
    //                     400: '{slate.400}',
    //                     500: '{slate.500}',
    //                     600: '{slate.600}',
    //                     700: '{slate.700}',
    //                     800: '{slate.800}',
    //                     900: '{slate.900}',
    //                     950: '{slate.950}'
    //                 },
    //                 primary: {
    //                     color: '{slate.50}',
    //                     inverseColor: '{slate.950}',
    //                     hoverColor: '{slate.100}',
    //                     activeColor: '{slate.200}'
    //                 },
    //                 highlight: {
    //                     background: '{slate.950}',
    //                     focusBackground: 'rgba(250, 250, 250, .24)',
    //                     color: 'rgba(255,255,255,.87)',
    //                     focusColor: 'rgba(255,255,255,.87)'
    //                     // },
    //                     // focusRing: {
    //                     //     width: '2px',
    //                     //     style: 'dashed',
    //                     //     color: '{primary.color}',
    //                     //     offset: '1px'
    //                 }
    //             }
    //         }
    //     }
})
