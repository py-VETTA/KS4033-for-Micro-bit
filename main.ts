namespace KS4033 {

    export enum Motor {
        //% block="Motor Direito"
        Direito,

        //% block="Motor Esquerdo"
        Esquerdo,

        //% block="Todos"
        Todos
    }

    //% block="teste motor $motor velocidade $velocidade %"
    //% velocidade.min=0 velocidade.max=100 velocidade.defl=50
    //% velocidade.shadow=slider
    export function testeMotor(motor: Motor, velocidade: number): void {
        basic.showNumber(velocidade)
    }
}
