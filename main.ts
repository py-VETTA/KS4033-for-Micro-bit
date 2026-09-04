//% color="#F44336"
namespace KS4033 {

    let pwmMinimo = 0
    let inverterDireito = false
    let inverterEsquerdo = false

    export enum Motor {
        //% block="Motor Direito"
        Direito,

        //% block="Motor Esquerdo"
        Esquerdo,

        //% block="Todos"
        Todos
    }

    export enum Motor_Config {
        //% block="Motor Direito"
        Direito,

        //% block="Motor Esquerdo"
        Esquerdo,

        //% block="Todos"
        Todos,

        //% block="Nenhum"
        Nenhum
    }

    export enum Rotacao {
        //% block="Frente"
        Frente,

        //% block="Trás"
        Tras
    }

    //% block="Configuração do KS4033: Velocidade PWM mínima: $pwm Inverter sentido de giro do Motor $motor"
    //% pwm.min=0 pwm.max=1023 pwm.defl=0
    export function configuracao(pwm: number, motor: Motor_Config): void {

        if (pwm < 0) {
            pwm = 0
        }

        if (pwm > 1023) {
            pwm = 1023
        }

        pwmMinimo = pwm

        if (motor == Motor_Config.Direito) {
            inverterDireito = true
            inverterEsquerdo = false
        } else if (motor == Motor_Config.Esquerdo) {
            inverterDireito = false
            inverterEsquerdo = true
        } else if (motor == Motor_Config.Todos) {
            inverterDireito = true
            inverterEsquerdo = true
        } else {
            inverterDireito = false
            inverterEsquerdo = false
        }
    }

    //% block="ligar motor $motor velocidade $velocidade rotação $rotacao"
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
            pwm = pwmMinimo + (velocidade - 1) * (1023 - pwmMinimo) / 99
        }

        let rotacaoDireito = rotacao
        let rotacaoEsquerdo = rotacao

        if (inverterDireito) {
            if (rotacaoDireito == Rotacao.Frente) {
                rotacaoDireito = Rotacao.Tras
            } else {
                rotacaoDireito = Rotacao.Frente
            }
        }

        if (inverterEsquerdo) {
            if (rotacaoEsquerdo == Rotacao.Frente) {
                rotacaoEsquerdo = Rotacao.Tras
            } else {
                rotacaoEsquerdo = Rotacao.Frente
            }
        }


        // MOTOR DIREITO
        if (motor == Motor.Direito) {

            if (rotacaoDireito == Rotacao.Frente) {
                pins.analogWritePin(AnalogPin.P13, pwm)
                pins.analogWritePin(AnalogPin.P12, 0)
            } else {
                pins.analogWritePin(AnalogPin.P13, 0)
                pins.analogWritePin(AnalogPin.P12, pwm)
            }


        // MOTOR ESQUERDO
        } else if (motor == Motor.Esquerdo) {

            if (rotacaoEsquerdo == Rotacao.Frente) {
                pins.analogWritePin(AnalogPin.P15, pwm)
                pins.analogWritePin(AnalogPin.P16, 0)
            } else {
                pins.analogWritePin(AnalogPin.P15, 0)
                pins.analogWritePin(AnalogPin.P16, pwm)
            }


        // TODOS
        } else {

            if (rotacaoDireito == Rotacao.Frente) {
                pins.analogWritePin(AnalogPin.P13, pwm)
                pins.analogWritePin(AnalogPin.P12, 0)
            } else {
                pins.analogWritePin(AnalogPin.P13, 0)
                pins.analogWritePin(AnalogPin.P12, pwm)
            }

            if (rotacaoEsquerdo == Rotacao.Frente) {
                pins.analogWritePin(AnalogPin.P15, pwm)
                pins.analogWritePin(AnalogPin.P16, 0)
            } else {
                pins.analogWritePin(AnalogPin.P15, 0)
                pins.analogWritePin(AnalogPin.P16, pwm)
            }
        }
    }


    //% block="desligar motor $motor"
    export function desligar(motor: Motor): void {

        if (motor == Motor.Direito) {

            pins.analogWritePin(AnalogPin.P13, 0)
            pins.analogWritePin(AnalogPin.P12, 0)

        } else if (motor == Motor.Esquerdo) {

            pins.analogWritePin(AnalogPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, 0)

        } else {

            pins.analogWritePin(AnalogPin.P13, 0)
            pins.analogWritePin(AnalogPin.P12, 0)

            pins.analogWritePin(AnalogPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, 0)
        }
    }
}
