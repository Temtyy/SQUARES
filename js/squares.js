let squares = [{
        type: "currency",
        currencyName: "flux",
    },
    { //starts astronomically growing at 10 levels
        type: "upgrade",
        level: new Decimal(0),
        maxLevel: new Decimal(1000),
        effectText: "Boost flux generation by |x.",
        cost: new Decimal(10),
        currency: "flux",
        costMult: new Decimal(5),
        costExponent: new Decimal(0.25),
        costUltraExponent: new Decimal(0.05),
        effect() {
            let base = this.effectDisplay()
            return base.pow(this.level)
        },
        effectDisplay() {
            let base = new Decimal(2)
            base = base.add(squares[2].effect())
            base = base.mul(squares[4].effect())
            return base
        },
        unlocked() {
            return true;
        }
        // onBuy()
    },
    {
        type: "upgrade",
        level: new Decimal(0),
        maxLevel: new Decimal(1000),
        effectText: "Increase #1's base by +|.",
        cost: new Decimal(20),
        currency: "flux",
        costMult: new Decimal(6),
        costExponent: new Decimal(0.5),
        costUltraExponent: new Decimal(0.05),
        effect() {
            let base = this.effectDisplay()
            return base.mul(this.level)
        },
        effectDisplay() {
            let base = new Decimal(1)
            base = base.add(squares[3].effect())
            return base
        },
        onBuy() {
            $( "#upgrade-base-1" ).text(format(squares[1].effectDisplay()))
            $( "#upgrade-effect-1" ).text(format(squares[1].effect()))
        },
        unlocked() {
            return true;
        }
    },
    {
        type: "upgrade",
        level: new Decimal(0),
        maxLevel: new Decimal(1000),
        effectText: "Increase #2's base by +|.",
        cost: new Decimal(1e12),
        currency: "flux",
        costMult: new Decimal(15),
        costExponent: new Decimal(0.6),
        costUltraExponent: new Decimal(0.1),
        effect() {
            let base = this.effectDisplay()
            return base.mul(this.level)
        },
        effectDisplay() {
            let base = new Decimal(0.1)
            return base
        },
        onBuy() {
            $( "#upgrade-base-2" ).text(format(squares[2].effectDisplay()))
            $( "#upgrade-effect-2" ).text(format(squares[2].effect()))
            
            $( "#upgrade-base-1" ).text(format(squares[1].effectDisplay()))
            $( "#upgrade-effect-1" ).text(format(squares[1].effect()))
        },
        unlocked() {
            return true;
        }
    },
    {
        type: "upgrade",
        level: new Decimal(0),
        maxLevel: new Decimal(1000),
        effectText: "Multiply #1's base by |x.",
        cost: new Decimal(1e32),
        currency: "flux",
        costMult: new Decimal(1000),
        costExponent: new Decimal(1),
        costUltraExponent: new Decimal(0.5),
        effect() {
            let base = this.effectDisplay()
            return base.pow(this.level)
        },
        effectDisplay() {
            let base = new Decimal(1.05)
            return base
        },
        onBuy() {
            $( "#upgrade-base-3" ).text(format(squares[3].effectDisplay()))
            $( "#upgrade-effect-3" ).text(format(squares[3].effect()))

            $( "#upgrade-base-2" ).text(format(squares[2].effectDisplay()))
            $( "#upgrade-effect-2" ).text(format(squares[2].effect()))
            
            $( "#upgrade-base-1" ).text(format(squares[1].effectDisplay()))
            $( "#upgrade-effect-1" ).text(format(squares[1].effect()))
        },
        unlocked() {
            return player.state >= gameState.fluxPart2;
        }
    },
    {
        type: "currency",
        currencyName: "alpha",
        unlocked() {
            return player.state >= gameState.alphaPart1;
        }
    },
    {
        type: "upgrade",
        level: new Decimal(0),
        maxLevel: new Decimal(1),
        effectText: "Multiply alpha generation by |x.",
        cost: new Decimal(1),
        currency: "alpha",
        costMult: new Decimal(6.05),
        costExponent: new Decimal(0),
        costUltraExponent: new Decimal(0),
        effect() {
            let base = this.effectDisplay()
            return base.pow(this.level)
        },
        effectDisplay() {
            let base = new Decimal(6)
            return base
        },
        unlocked() {
            return player.state >= gameState.alphaPart1;
        },
        onBuy() {
            this.maxLevel = this.maxLevel.add(1);
            $( "#upgrade-max-level-6" ).text(this.maxLevel.toString());
            if (this.level.equals(1)) {
                
            }
        }
    },
]