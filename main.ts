//% color="#F44336"
namespace KS4033 {

    export enum Motor {
        //% block="Motor Direito"
        Direito,

        //% block="Motor Esquerdo"
        Esquerdo,

        //% block="Todos"
        Todos
    }

    export enum Rotacao {
        //% block="Frente"
        Frente,

        //% block="Trás"
        Tras
    }


    // =========================
    // LIGAR MOTOR
    // =========================

    //% block="Ligar motor $motor velocidade $velocidade rotação $rotacao"
    //% velocidade.min=0 velocidade.max=100 velocidade.defl=50
    export function ligar(
        motor: Motor,
        velocidade: number,
        rotacao: Rotacao
    ): void {

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


        // MOTOR DIREITO
        if (motor == Motor.Direito) {

            if (rotacao == Rotacao.Frente) {

                pins.analogWritePin(AnalogPin.P13, pwm)
                pins.analogWritePin(AnalogPin.P12, 0)

            } else {

                pins.analogWritePin(AnalogPin.P13, 0)
                pins.analogWritePin(AnalogPin.P12, pwm)
            }


        // MOTOR ESQUERDO
        } else if (motor == Motor.Esquerdo) {

            if (rotacao == Rotacao.Frente) {

                pins.analogWritePin(AnalogPin.P15, pwm)
                pins.analogWritePin(AnalogPin.P16, 0)

            } else {

                pins.analogWritePin(AnalogPin.P15, 0)
                pins.analogWritePin(AnalogPin.P16, pwm)
            }


        // TODOS
        } else {

            if (rotacao == Rotacao.Frente) {

                pins.analogWritePin(AnalogPin.P13, pwm)
                pins.analogWritePin(AnalogPin.P12, 0)

                pins.analogWritePin(AnalogPin.P15, pwm)
                pins.analogWritePin(AnalogPin.P16, 0)

            } else {

                pins.analogWritePin(AnalogPin.P13, 0)
                pins.analogWritePin(AnalogPin.P12, pwm)

                pins.analogWritePin(AnalogPin.P15, 0)
                pins.analogWritePin(AnalogPin.P16, pwm)
            }
        }
    }


    // =========================
    // DESLIGAR MOTOR
    // =========================

    //% block="Desligar motor $motor"
    export function desligar(motor: Motor): void {

        // MOTOR DIREITO
        if (motor == Motor.Direito) {

            pins.analogWritePin(AnalogPin.P13, 0)
            pins.analogWritePin(AnalogPin.P12, 0)


        // MOTOR ESQUERDO
        } else if (motor == Motor.Esquerdo) {

            pins.analogWritePin(AnalogPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, 0)


        // TODOS
        } else {

            pins.analogWritePin(AnalogPin.P13, 0)
            pins.analogWritePin(AnalogPin.P12, 0)

            pins.analogWritePin(AnalogPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, 0)
        }
    }
}
