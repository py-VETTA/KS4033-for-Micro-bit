namespace KS4033 {

    export enum Motor {
        //% block="Motor Direito"
        Direito,

        //% block="Motor Esquerdo"
        Esquerdo,

        //% block="Todos"
        Todos
    }

    //% block="teste motor $motor velocidade $velocidade"
    export function testeMotor(motor: Motor, velocidade: number): void {
        basic.showNumber(velocidade)
    }
}
