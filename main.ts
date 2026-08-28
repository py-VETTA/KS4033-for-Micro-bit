namespace KS4033 {

    export enum Motor {
        //% block="Motor Direito"
        Direito,

        //% block="Motor Esquerdo"
        Esquerdo,

        //% block="Todos"
        Todos
    }

    //% block="ligar motor $motor velocidade $velocidade"
    export function ligar(motor: Motor, velocidade: number): void {

        if (velocidade < 0) {
            velocidade = 0
        }

        if (velocidade > 100) {
            velocidade = 100
        }

        let pwm = 0

        if (velocidade > 0) {
            pwm = 250 + (velocidade - 1) * 773 / 99
        }

        if (motor == Motor.Direito) {

            pins.analogWritePin(AnalogPin.P13, pwm)
            pins.analogWritePin(AnalogPin.P12, 0)

        } else if (motor == Motor.Esquerdo) {

            pins.analogWritePin(AnalogPin.P15, pwm)
            pins.analogWritePin(AnalogPin.P16, 0)

        } else {

            pins.analogWritePin(AnalogPin.P13, pwm)
            pins.analogWritePin(AnalogPin.P12, 0)

            pins.analogWritePin(AnalogPin.P15, pwm)
            pins.analogWritePin(AnalogPin.P16, 0)
        }
    }
}
