namespace KS4033 {

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

        // 1% = aproximadamente 250
        // 100% = 1023
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
    //% motor.defl="Todos"
    //% motor.shadow="dropdown"
    //% motor.options="Direito,Esquerdo,Todos"
    //% velocidade.min=0 velocidade.max=100 velocidade.defl=50
    //% velocidade.shadow="slider"
    //% rotacao.defl="Frente"
    //% rotacao.shadow="dropdown"
    //% rotacao.options="Frente,Trás"
    export function ligar(
        motor: string,
        velocidade: number,
        rotacao: string
    ): void {

        let pwm = converterVelocidade(velocidade)

        // -------------------------
        // MOTOR DIREITO
        // -------------------------

        if (motor == "Direito") {

            if (rotacao == "Frente") {
                direitoFrente(pwm)
            } else {
                direitoTras(pwm)
            }

        }

        // -------------------------
        // MOTOR ESQUERDO
        // -------------------------

        else if (motor == "Esquerdo") {

            if (rotacao == "Frente") {
                esquerdoFrente(pwm)
            } else {
                esquerdoTras(pwm)
            }

        }

        // -------------------------
        // TODOS
        // -------------------------

        else {

            if (rotacao == "Frente") {

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
    //% motor.defl="Todos"
    //% motor.shadow="dropdown"
    //% motor.options="Direito,Esquerdo,Todos"
    export function desligar(motor: string): void {

        if (motor == "Direito") {

            pins.analogWritePin(DIREITO_A, 0)
            pins.analogWritePin(DIREITO_B, 0)

        }

        else if (motor == "Esquerdo") {

            pins.analogWritePin(ESQUERDO_A, 0)
            pins.analogWritePin(ESQUERDO_B, 0)

        }

        else {

            pins.analogWritePin(DIREITO_A, 0)
            pins.analogWritePin(DIREITO_B, 0)

            pins.analogWritePin(ESQUERDO_A, 0)
            pins.analogWritePin(ESQUERDO_B, 0)
        }
    }
}
