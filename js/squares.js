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
            let base = new Decimal(1.02)
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
        costMult: new Decimal(6.25),
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
            if (this.level.equals(1) && player.state == gameState.alphaPart1) {
                setTimeout(function() {
                    alpha1Cutscene();
                }, 300)
            }
        }
    },
    {
        type: "upgrade",
        level: new Decimal(0),
        maxLevel: new Decimal(1),
        effectText: "Multiply alpha generation by |x.",
        cost: new Decimal(1e60),
        currency: "alpha",
        costMult: new Decimal(2),
        costExponent: new Decimal(0),
        costUltraExponent: new Decimal(0),
        effect() {
            let base = this.effectDisplay()
            return base.pow(this.level)
        },
        effectDisplay() {
            let base = new Decimal(1.05)
            return base
        },
        unlocked() {
            return player.state >= gameState.alphaPart1;
        },
        onBuy() {
            this.maxLevel = this.maxLevel.add(1);
            $( "#upgrade-max-level-7" ).text(this.maxLevel.toString());
        }
    },
    {
        type: "upgrade",
        level: new Decimal(0),
        maxLevel: new Decimal(15),
        effectText: "Make upgrades #6 and #7<sub>WHY😭</sub> auto purchase every second, and each next purchase divides the time per purchase by |.", //OH MY GOD THIS WAS NOT INTENDED AT ALL GOD DAMN IT
        cost: new Decimal(1e100),
        currency: "alpha",
        costMult: new Decimal(1e25),
        costExponent: new Decimal(1),
        costUltraExponent: new Decimal(0),
        effect() {
            let base = this.effectDisplay()
            return ((this.level.equals(0)) ? (new Decimal(0)) : (base.pow(this.level.sub(1))))
        },
        effectDisplay() {
            let base = new Decimal(1.35)
            return base
        },
        unlocked() {
            return player.state >= gameState.alphaPart2;
        },
    },
    {
        type: "upgrade",
        level: new Decimal(0),
        maxLevel: new Decimal(10),
        effectText: "Increase bulk buy of upgrades #6 and #7 by |.", //OH MY GOD THIS WAS NOT INTENDED AT ALL GOD DAMN IT
        cost: new Decimal("1e500"),
        currency: "alpha",
        costMult: new Decimal("1e1000"),
        costExponent: new Decimal(1000),
        costUltraExponent: new Decimal(0),
        effect() {
            let base = this.effectDisplay();
            return base.mul(this.level);
        },
        effectDisplay() {
            let base = new Decimal(1);
            base = base.mul(squares[10].effect())
            return base;
        },
        unlocked() {
            return squares[8].level.equals(squares[8].maxLevel);
        },
    },
    {
        type: "upgrade",
        level: new Decimal(0),
        maxLevel: new Decimal(10),
        effectText: "Multiply #9's base by |.", //OH MY GOD THIS WAS NOT INTENDED AT ALL GOD DAMN IT
        cost: new Decimal("1e25000"),
        currency: "alpha",
        costMult: new Decimal("1e25000"),
        costExponent: new Decimal(1e4),
        costUltraExponent: new Decimal(0),
        effect() {
            let base = this.effectDisplay();
            return base.pow(this.level);
        },
        effectDisplay() {
            let base = new Decimal(2);
            return base;
        },
        unlocked() {
            return squares[9].level.equals(squares[9].maxLevel);
        },
        onBuy() {
            $( "#upgrade-base-9" ).text(format(squares[9].effectDisplay()))
            $( "#upgrade-effect-9" ).text(format(squares[9].effect()))
            if (this.level.equals(this.maxLevel) && player.state <= gameState.alphaPart2) {
                alpha3Cutscene();
            }
        },
    },
]