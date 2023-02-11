let game = {
    techs: [
        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react",
    ],

    cards: null,

    lockMode: false,

    firstCard: null,

    secondCard: null,

    setCard(id) {
        let card = this.cards.filter((card) => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        card.flipped = true;

        if (!this.firstCard) {
            this.firstCard = card;
            return true;
        } else {
            this.secondCard = card;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch() {
        return this.firstCard.icon == this.secondCard.icon;
    },

    clearCards() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {
        return this.cards.filter((card) => !card.flipped).length == 0;
    },

    createCardsFromTechs() {
        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        });

        this.cards = this.cards.flatMap((e) => e);
        this.shuffleCards();

        return this.cards;
    },

    createPairFromTech(tech) {
        return [
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false,
            },
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false,
            },
        ];
    },

    createIdWithTech(tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards() {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [
                this.cards[currentIndex],
                this.cards[randomIndex],
            ];
        }
    },

    flipCard(cardId, gameOverCallback, noMatchCallback) {
        if (game.setCard(cardId)) {
            if (game.secondCard) {
                if (game.checkMatch()) {
                    console.log("achou");

                    game.clearCards();
                    if (game.checkGameOver()) {
                        // gameover
                        gameOverCallback();
                    }
                } else {
                    setTimeout(() => {
                        // No match
                        game.unflipCards();
                        noMatchCallback();
                    }, 400);
                }
            }
        }
    },
};

export default game;
