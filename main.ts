namespace KS4033 {

    // =========================
    // OPÇÕES DOS DROPDOWNS
    // =========================

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
    // PINOS DOS MOTORES
    // =========================

    // Motor Direito
    const DIREITO_A = AnalogPin.P13
    const DIREITO_B = AnalogPin.P12

    // Motor Esquerdo
    const ESQUERDO_A = AnalogPin.P15
    const ESQUERDO_B = AnalogPin.P16


    // =========================
    // CONVERSÃO DE VELOCIDADE
    // =========================

    function converterVelocidade(velocidade: number): number {

        if (velocidade <= 0) {
            return 0
        }

        if (velocidade > 100) {
            velocidade = 100
        }

        return Math.round(
            250 + (velocidade - 1) * (1023 - 250) / 99
        )
    }


    // =========================
    // MOTOR DIREITO
    // =========================

    function direitoFrente(pwm: number): void {
        pins.analogWritePin(DIREITO_A, pwm)
        pins.analogWritePin(DIREITO_B, 0)
    }

    function direitoTras(pwm: number): void {
        pins.analogWritePin(DIREITO_A, 0)
        pins.analogWritePin(DIREITO_B, pwm)
    }


    // =========================
    // MOTOR ESQUERDO
    // =========================

    function esquerdoFrente(pwm: number): void {
        pins.analogWritePin(ESQUERDO_A, pwm)
        pins.analogWritePin(ESQUERDO_B, 0)
    }

    function esquerdoTras(pwm: number): void {
        pins.analogWritePin(ESQUERDO_A, 0)
        pins.analogWritePin(ESQUERDO_B, pwm)
    }


    // =========================
    // BLOCO LIGAR
    // =========================

    //% block="ligar motor $motor velocidade $velocidade % rotação $rotacao"
    //% velocidade.min=0 velocidade.max=100 velocidade.defl=50
    //% velocidade.shadow="slider"
    export function ligar(
        motor: Motor,
        velocidade: number,
        rotacao: Rotacao
    ): void {

        let pwm = converterVelocidade(velocidade)

        if (motor == Motor.Direito) {

            if (rotacao == Rotacao.Frente) {
                direitoFrente(pwm)
            } else {
                direitoTras(pwm)
            }

        } else if (motor == Motor.Esquerdo) {

            if (rotacao == Rotacao.Frente) {
                esquerdoFrente(pwm)
            } else {
                esquerdoTras(pwm)
            }

        } else {

            if (rotacao == Rotacao.Frente) {
                direitoFrente(pwm)
                esquerdoFrente(pwm)
            } else {
                direitoTras(pwm)
                esquerdoTras(pwm)
            }
        }
    }


    // =========================
    // BLOCO DESLIGAR
    // =========================

    //% block="desligar motor $motor"
    export function desligar(motor: Motor): void {

        if (motor == Motor.Direito) {

            pins.analogWritePin(DIREITO_A, 0)
            pins.analogWritePin(DIREITO_B, 0)

        } else if (motor == Motor.Esquerdo) {

            pins.analogWritePin(ESQUERDO_A, 0)
            pins.analogWritePin(ESQUERDO_B, 0)

        } else {

            pins.analogWritePin(DIREITO_A, 0)
            pins.analogWritePin(DIREITO_B, 0)

            pins.analogWritePin(ESQUERDO_A, 0)
            pins.analogWritePin(ESQUERDO_B, 0)
        }
    }
}
