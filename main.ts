namespace KS4033 {

    export enum Motor {
        //% block="Motor Direito"
        Direito,

        //% block="Motor Esquerdo"
        Esquerdo,

        //% block="Todos"
        Todos
    }

    //% block="teste motor $motor"
    export function testeMotor(motor: Motor): void {
        basic.showNumber(motor)
    }
}
